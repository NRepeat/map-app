import createHttpError from "http-errors";
import Cookies from "js-cookie";
import API from "./clients";
export const autocomplete = async () => {
  try {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      const { data } = await API.get("google/autocomplete", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    }
  } catch (error) {
    return createHttpError(500, "Error fetch google autocomplete");
  }
};
