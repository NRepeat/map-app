import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller("google")
export class GoogleController {
  @Get("autocomplete")
  @UseGuards(JwtAuthGuard)
  async placeAutocomplete() {
    try {
      // const auth = new google.auth.OAuth2(
      //   "1070310261194-8dkpov8j5n6rp2tm1gjnb76nkaohhc3t.apps.googleusercontent.com",
      //   "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",
      //   "http://localhost:3000/api/auth/google/callback"
      // );
      // google.options({
      //   auth: auth,
      // });
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&location=37.76999%2C-122.44696&radius=500&types=establishment&key=AIzaSyDxe2634ayBpmgAkoWBrTyckcYtp-MK974`;

      const response = await fetch(apiUrl);

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("🚀 ~ GoogleController ~ placeAutocomplete ~ error:", error);
    }
  }
}
