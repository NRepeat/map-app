import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./guards/google-oauth.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("google/login")
  @UseGuards(GoogleOauthGuard)
  async login() {
    console.log("test");
    return { msg: "success" };
  }

  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const token = await this.authService.signJWT(req.user);
    console.log("🚀 ~ AuthController ~ googleAuthCallback ~ token:", token);

    res.cookie("access_token", token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.redirect("http://localhost:5173/");
  }
  @Get("status")
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: Request) {
    return req.user;
  }
}
