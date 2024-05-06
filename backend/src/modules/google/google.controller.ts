import { Body, Controller, Post } from "@nestjs/common";

@Controller("google")
export class GoogleController {
  @Post("autocomplete")
  // @UseGuards(JwtAuthGuard)
  async placeAutocomplete(@Body() body: { value: string }) {
    try {

      const apiKey = "AIzaSyDxe2634ayBpmgAkoWBrTyckcYtp-MK974";

      // const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=${body.value}&inputtype=textquery&key=${apiKey}`;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${body.value}&language=en,uk&key=${apiKey}`;
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
