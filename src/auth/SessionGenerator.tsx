"use client";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getCsrfToken, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export const SessionGenerator = ({ children }: { children: ReactNode }) => {
  const { update, status } = useSession();
  const { authToken, primaryWallet } = useDynamicContext();

  const generateSession = async () => {
    try {
      if (authToken && primaryWallet && status === "unauthenticated") {
        const csrfToken = await getCsrfToken();
        fetch("/api/auth/callback/credentials", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `csrfToken=${encodeURIComponent(
            csrfToken
          )}&token=${encodeURIComponent(authToken)}`,
        })
          .then(async (res) => {
            if (res.ok) {
              await update();
            } else {
              console.error("unable to login");
            }
          })
          .catch((error) => {
            console.error("unable to login", error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    generateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, primaryWallet, status]);

  return <>{children}</>;
};
