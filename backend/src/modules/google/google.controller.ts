import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("google")
export class GoogleController {
  @Get("autocomplete")
  @UseGuards(JwtAuthGuard)
  async placeAutocomplete() {
    try {
      const apiKey = "AIzaSyDxe2634ayBpmgAkoWBrTyckcYtp-MK974";

      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=Ukrain&inputtype=textquery&key=${apiKey}`;

      // const requestBody = {
      //   textQuery: "Spicy Vegetarian Food in Sydney, Australia",
      // };

      // const headers = {
      //   "Content-Type": "application/json",
      //   "X-Goog-Api-Key": apiKey,
      //   "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
      // };

      const response = await fetch(url);

      const data = await response.json();
      console.log("🚀 ~ GoogleController ~ placeAutocomplete ~ data:", data);
      return data;
    } catch (error) {
      console.log("🚀 ~ GoogleController ~ placeAutocomplete ~ error:", error);
    }
  }
}
