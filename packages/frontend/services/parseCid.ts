export function parseCidIpfsio(cid: string): string {
  /* if (link.charAt(0) === "i") {
    return link?.replace("ipfs://", "https://ipfs.io/ipfs/");
  } */
  return "https://ipfs.io/ipfs/" + cid;
}

export function parseCidInbrowser(cid: string): string {
  /* if (link.charAt(0) === "i") {
    return link?.replace("ipfs://", "https://ipfs.io/ipfs/");
  } */
  return cid + ".ipfs.inbrowser.link";
}

export function parseCid(link: string): string {
  return link?.replace("ipfs://", "");
}

export function insertIpfsDomainProvider(
  link: string,
  providerDomain: string,
): string {
  const cid = parseCid(link);

  const lastIndex = cid.lastIndexOf("/");
  if (lastIndex <= 7) return "https://" + cid + providerDomain;
  const firstPart = cid.substring(0, lastIndex);
  const lastPart = cid.substring(lastIndex + 1);

  return "https://" + firstPart + providerDomain + lastPart;
}

export function parseCidDweb(link: string): string {
  const result = insertIpfsDomainProvider(link, ".ipfs.dweb.link/");
  return result;
}

export function parseCidNFTStorage(link: string): string {
  const result = insertIpfsDomainProvider(link, ".ipfs.nftstorage.link/");
  return result;
}

export function parseArweaveTxId(link: string): string {
  return link?.replace("ar://", "");
}
