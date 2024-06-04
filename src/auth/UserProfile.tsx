"use client";
import {
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

export const UserProfile = () => {
  const { setShowDynamicUserProfile } = useDynamicContext();

  return (
    <div>
      <button onClick={() => setShowDynamicUserProfile(true)}>
        user profile
      </button>
      <DynamicUserProfile />
    </div>
  );
};
