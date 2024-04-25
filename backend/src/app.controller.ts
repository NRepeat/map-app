import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("/test")
  getHellos(@Req() req: Request): string {
    console.log("🚀 ~ AppController ~ getHellos ~  req:", req.user);

    return this.appService.getHello();
  }
  @Get("health-check")
  getHello(@Req() req: Request): string {
    console.log("🚀 ~ AppController ~ getHellos ~  req:", req.user);
    return this.appService.getHello();
  }
}
