import Cookies from "js-cookie";
import { RouteOptions } from "../types/types";
import API from "./clients";
export const getOpenRouteRoute = async (
  coordinates: string,
  options: RouteOptions
) => {
  try {
    const params = new URLSearchParams();
    params.append("coordinates", coordinates);
    params.append("options", JSON.stringify(options));
    const response = await API.get("open-route/route", { params });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Response("Bad request", { status: 500 });
  }
};

export const getOptimizedOpenRouteRoute = async (
  coordinates: string,
  options?: RouteOptions | undefined
) => {
  try {
    const params = new URLSearchParams();
    params.append("coordinates", coordinates);
    params.append("options", JSON.stringify(options));
    const access_token = Cookies.get("access_token");
    const response = await API.get("open-route/optimized-route", {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Response("Bad request", { status: 500 });
  }
};
