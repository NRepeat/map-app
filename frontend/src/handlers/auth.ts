import { googleAuth } from "../api/auth";

export const authHandler = async () => {
  try {
    const user = await googleAuth();
    console.log("🚀 ~ authHandler ~  user:", user);
  } catch (error) {}
};
