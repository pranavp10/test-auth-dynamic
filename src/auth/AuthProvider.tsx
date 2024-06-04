"use client";
import { ReactNode } from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <DynamicContextProvider
    theme="auto"
    settings={{
      environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
      walletConnectors: [SolanaWalletConnectors],
    }}
  >
    {children}
  </DynamicContextProvider>
);
