import createHttpError from "http-errors";
import API from "./clients";
export const autocomplete = async (body: { value: string }) => {
  try {
    const { data } = await API.post("google/autocomplete", {
      ...body,
    });
    return data;
  } catch (error) {
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
