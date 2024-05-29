import createHttpError from "http-errors";
import API from "./clients";
export const autocomplete = async (body: { value: string }) => {
  console.log("🚀 ~ autocomplete ~ body:", body);
  try {
    const { data } = await API.post("google/autocomplete", {
      ...body,
    });
    console.log("🚀 ~ autocomplete ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ autocomplete ~ error:", error);
    return createHttpError(500, "Error fetch google autocomplete");
  }
};

export const geocode = async (body: { value: [lat: number, lng: number] }) => {
  try {
    const { data } = await API.post("google/geocodeLatLng", {
      ...body,
    });
    return data;
  } catch (error) {
    return createHttpError(500, "Error fetch google geocode");
  }
};

export const place = async (value: string) => {
  try {
    const { data } = await API.get(`google/place?place_id=${value}`);
    return data;
  } catch (error) {
    return createHttpError(500, "Error fetch google place");
  }
};
