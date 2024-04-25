import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/User";
import { AuthService } from "../auth.service";

export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }
  serializeUser(user: User, done: any) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: any) {
    const user = await this.authService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
