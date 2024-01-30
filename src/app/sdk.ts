import { ethers } from "ethers";
import { EthersWeb3ProviderEthereum } from "@rarible/ethers-ethereum";
import { env as appEnv } from "../env";
import { createRaribleSdk } from "@rarible/sdk";
import { type RaribleSdkEnvironment } from "@rarible/sdk/build/config/domain";
import { type IRaribleSdkConfig } from "@rarible/sdk/build/domain";

// @todo next add a public client stuff here.

// export const client = createPublicClient({
//   chain: mainnet,
//   transport: http(),
// })

declare global {
  interface Window {
    // It tells us whether user have injected wallet (e.g. MetaMask) or not
    ethereum: ethers.providers.ExternalProvider | undefined;
  }
}

export function initializeSdk(env: RaribleSdkEnvironment) {
  const config: IRaribleSdkConfig = {
    apiKey: appEnv.NEXT_PUBLIC_RARIBLE_API_KEY,
  };
  if (typeof window !== "undefined") {
    const currentProvider = window.ethereum;
    if (!currentProvider) throw new Error("No injected wallet defined");
    const web3Provider = new ethers.providers.Web3Provider(currentProvider);
    const ethersProvider = new EthersWeb3ProviderEthereum(web3Provider);
    return createRaribleSdk(ethersProvider, env, config);
  }
  return createRaribleSdk(undefined, env, config);
}
