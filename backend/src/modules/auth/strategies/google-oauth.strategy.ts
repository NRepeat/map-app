import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService)
    private readonly configService: any,
    @Inject(AuthService) private readonly userService: AuthService
  ) {
    super({
      clientID: configService.internalConfig.google.CLIENT_ID,
      clientSecret: configService.internalConfig.google.CLIENT_SECRET,
      callbackURL: configService.internalConfig.google.CALLBACK_URL,
      scope: ["profile", "email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.userService.validateGoogleUser({
      displayName: profile.displayName,
      email: profile.emails[0].value,
    });

    return user || null;
  }
}
