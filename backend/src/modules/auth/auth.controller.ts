import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/typeorm/entities/User";
import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./guards/google-oauth.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { LocalAuthGuard } from "./guards/local.guard";

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

    res.cookie("access_token", token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });
    res.redirect("http://localhost:5173/");
  }
  @Get("jwt/login")
  @UseGuards(JwtAuthGuard)
  async jwtLogin(@Req() req: Request) {
    return req.user;
  }
  @Post("jwt/registration")
  @UseGuards(LocalAuthGuard)
  async localRegistration(@Req() req: Request, @Body() body: { user: User }) {
    try {
      console.log("🚀 ~ AuthController ~ jwtRegistration ~ req:", req.body);
      console.log("🚀 ~ AuthController ~ jwtRegistration ~ body:", body.user);

      // const hash = await bcrypt.compare(body.user.password, "nna@gmail.com");
      // bcrypt.compare("nna@gmail.com", body.user.password).then((res) => {
      //   console.log("🚀 ~ AuthController ~ bcrypt.compare ~ res:", res);
      //   if(res ){

      //   }
      // });
    } catch (error) {}
  }
}
