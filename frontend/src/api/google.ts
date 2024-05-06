import createHttpError from "http-errors";
import API from "./clients";
export const autocomplete = async (body: { value: string }) => {
  try {
      const { data } = await API.post(
        "google/autocomplete",
        {
          ...body,
        },
      );
      return data;

  } catch (error) {
    return createHttpError(500, "Error fetch google autocomplete");
  }
};
