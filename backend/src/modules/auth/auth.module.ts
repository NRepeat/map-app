import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./guards/google-oauth.guard";

@Module({
  providers: [AuthService, JwtService, GoogleOauthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
