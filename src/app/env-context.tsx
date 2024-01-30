"use client";
import React, { type PropsWithChildren, useContext, useState } from "react";
import { type RaribleSdkEnvironment } from "@rarible/sdk/build/config/domain";
import { type IRaribleSdk } from "@rarible/sdk";
import { initializeSdk } from "./sdk";

export type RaribleEnvContext = {
  env: RaribleSdkEnvironment;
  sdk: IRaribleSdk;
  setEnv: React.Dispatch<React.SetStateAction<RaribleSdkEnvironment>>;
};

export const raribleEnvContext = React.createContext<RaribleEnvContext | undefined>(undefined);

export function RaribleEnvProvider({ children }: PropsWithChildren) {
  const [env, setEnv] = useState<RaribleSdkEnvironment>("prod");

  return (
    <raribleEnvContext.Provider
      value={{
        setEnv,
        env,
        sdk: initializeSdk(env),
      }}
    >
      {children}
    </raribleEnvContext.Provider>
  );
}

export function useRaribleEnv() {
  const ctx = useContext(raribleEnvContext);
  if (!ctx) throw new Error("Rarible context is not in the tree");
  return ctx;
}
