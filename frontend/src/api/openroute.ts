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
    const response = await API.get("open-route/optimized-route", { params });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Response("Bad request", { status: 500 });
  }
};
