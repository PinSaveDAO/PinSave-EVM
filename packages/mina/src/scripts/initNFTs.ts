import { initRootWithApp } from '../components/transactions.js';
import { storeNFT } from '../components/NFT.js';
import { serializeMerkleMapToJson } from '../components/serialize.js';

import {
  Mina,
  PrivateKey,
  Field,
  MerkleMap,
  MerkleTree,
  PublicKey,
} from 'o1js';
import dotenv from 'dotenv';

dotenv.config();

const Berkeley = Mina.Network(
  'https://proxy.berkeley.minaexplorer.com/graphql'
);

Mina.setActiveInstance(Berkeley);

const deployerKey: PrivateKey = PrivateKey.fromBase58(
  process.env.deployerKey as string
);

const pubKey = deployerKey.toPublicKey();

const zkAppAddress: PublicKey = PublicKey.fromBase58(
  'B62qkWDJWuPz1aLzwcNNCiEZNFnveQa2DEstF7vtiVJBTbkzi7nhGLm'
);

const nftName = 'name';
const nftDescription = 'some random words';
const nftCid = '1244324dwfew1';

const merkleMap: MerkleMap = new MerkleMap();

const NFT10 = storeNFT(
  nftName,
  nftDescription,
  Field(10),
  nftCid,
  pubKey,
  merkleMap
);

const NFT11 = storeNFT(
  nftName,
  nftDescription,
  Field(11),
  nftCid,
  pubKey,
  merkleMap
);

const NFT12 = storeNFT(
  nftName,
  nftDescription,
  Field(12),
  nftCid,
  pubKey,
  merkleMap
);

await initRootWithApp(deployerKey, zkAppAddress, merkleMap);

const mapJson = serializeMerkleMapToJson(merkleMap);

console.log(mapJson);
