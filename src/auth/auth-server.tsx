"use server";

import { signOut } from ".";

export const logOutUser = async () => {
  try {
    await signOut();
  } catch (e) {
    console.log(e);
  }
};
