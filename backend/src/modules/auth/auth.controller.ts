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
import { LocalAuthGuard } from "./guards/local.guard";

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
    const token = await this.authService.signJWT(req.user);
    const user = req.user;
    res.cookie("access_token", token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.cookie("user", JSON.stringify(user), {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.redirect("http://localhost:5173/");
  }
  @Post("login")
  @UseGuards(LocalAuthGuard)
  async localLogin(@Body() body: User, @Res() res: Response) {
    try {
      const { password, ...user } = await this.userService.findUser(body);

      const token = await this.authService.signJWT(user);
      res.cookie("access_token", token, {
        maxAge: 2592000000,
        sameSite: true,
        secure: false,
      });
      res.cookie("user", JSON.stringify(user), {
        maxAge: 2592000000,
        sameSite: true,
        secure: false,
      });
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");
      res.send({ user });
    } catch (error) {}
  }
  @Post("registration")
  async localRegistration(@Body() body: User, @Res() res: Response) {
    try {
      if (body) {
        const user = await this.userService.createUser(body);
        if (user.email === body.email) {
          res.send({ user: "User already exist" });
        } else {
          const token = await this.authService.signJWT(user);
          res.cookie("access_token", token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
          });
          res.cookie("user", JSON.stringify(user), {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
          });
          res.send({ user });
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
