"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Connection, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { useState } from "react";
// @ts-ignore
import { ITurnkeySolanaSigner } from "@dynamic-labs/solana";

export const JUPSwap = () => {
  const { primaryWallet } = useDynamicContext();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div>
      {primaryWallet && (
        <button
          className="border p-3 rounded-2xl bg-gray-800"
          onClick={async () => {
            try {
              if (primaryWallet) {
                const connection =
                  await primaryWallet.connector.getPublicClient<
                    Connection | undefined
                  >();
                if (connection) {
                  setLoading(true);
                  const fromKey = new PublicKey(primaryWallet.address);
                  const quoteResponseData = await fetch(
                    "https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=5793778"
                  );
                  const quoteResponse = await quoteResponseData.json();
                  const swapTransactionData = await fetch(
                    "https://quote-api.jup.ag/v6/swap",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        quoteResponse,
                        userPublicKey: fromKey,
                        wrapAndUnwrapSol: true,
                      }),
                    }
                  );

                  const { swapTransaction } = await swapTransactionData.json();
                  const swapTransactionBuf = Buffer.from(
                    swapTransaction,
                    "base64"
                  );
                  var transaction =
                    VersionedTransaction.deserialize(swapTransactionBuf);
                  const signer =
                    await primaryWallet.connector.getSigner<ITurnkeySolanaSigner>();
                  await signer
                    .signAndSendTransaction(transaction)
                    .then((res: any) => {
                      console.log(res);
                      console.log(
                        "Transaction successful: https://solscan.io/tx/${res}?cluster=devnet"
                      );
                    })
                    .catch((reason: any) => {
                      console.error("Transaction failed:", reason);
                    });
                }
              }
              setLoading(false);
            } catch (e) {
              setLoading(false);
            }
          }}
        >
          {!loading ? "JUP swap API" : "loading..."}
        </button>
      )}
    </div>
  );
};
