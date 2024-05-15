import Cookies from "js-cookie";
import API from "./clients";
export const getOpenRouteRoute = async (coordinates: string) => {
  try {
    const params = new URLSearchParams();
    params.append("coordinates", coordinates);
    const response = await API.get("open-route/route", { params });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Response("Bad request", { status: 500 });
  }
};

export const getOptimizedOpenRouteRoute = async (coordinates: string) => {
  try {
    const params = new URLSearchParams();
    params.append("coordinates", coordinates);
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
