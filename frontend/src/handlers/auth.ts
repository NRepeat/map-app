import * as bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { googleAuth, jwtAuthLogin, jwtAuthRegistration } from "../api/auth";
import { User } from "../types/types";

export const authHandler = async () => {
  try {
    const user = await googleAuth();
  } catch (error) {}
};

export const userRegistrationHandler = async (data: User) => {
  try {
    if (data.password) {
      const hash = bcrypt.hashSync(data.password, 8);
      const isRegistered = await jwtAuthRegistration({
        email: data.email,
        password: hash,
      });
      const token = Cookies.get("access_token");
      if (isRegistered && token) {
        const user = jwtDecode(token) as any;
        if (isRegistered.user === "User already exist") {
          Cookies.remove("user");
          Cookies.remove("access_token");
          return false;
        }
        return user;
      }
    }
  } catch (error) {}
};

export const logout = () => {
  Cookies.remove("user");
  Cookies.remove("access_token");
  window.location.reload();
};

export const userLoginHandler = async (data: User) => {
  if (data.password) {
    await jwtAuthLogin(data);
    const token = Cookies.get("access_token");
    if (token) {
      const user = jwtDecode(token) as any;
      const isLogin = bcrypt
        .compare(data.password, user.password)
        .then((res) => {
          if (res) {
            return user;
          } else {
            Cookies.remove("user");
            Cookies.remove("access_token");
            return false;
          }
        });
      return isLogin;
    }
  }
};
