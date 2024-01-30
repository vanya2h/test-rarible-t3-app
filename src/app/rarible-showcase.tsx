"use client";
import * as ApiClient from "@rarible/api-client";
import { toUnionAddress } from "@rarible/types";
import { useEffect, useState } from "react";
import { type RaribleSdkEnvironment } from "@rarible/sdk/build/config/domain";
import { useRaribleEnv } from "./env-context";

const options = ["development", "testnet", "prod"];
const evmAddressReg = new RegExp(/^(0x)?[0-9a-fA-F]{40}$/);

export function RaribleSdkShowcase() {
  const context = useRaribleEnv();
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (address && evmAddressReg.test(address)) {
      const blockchain = ApiClient.Blockchain.ETHEREUM;
      const asset: ApiClient.EthEthereumAssetType = { "@type": "ETH", blockchain };
      context.sdk.balances
        .getBalance(toUnionAddress(`${blockchain}:${address}`), asset)
        .then((x) => {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          setBalance(x.toString());
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [address, context]);

  return (
    <div>
      <div>
        <span>Select environment:</span>
        <select onChange={(e) => context.setEnv(e.target.value as RaribleSdkEnvironment)}>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <div>
        <span>Check balance:</span>
        <input placeholder="Enter address" value={address} onChange={(ev) => setAddress(ev.target.value)} />
      </div>
      <div>
        <span>Balance: {balance ?? "Balance"}</span>
      </div>
    </div>
  );
}
