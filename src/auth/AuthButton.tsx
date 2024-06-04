"use client";

import { SignedOut } from "./SignedOut";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const AuthButton = () => (
  <SignedOut>
    <div className="w-full">
      <DynamicWidget />
    </div>
  </SignedOut>
);
