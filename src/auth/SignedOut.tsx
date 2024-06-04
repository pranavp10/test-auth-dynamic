"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export const SignedOut = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  if (status === "unauthenticated") return <>{children}</>;
};
