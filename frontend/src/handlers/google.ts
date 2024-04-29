import { autocomplete } from "../api/google";

export const handelAutocomplete = async (value: string) => {
  try {
    const data = await autocomplete({ value });

    return data;
  } catch (error) {
    throw new Error("Autocomplete error");
  }
};
