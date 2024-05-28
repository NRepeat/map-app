import { Body, Controller, Get, Post, Query } from "@nestjs/common";
const apiKey = "AIzaSyDxe2634ayBpmgAkoWBrTyckcYtp-MK974";

@Controller("google")
export class GoogleController {
  @Post("autocomplete")
  // @UseGuards(JwtAuthGuard)
  async placeAutocomplete(@Body() body: { value: string }) {
    try {
      const url = `https://places.googleapis.com/v1/places:autocomplete`;
      const requestBody = {
        input: body.value,
        languageCode: "en",
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      return data.suggestions;
    } catch (error) {
      console.log("🚀 ~ GoogleController ~ placeAutocomplete ~ error:", error);
    }
  }
  @Get("place")
  async place(@Query() query: { place_id: string }) {
    try {
      const suggestion = query.place_id;
      const placeUrl = `https://places.googleapis.com/v1/places/${suggestion}?fields=id,location,displayName&languageCode=en&key=${apiKey}`;
      const placeResponse = await fetch(placeUrl);
      if (!placeResponse.ok) {
        throw new Error("Place response bad request");
      }
      const placeData = await placeResponse.json();

      return placeData;
    } catch (error) {
      console.log("🚀 ~ GoogleController ~ place ~ (error:", error);
    }
  }
  @Post("geocodeLatLng")
  async geocode(@Body() body: { value: [lat: number, lng: number] }) {
    const latlng = body.value.join(",");
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}&enable_address_descriptor=true`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Bad request to geocode");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("🚀 ~ GoogleController ~ geocode ~ error:", error);
    }
  }
}
