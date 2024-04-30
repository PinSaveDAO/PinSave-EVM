import { Player } from "@livepeer/react";
import { Paper, Text, Center } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import { IsNotMp4 } from "@/utils/media";
import type { Post } from "@/services/upload";

interface IMyProps {
  post: Post;
}

const PostCard: React.FC<IMyProps> = ({ post }) => {
  return (
    <Link href={`/optimism/posts/${post.token_id}`}>
      <Paper
        component="div"
        withBorder
        radius="lg"
        shadow="md"
        p="md"
        sx={{ cursor: "pointer" }}
      >
        {IsNotMp4(post.image) ? (
          <Image
            src={post.image}
            alt={post.name}
            height={200}
            width={200}
            sizes="200px"
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
        ) : (
          <Player
            src={post.image}
            muted
            autoUrlUpload={{
              fallback: true,
              ipfsGateway: "https://w3s.link",
            }}
            aspectRatio="1to1"
          />
        )}
        <Text align="center" mt="sm" lineClamp={1}>
          {post.name}
        </Text>
      </Paper>
    </Link>
  );
};

export default PostCard;
