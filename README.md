# Pin Save - decentralized Pinterest

<p align="center">
  <img src="https://raw.githubusercontent.com/Pfed-prog/Dspyt-NFTs-EVM/master/packages/frontend/public/PinSaveL.png" alt="Size Limit CLI" width="738" >
</p>

<p align="center">
    <a href="https://twitter.com/intent/follow?screen_name=pinsav3">
        <img src="https://img.shields.io/twitter/follow/pinsav3?style=social"
            alt="follow on Twitter"></a>
</p>

<div align="center">

[Features](#features) •
[Setup](#setup) •
[Resources](#further-resources)

</div>

Pin Save is a decentralized image, video sharing and content aggregation platform where users can not only control the content but also the platform itself.

1. The decentralized feed reinforces the discovery of content and feedback.
2. Decentralized Identity provides anonymity and data protection.
3. Upgradeable, resilient, and open decentralized storage.
4. Smart contracts to securely serve web experiences directly to users.

## Features

- Decentralized feed of NFTs on Optimism chain with decentralized storage on IPFS with NFTPort, Estuary and Nft.storage:

![decentralized feed](https://github.com/PinSaveDAO/PinSave-EVM/blob/evm/assets/feed.png)

- Decentralized comments section on orbis, ceramic and ipfs connected to a decentralized Pin Save identity, decentralized Pin Save post and ENS:

![decentralized comments](https://github.com/PinSaveDAO/PinSave-EVM/blob/evm/assets/comments.png)

- Decentralized Profile:

![decentralized Profile](https://github.com/PinSaveDAO/PinSave-EVM/blob/evm/assets/profile.png)

- Decentralized Profile ENS resolution:

![Pin Save ENS resolution Profile](https://github.com/PinSaveDAO/PinSave-EVM/blob/evm/assets/ensProfile.png)

- Pin Save update your profile page:

![Pin Save update your profile page](https://github.com/PinSaveDAO/PinSave-EVM/blob/evm/assets/updateProfile.png)

- Video and Image posting:

![Pin Save Upload](https://bafybeiaj46fxgxax6z3nd45n7p42rh7dbyweyssi3dunr3wfewh7ys2d7y.ipfs.nftstorage.link/)

- Livepeer Video Player:

![Video Player](https://bafybeiacg6yoxvxvk2ayugwlcfnnjpm5kcchvy3t2fl7mu64ft4zt4fs6m.ipfs.nftstorage.link/)

### Optimism Smart contracts

[Optimism Smart contracts](https://optimistic.etherscan.io/address/0x40F320CD3Cd616E59599568c4eA011E2eE49a175#code)

### Ceramic Orbis Context

[More information about Orbis Contexts](https://docs.useorbis.com/docs/primitives/contexts)

[Ceramic Scan Indexer Stream Data](https://cerscan.com/mainnet/stream/kjzl6cwe1jw147hcck185xfdlrxq9zv0y0hoa6shzskqfnio56lhf8190yaei7w)

## Setup

To run this project and start the project in development mode, install it locally using `yarn` and run `yarn dev`:

```bash
yarn
yarn dev
```

## Latest Updates

- Integrated ENS Name and Avatar resolver on Profile Display. [luc.eth profile](https://evm.pinsave.app/profile/0x225f137127d9067788314bc7fcc1f36746a3c3B5).
- Built API route and React-Query for Pin Save Comments.
- Built React Context for Orbis Client.
- Enhanced page to update your Profile.
- Refactoring Orbis types.
- Reported Bug in [Vercel dynamic catch-all routes](https://github.com/vercel/next.js/issues/64507).
- Removed faulty Lit Orbis encryption.
- Connected Vercel Analytics.

## Further Resources

[PinSave Figma Resources](https://www.figma.com/community/file/1102944149244783025)

Some interesting links that we keep returning to include and not limited to:

- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [next/image](https://nextjs.org/docs/api-reference/next/image)
- [Next Js ISG](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Universal Profiles](https://docs.lukso.tech/standards/universal-profile/introduction)
- [Working with Lit Access Control](https://litproject.substack.com/p/working-with-access-control)
- [Lit Supported Blockchains](https://developer.litprotocol.com/support/supportedchains/)
