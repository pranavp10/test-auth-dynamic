"use client";
import { AuthButton } from "@/auth/AuthButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Dev test</p>
      <AuthButton />
      <div>{JSON.stringify({ data, status })}</div>
    </main>
  );
}
