import { ActionIcon, SimpleGrid, LoadingOverlay } from "@mantine/core";
import { NextRouter, useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";

import type { ChainName } from "@/constants/chains";
import MediaDetails from "@/components/Post/MediaDetails";
import DisplayMedia from "@/components/Post/DisplayMedia";
import { PageSEO } from "@/components/SEO";
import { usePost } from "@/hooks/api";

const PostPage = () => {
  const router: NextRouter = useRouter();
  const currentChain: ChainName = "bot";
  const postId: string = String(router.query.id);

  const { data: postQueried, isLoading } = usePost(currentChain, postId);
  return (
    <div>
      <PageSEO
        title={`PinSave Post ${postId}`}
        description={`PinSave Post ${postId}`}
      />
      <LoadingOverlay visible={isLoading} />
      {postQueried && (
        <div>
          <ActionIcon
            onClick={() => router.back()}
            mb="md"
            color="teal"
            size="xl"
            radius="xl"
            variant="filled"
          >
            <ArrowLeft />
          </ActionIcon>
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2, spacing: "lg" },
              { maxWidth: "md", cols: 1, spacing: "md" },
            ]}
          >
            <DisplayMedia post={postQueried} />
            <MediaDetails post={postQueried} />
          </SimpleGrid>
        </div>
      )}
    </div>
  );
};

export default PostPage;
