import { Controller, Get } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor() {}
  @Get("/auth_redirect")
  async user() {}
}
