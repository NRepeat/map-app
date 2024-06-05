import Cookies from "js-cookie";
import { RouteType } from "../types/types";
import API from "./clients";
export const saveRoute = async (bodyData: RouteType) => {
  try {
    const access_token = Cookies.get("access_token");
    const body = JSON.stringify(bodyData);
    const response = await API.post(
      "route/save",
      {
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {}
};

export const getAllRoutes = async ({
  email,
  pageSize,
}: {
  pageSize: number;
  email: string;
}) => {
  try {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("pageSize", pageSize.toString());
    const access_token = Cookies.get("access_token");
    const response = await API.get("route/all", {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
