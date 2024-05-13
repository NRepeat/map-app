import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { User } from "src/typeorm/entities/User";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./guards/google-oauth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Get("google/login")
  @UseGuards(GoogleOauthGuard)
  async login() {
    return { msg: "success" };
  }

  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    console.log(
      "🚀 ~ AuthController ~ googleAuthCallback ~ req.user:",
      req.user
    );
    const token = await this.authService.signJWT(req.user);

    res.cookie("access_token", token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    res.redirect("http://localhost:5173/");
  }
  @Post("login")
  async localLogin(@Body() body: User, @Res() res: Response) {
    try {
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");

      const user = await this.userService.findUser(body);
      console.log("🚀 ~ AuthController ~ localLogin ~ user:", user);

      if (!user) {
        res.send({ error: "Unauthorized" });
      }
      const token = await this.authService.signJWT(user);
      res.cookie("access_token", token, {
        maxAge: 2592000000,
        sameSite: true,
        secure: false,
      });
      res.send({ name: user.displayName, email: user.email });
    } catch (error) {}
  }

  @Post("registration")
  async localRegistration(@Body() body: User, @Res() res: Response) {
    try {
      if (body) {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        const exitUser = await this.userService.findUser(body);
        if (exitUser) {
          res.send({ user: "User already exist" });
        } else {
          const user = await this.userService.createUser(body);
          const token = await this.authService.signJWT(user);
          res.cookie("access_token", token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
          });

          res.send({ name: user.displayName, email: user.email });
        }
      } else {
        res.status(500);
      }
    } catch (error) {
      console.log("🚀 ~ AuthController ~ localRegistration ~ error:", error);
      throw new Error("asd");
    }
  }
}
