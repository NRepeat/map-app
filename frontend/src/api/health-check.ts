import API from "./clients";

export const healthCheck = async () => {
  try {
    const response = await API.get("health-check");
    if (response.status === 500) {
      return "bad";
    }
    return "nice";
  } catch (error) {
    throw new Response("Bad request", { status: 500 });
  }
};
