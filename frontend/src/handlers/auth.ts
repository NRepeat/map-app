import * as bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { googleAuth, jwtAuthLogin, jwtAuthRegistration } from "../api/auth";
import { User } from "../types/types";

export const authHandler = async () => {
  try {
    const user = await googleAuth();
  } catch (error) {}
};

export const userRegistrationHandler = async (data: User) => {
  try {
    if (data.password)
      bcrypt.hash(data.password, 8, function (err, hash) {
        jwtAuthRegistration({ email: data.email, password: hash });
      });
  } catch (error) {}
};

export const logout = () => {
  Cookies.remove("user");
  Cookies.remove("access_token");
  window.location.reload();
};

export const userLoginHandler = async (data: User) => {
  if (data.password)
    jwtAuthLogin({ email: data.email, password: data.password });
};
