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

Pin Save is a decentralized image, video sharing and content aggregation platform where community controls the platform.

1. The decentralized feed reinforces the discovery of content and feedback.
2. Decentralized Identity provides anonymity and data protection.
3. Upgradeable, resilient decentralized storage.
4. Smart contracts to securely serve web experiences directly to users.

## Features

- Decentralized feed of NFTs on Optimism chain with decentralized storage on IPFS with NFTPort, Estuary and Nft.storage:

![decentralized feed](https://raw.githubusercontent.com/PinSaveDAO/PinSave-EVM/evm/assets/feed.png)

- Decentralized comments section on orbis, ceramic and ipfs connected to a decentralized Pin Save identity, decentralized Pin Save post and ENS:

![decentralized comments](https://raw.githubusercontent.com/PinSaveDAO/PinSave-EVM/evm/assets/comments.png)

- Decentralized Profile:

![decentralized Profile](https://raw.githubusercontent.com/PinSaveDAO/PinSave-EVM/evm/assets/profile.png)

- Decentralized Profile ENS resolution:

![Pin Save ENS resolution Profile](https://raw.githubusercontent.com/PinSaveDAO/PinSave-EVM/evm/assets/ensProfile.png)

- Pin Save update your profile page:

![Pin Save update your profile page](https://raw.githubusercontent.com/PinSaveDAO/PinSave-EVM/evm/assets/updateProfile.png)

- Video and Image posting:

![Pin Save Upload](https://bafybeiaj46fxgxax6z3nd45n7p42rh7dbyweyssi3dunr3wfewh7ys2d7y.ipfs.inbrowser.link/)

- Livepeer Video Player:

![Video Player](https://bafybeiacg6yoxvxvk2ayugwlcfnnjpm5kcchvy3t2fl7mu64ft4zt4fs6m.ipfs.inbrowser.link/)

### Optimism Smart contracts

[Optimism Smart contract Etherscan](https://optimistic.etherscan.io/address/0x40F320CD3Cd616E59599568c4eA011E2eE49a175#code)

[PinSave on EVM Explorer](https://evmexplorer.com/contracts/optimism/0x40F320CD3Cd616E59599568c4eA011E2eE49a175)

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
- Integrated ENS useEnsAddress hook from wagmi on upload page.
- Built API route and React-Query for Pin Save Comments.
- Built React Context for Orbis Client.
- Enhanced page to update your Profile.
- Refactoring Orbis types.
- Removed faulty Lit Orbis encryption.
- Connected Vercel Analytics.
- Built SEO Component and connected on every page.
- Fixed NFTPort as ipfs provider.

## Further Resources

- [PinSave Figma Resources](https://www.figma.com/community/file/1102944149244783025)
- [Zk Ok Pin Save](https://zkok.io/mina/pin-save/)
- [EthBucharest 2024: Zero Knowledge proofs on Mina, zkPassport and SoulBound NFTs](https://docs.google.com/presentation/d/1OmJJgzk4iFbKexqBw87oU7oh4H9lXlFFh3eas0EF9y8/edit?usp=sharing)
- [PinSave.app DR](https://ahrefs.com/website-authority-checker/?input=pinsave.app)
- [Npm Pin Save mina package](https://www.npmjs.com/package/pin-mina)
- [Pin Save on Dspyt](https://dspyt.com/PinSave)
- [Pin Save retroPGF3](https://round3.optimism.io/projects/0xc613e2a991ce0dbcf8fae1d6128e67543da9710e14831112fba654cc8fe8c389)

## RoadMap

We are at the stage where we need to improve read and write speeds for the content on PinSave.

Our Roadmap includes:

- Further enhancing SEO
- Fixing faulty Dweb ipfs provider
- Adding more Ipfs providers
- Researching further erc 725 contract and available registry contracts
- Deploying erc 725 contract once again and syncing orbis profiles
- Improving Upload page with batch mint
- Improving Upload page UX and UI
- Improving posts contract to contain function to display metadata
- Deploying PinSavePosts Contract V2 that contains function:
  - metadata function supported by marketplaces such as OpenSea
  - add new function similar to `tokenIdsOf` return uint instead of bytes
  - add a function to query posts by `bytes` `tokenId`

Some interesting links for developers:

- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [next/image](https://nextjs.org/docs/api-reference/next/image)
- [Next Js ISG](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Universal Profiles](https://docs.lukso.tech/standards/universal-profile/introduction)
- [Working with Lit Access Control](https://litproject.substack.com/p/working-with-access-control)
- [Lit Supported Blockchains](https://developer.litprotocol.com/support/supportedchains/)
