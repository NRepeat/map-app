import { autocomplete } from "../api/google";

export const handelAutocomplete = async () => {
  try {
    const data = await autocomplete();
    console.log("🚀 ~ handelAutocomplete ~ data:", data);
  } catch (error) {}
};
