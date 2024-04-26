import Cookies from "js-cookie";

export const autocomplete = async () => {
  try {
    const access_token = Cookies.get("access_token");
    console.log("🚀 ~ autocomplete ~ access_token:", access_token);
  } catch (error) {}
};
