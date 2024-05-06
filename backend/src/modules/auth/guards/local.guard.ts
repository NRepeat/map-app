import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // loginUser
    const data = await this.authService.validateUser({
      email: request.body.email,
      password: request.body.password,
    });
    if (data) {
      return true;
    }
    return false;
  }
}
