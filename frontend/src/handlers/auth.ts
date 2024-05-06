import * as bcrypt from "bcryptjs";
import { googleAuth, jwtAuthRegistration } from "../api/auth";
import { User } from "../types/types";
export const authHandler = async () => {
  try {
    const user = await googleAuth();
  } catch (error) {}
};

export const userRegistrationHandler = async (data: User) => {
  console.log("🚀 ~ userRegistrationHandler ~ data:", data);
  try {
    bcrypt.hash(data.password, 8, function (err, hash) {
      jwtAuthRegistration({ email: data.email, password: hash });
    });
  } catch (error) {}
};
