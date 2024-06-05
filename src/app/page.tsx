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

export default function Home() {
  const { data, status } = useSession();
  const { primaryWallet } = useDynamicContext();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Dev test</p>
      <div>{JSON.stringify({ data, status })}</div>
      <DynamicWidget />
      <button
        onClick={async () => {
          try {
            if (primaryWallet) {
              const connection = await primaryWallet.connector.getPublicClient<
                Connection | undefined
              >();
              if (connection) {
                const fromKey = new PublicKey(primaryWallet.address);
                const toKey = new PublicKey(
                  "HkU5TuYHoR5PD9BeSVvmX8ogadm4hpbPM73fQgcWBHZ1"
                );
                const amountInLamports = Number(10) * 1000000000;

                const instructions = [
                  SystemProgram.transfer({
                    fromPubkey: fromKey,
                    lamports: amountInLamports,
                    toPubkey: toKey,
                  }),
                ];

                const blockhash = await connection.getLatestBlockhash();

                const messageV0 = new TransactionMessage({
                  instructions,
                  payerKey: fromKey,
                  recentBlockhash: blockhash.blockhash,
                }).compileToV0Message();

                const transferTransaction = new VersionedTransaction(messageV0);

                const signer =
                  await primaryWallet.connector.getSigner<ISolana>();

                const res = await signer.signAndSendTransaction(
                  transferTransaction
                );
                console.log(
                  `Transaction successful: https://solscan.io/tx/${res.signature}?cluster=devnet`
                );
              }
            }
          } catch (e) {
            console.log(e);
          }
        }}
      ></button>
    </main>
  );
}
