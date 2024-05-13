import { autocomplete, geocode, place } from "../api/google";
import { Place, PlacePrediction } from "../types/types";

export const handelAutocomplete = async (value: string) => {
  try {
    const data = await autocomplete({ value });

    const predictions: PlacePrediction[] = data.map((prediction: any) => {
      const typedPrediction = {
        place: prediction.placePrediction.place,
        placeId: prediction.placePrediction.placeId,
        text: prediction.placePrediction.text.text,
      };
      return typedPrediction;
    });

    return predictions;
  } catch (error) {
    throw new Error("Autocomplete error");
  }
};

export const handelGeocode = async (value: [lat: number, lng: number]) => {
  try {
    const data = await geocode({ value });
    return data;
  } catch (error) {}
};

export const handelGetPlace = async (value: string) => {
  try {
    const data: Place = await place(value);

    return data;
  } catch (error) {}
};
