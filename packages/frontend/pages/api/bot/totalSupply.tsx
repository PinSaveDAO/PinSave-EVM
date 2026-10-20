import type { NextApiRequest, NextApiResponse } from "next";
import { Contract, InfuraProvider } from "ethers";

import { getContractInfo } from "@/utils/contracts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { address, abi } = getContractInfo();

    const provider = new InfuraProvider(
      "optimism",
      process.env.NEXT_PUBLIC_INFURA_OPTIMISM,
    );

    const contract = new Contract(address, abi, provider);

    const totalSupply = Number(await contract.totalSupply());

    res.status(200).json({ totalSupply: totalSupply });
  } catch (err) {
    res.status(500).json({ error: "failed to fetch data" + err });
  }
}
