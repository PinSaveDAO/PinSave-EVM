import type { NextApiRequest, NextApiResponse } from "next";
import { Contract, JsonRpcProvider } from "ethers";

import { fetchDecodedPost } from "@/services/fetchCid";
import { getContractInfo } from "@/utils/contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const { address, abi } = getContractInfo();

    const provider = new JsonRpcProvider("https://rpc.botchain.ai");


    const contract: Contract = new Contract(address, abi, provider);
    const postData: string[] = await contract.getPostData(id);
    const objectJsonMetadata = await fetchDecodedPost(postData[2], 500);

    res.status(200).json({
      ...objectJsonMetadata,
      tokenId: id,
      owner: postData[0],
      author: postData[1],
    });
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" + err });
  }
}
