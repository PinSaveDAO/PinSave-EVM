import React, { useState, useEffect } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import { IconUsers } from "@tabler/icons";
import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Group,
  Image,
  Paper,
  Title,
  Text,
  TextInput,
  LoadingOverlay,
  Stack,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import { NFTStorage } from "nft.storage";

import { dropzoneChildren } from "@/components/UploadForm";

let orbis = new Orbis();

const Upload = () => {
  const [cover, setCover] = useState<File | undefined>();
  const [image, setImage] = useState<File | undefined>();
  const [description, setDescription] = useState<string>();
  const [user, setUser] = useState<IOrbisProfile>();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    async function loadData() {
      let res = await orbis.isConnected();

      if (!res) {
        res = await orbis.connect();
      }
      setUser(res);
    }
    loadData();
  }, [user]);

  async function updateProfile() {
    showNotification({
      id: "upload-post",
      loading: true,
      title: "Uploading post",
      message: "Data will be loaded in a couple of seconds",
      autoClose: false,
      disallowClose: true,
    });

    if (image || cover) {
      let cidPfp, cidCover;

      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_TOKEN ?? "",
      });

      if (image) {
        cidPfp = await client.storeBlob(new Blob([image]));
        cidPfp = "https://" + cidPfp + ".ipfs.nftstorage.link";
      }

      if (cover) {
        cidCover = await client.storeBlob(new Blob([cover]));
        cidCover = "https://" + cidCover + ".ipfs.nftstorage.link";
      }

      await orbis.updateProfile({
        username: username ?? user?.details.profile?.username,
        pfp: cidPfp ?? user?.details.profile?.pfp ?? "",
        cover: cidCover ?? user?.details.profile?.cover ?? "",
        description: description ?? user?.details.profile?.description ?? "",
      });

      updateNotification({
        id: "upload-post",
        color: "teal",
        title: "Profile uploaded successfully!!",
        message: "File uploaded successfully ",
      });

      return;
    }

    await orbis.updateProfile({
      username: username ?? user?.details.profile?.username ?? "",
      pfp: user?.details.profile?.pfp ?? "",
      cover: user?.details.profile?.cover ?? "",
      description: description ?? user?.details.profile?.description ?? "",
    });

    updateNotification({
      id: "upload-post",
      color: "teal",
      title: "Profile uploaded successfully!!",
      message: "",
    });
  }

  async function logout() {
    setUser(undefined);
    await orbis.logout();
  }

  return (
    <>
      {user && user.did ? (
        <>
          <Button
            my={12}
            size="sm"
            onClick={() => logout()}
            style={{
              float: "right",
            }}
          >
            Log Out
          </Button>
          <Box sx={{ maxWidth: 1200 }} mx="auto">
            <BackgroundImage
              src={
                user.details.profile?.cover ??
                "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              }
              radius="xs"
              style={{
                height: 500,
                marginBottom: "25px",
              }}
            >
              <Stack
                spacing="xs"
                sx={{
                  height: 400,
                }}
              >
                <Image
                  radius="md"
                  src={user.details.profile?.pfp}
                  alt={user.details.profile?.username}
                  mx="auto"
                  style={{
                    width: 300,
                    height: 300,
                    paddingTop: 50,
                    paddingBottom: 40,
                  }}
                />
                <Card
                  shadow="sm"
                  p="lg"
                  radius="lg"
                  withBorder
                  mx="auto"
                  style={{
                    minWidth: 400,
                    minHeight: 200,
                  }}
                >
                  <Center>
                    <Title mx="auto" order={2}>
                      {user.details.profile?.username}
                    </Title>
                  </Center>
                  <Center mt={15}>
                    <Text mx="auto"> {user.details.profile?.description} </Text>
                  </Center>
                  <Group mt={10} position="center">
                    <Group position="center" mt="md" mb="xs">
                      <IconUsers size={26} />
                      <Text> Followers: {user.details.count_followers} </Text>
                      <Text> Following: {user.details.count_following} </Text>
                    </Group>
                  </Group>
                </Card>
              </Stack>
            </BackgroundImage>
          </Box>
          <Paper
            shadow="xl"
            p="md"
            radius="lg"
            sx={{ maxWidth: "700px", backgroundColor: "#82c7fc1d" }}
            mx="auto"
          >
            <TextInput
              my={12}
              size="md"
              label="Change Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              mx="auto"
              style={{ width: 300 }}
            />
            <TextInput
              my={12}
              size="md"
              label="Change Description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mx="auto"
              style={{ width: 300 }}
            />
            <Center>
              <Title>Upload PFP</Title>
            </Center>
            <Dropzone
              mt="md"
              ml="xl"
              mr="xl"
              onReject={(files) => console.log("rejected files", files)}
              onDrop={(files) => setImage(files[0])}
              maxSize={25000000}
              multiple={false}
              accept={[
                MIME_TYPES.png,
                MIME_TYPES.jpeg,
                MIME_TYPES.webp,
                MIME_TYPES.svg,
                MIME_TYPES.gif,
              ]}
            >
              {() => dropzoneChildren(image)}
            </Dropzone>
            <Center>
              <Title>Upload Cover</Title>
            </Center>
            <Dropzone
              mt="md"
              ml="xl"
              mr="xl"
              onReject={(files) => console.log("rejected files", files)}
              onDrop={(files) => setCover(files[0])}
              maxSize={25000000}
              multiple={false}
              accept={[
                MIME_TYPES.png,
                MIME_TYPES.jpeg,
                MIME_TYPES.webp,
                MIME_TYPES.svg,
                MIME_TYPES.gif,
              ]}
            >
              {() => dropzoneChildren(cover)}
            </Dropzone>
            <Center>
              <Button
                my={12}
                size="md"
                onClick={() => updateProfile()}
                mx="auto"
              >
                Submit
              </Button>
            </Center>
          </Paper>
        </>
      ) : (
        <LoadingOverlay visible />
      )}
    </>
  );
};

export default Upload;