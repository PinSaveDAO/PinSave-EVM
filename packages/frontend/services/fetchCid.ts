import { PinataSDK } from "pinata-web3";
import { PinataSDK as PinataSDK_ } from "pinata";

import { parseCidDweb, parseCidNFTStorage } from "@/services/parseCid";

export type ObjectJsonMetadata = {
  name: string;
  description: string;
  image: string;
};

export type PinataObject = {
  data: ObjectJsonMetadata;
  contentType: string;
};

export async function fetchJson(resURL: string, resURL2: string) {
  let item;
  try {
    item = await fetch(resURL).then((x) => x.json());
  } catch (e) {
    console.log("fetchJson error", e);
    item = await fetch(resURL2).then((x) => x.json());
  }
  return item;
}

export async function fetchWorkingImageUrl(resURL1: string, resURL2: string) {
  const image: string = "https://pinsave.app/PinSaveCard.png";

  const res1: Response = await fetch(resURL1);
  const headersRes1: string | null = res1.headers.get("content-type");
  if (headersRes1 === "text/html") {
    const lastIndex = resURL1.lastIndexOf("/");
    const constPart = resURL1.substring(0, lastIndex);
    const toUpdatePart = resURL1.substring(lastIndex);
    const updatedPart = toUpdatePart.replace("#", "%23");
    const newResURL1 = constPart + updatedPart;
    const updatedRes1: Response = await fetch(newResURL1);
    const newHeadersRes1: string | null = res1.headers.get("content-type");
    console.log(newHeadersRes1);
    if (updatedRes1.status === 200) return newResURL1;
  }

  if (res1.status === 200) return resURL1;

  const res2: Response = await fetch(resURL2);
  if (res2.status === 200) return resURL2;
  return image;
}

/* export async function parseString(result: string) {
  if (result.charAt(0) === "i") {
    const resURL: string = parseCidNFTStorage(result);
    const resURL2: string = parseCidDweb(result);
    return [resURL, resURL2];
  }
  throw new Error(`${result}: no ipfs link`);
} */

export async function parseString(result: string) {
    const resURL1: string = parseCidNFTStorage(result);
    const resURL2: string = parseCidDweb(result);
    return [resURL1, resURL2];

}

/* export async function fetchMetadata(cidMetadata: string) {
  const [resURL, resURL2] = await parseString(cidMetadata);
  console.log(resURL)
  const objectJsonMetadata: ObjectJsonMetadata = await fetchJson(
    resURL,
    resURL2,
  );
  return objectJsonMetadata;
}
 */

export async function fetchMetadata(cidMetadata: string) {
  const [resURL, resURL2] = await parseString(cidMetadata);
  console.log(resURL)
  const objectJsonMetadata: ObjectJsonMetadata = await fetchJson(
    resURL,
    resURL2,
  );
  return objectJsonMetadata;
}

export async function fetchImage(cidImage: string) {
  const [resURL, resURL2] = await parseString(cidImage);
  const linkImage: string = await fetchWorkingImageUrl(resURL, resURL2);
  return linkImage;
}

export async function fetchMetadataPinata(cidMetadata: string) {
  console.log("cidMetadata:", cidMetadata)
  const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
    pinataGatewayKey: process.env.NEXT_PUBLIC_AC,
  });

  
  const url = await pinata.gateways.convert(cidMetadata);
  console.log("url", url)
  const file = await fetch(url).then((x) => x.json());
  console.log("file:", file)
  return file;
}

export async function fetchImagePinata(
  cidImage: string,
  imageResolution: number,
) {
  const pinata = new PinataSDK_({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
  });
  const url = await pinata.gateways
    .createSignedURL({
      cid: cidImage,
      expires: 864000,
    })
    .optimizeImage({
      width: imageResolution,
      height: imageResolution,
      format: "webp",
    });
  return url;
}

export async function fetchDecodedPost(
  cidMetadata: string,
  imageResolution: number,
) {
  try {
    const objectJsonMetadata: unknown = await fetchMetadata(cidMetadata);
    console.log("objectJsonMetadata:",objectJsonMetadata)
    const metadata = objectJsonMetadata as ObjectJsonMetadata;
    try {
      const imageCID: string = metadata.image?.replace(
        "https://gateway.pinata.cloud/ipfs/",
        "",
      );
      console.log("imageCid", imageCID)
      const decodedImage = await fetchImagePinata(imageCID, imageResolution);
      const output = {
        name: metadata.name,
        description: metadata.description,
        image: decodedImage,
      };
      return output;
    } catch (e) {
      return {
        name: metadata.name,
        description: metadata.description,
        image: "/fail.webp",
      };
    }
  } catch (e) {
    return {
      name: "Failed",
      description: "F for Failure",
      image: "/fail.webp",
    };
  }
}
