const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("PinSave", function () {
  let nftContract;

  let bob;
  let jane;

  const sampleLink =
    "bafkreiblu6yf35thyjzjhblimxiynxbewgn4dtjjozgjveuhrdmrfgx53a";

  const sampleLink1 =
    "bafkreiblu6yf35thyjzjhblimxiynxbewgn4dtjjozgjveuhrdmrfgx53a";

  beforeEach(async () => {
    [bob, jane] = await ethers.getSigners();
    const nftFactory = await ethers.getContractFactory("PinSave");
    nftContract = await nftFactory.deploy("name", "N", bob.address);

    await nftContract.deployed();
  });

  it("correctly deployed", async function () {
    expect(await nftContract.balanceOf(bob.address)).to.equal(0);
    expect(await nftContract.totalSupply()).to.equal(0);
    expect(await nftContract.owner()).to.equal(bob.address);
  });

  it("mints", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    expect(await nftContract.balanceOf(bob.address)).to.equal(1);
    expect(await nftContract.totalSupply()).to.equal(1);
  });

  it("token owner", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    expect(await nftContract.balanceOf(bob.address)).to.equal(1);
    expect(await nftContract.totalSupply()).to.equal(1);

    expect(await nftContract.ownerOf(1)).to.equal(bob.address);
  });

  it("check cid", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const id = await nftContract.totalSupply();
    const cid = await nftContract.getPostCid(id);
    expect(cid).to.equal(sampleLink);
  });

  it("checks post owner", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const id = await nftContract.totalSupply();
    expect(await nftContract.getPostOwner(id)).to.equal(bob.address);
  });

  it("transfers", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const id = await nftContract.totalSupply();
    await nftContract.connect(bob).transferFrom(bob.address, jane.address, id);
    expect(await nftContract.balanceOf(bob.address)).to.equal(0);
    expect(await nftContract.totalSupply()).to.equal(1);
  });

  it("checks post creator", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const id = await nftContract.totalSupply();
    await nftContract.connect(bob).transferFrom(bob.address, jane.address, id);
    expect(await nftContract.getPostAuthor(id)).to.equal(bob.address);
  });

  it("checks post ALL DATA", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const data = await nftContract.getPostData(1);

    expect(await nftContract.getPostOwner(1)).to.equal(data[0]);
    expect(await nftContract.getPostAuthor(1)).to.equal(data[1]);
    expect(await nftContract.getPostCid(1)).to.equal(data[2]);
  });

  it("checks whitelist status", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const isExcluded = await nftContract.isBlockedPost(1);
    expect(isExcluded).to.equal(false);

    await nftContract.blockPost(1);
    const isExcludedNow = await nftContract.isBlockedPost(1);
    expect(isExcludedNow).to.equal(true);

    try {
      await nftContract.connect(jane).getPostData(1);
    } catch (e) {}
  });

  it("URI fetches", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    const data = await nftContract.connect(bob).tokenURI(1);
    expect(data).to.equal(`https://gateway.pinata.cloud/ipfs/${sampleLink}`);
  });

  it("checks fee setter", async function () {
    expect(await nftContract.owner()).to.equal(bob.address);
  });

  it("checks fee setter", async function () {
    await nftContract.setOwner(jane.address);
    expect(await nftContract.owner()).to.equal(jane.address);
  });

  it("checks minting fee", async function () {
    expect(await nftContract.mintingFee()).to.equal(0);
  });

  it("changes fee", async function () {
    await nftContract.changeFee(1);
    expect(await nftContract.mintingFee()).to.equal(1);
  });

  it("pays minting fee", async function () {
    const mintingFee = 1;
    await nftContract.changeFee(mintingFee);
    expect(await nftContract.mintingFee()).to.equal(mintingFee);

    await nftContract.createPost(bob.address, sampleLink, {
      value: 1,
    });

    expect(await nftContract.getPostAuthor(1)).to.equal(bob.address);
    expect(Number(await nftContract.getContractBalance())).to.equal(mintingFee);

    await nftContract.withdrawFees();
    expect(Number(await nftContract.getContractBalance())).to.equal(0);
  });

  it("mints multiple posts", async function () {
    await nftContract
      .connect(bob)
      .createBatchPosts(bob.address, [
        sampleLink,
        sampleLink1,
        sampleLink,
        sampleLink1,
        sampleLink,
        sampleLink1,
        sampleLink,
        sampleLink1,
        sampleLink,
        sampleLink1,
      ]);
    expect(await nftContract.totalSupply()).to.equal(10);
    expect(await nftContract.balanceOf(bob.address)).to.equal(10);
  });

  it("blocks post", async function () {
    await nftContract.connect(bob).createPost(bob.address, sampleLink);
    await nftContract.connect(bob).tokenURI(1);
    expect(await nftContract.isBlockedPost(1)).to.equal(false);

    await nftContract.blockPost(1)
    expect(await nftContract.isBlockedPost(1)).to.equal(true);

    expect(nftContract.connect(jane).getPostData(1)).to.be.revertedWith("Not Allowed");
  });
});
