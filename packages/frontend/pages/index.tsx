import type { NextPage } from "next";
import Link from "next/link";
import { Contract, JsonRpcProvider } from "ethers";
import { Box, Button, Center, Title } from "@mantine/core";

import PostCard from "@/components/Posts/PostCard";
import { PageSEO } from "@/components/SEO";
import { fetchDecodedPost } from "@/services/fetchCid";
import { getContractInfo } from "@/utils/contracts";

interface Props {
  posts: PostReduced[];
}

type PostReduced = {
  image: string;
  name: string;
  tokenId: number;
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <PageSEO />

      <Title order={1} className="fade-in-text">
        PinSave Home Page
      </Title>

      <Box
        mx="auto"
        mt={20}
        sx={{
          maxWidth: 1500,
          gap: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 5fr))",
          gridTemplateRows: "masonry",
        }}
      >
        {posts.map((post: PostReduced) => {
          return (
            <Center key={post.tokenId}>
              <PostCard post={post} />
            </Center>
          );
        })}
      </Box>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { address, abi } = getContractInfo();
  const provider = new JsonRpcProvider("https://go.getblock.io/b72b07e1892a41b4882e8c3f451a0e64");
  const contract: Contract = new Contract(address, abi, provider);

  const posts: PostReduced[] = [];

  const totalSupply = await contract.totalSupply();

  console.log("total supply:", totalSupply)

  for (let i = 1; i <= totalSupply; i++) {
    const result = await contract.getPostCid(i);
    console.log("cid:",result)
    const post = await fetchDecodedPost(result, 150);
    console.log("decoded post:", post)
    posts.push({ image: post.image, name: post.name, tokenId: i });
  }
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
