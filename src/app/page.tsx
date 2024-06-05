"use client";
import { AuthButton } from "@/auth/AuthButton";
import { useSession } from "next-auth/react";
import { ISolana } from "@dynamic-labs/solana";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { JUPSwap } from "./jub-swap";

export default function Home() {
  const { data, status } = useSession();
  const { primaryWallet } = useDynamicContext();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <p>Session Details</p>
        {/* <div>{JSON.stringify({ data, status })}</div> */}
      </div>
      <DynamicWidget />
      <JUPSwap />
    </main>
  );
}
