"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export const SignedIn = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  if (status === "authenticated") return <>{children}</>;
};
