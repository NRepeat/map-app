import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "src/typeorm/entities/Route";
import { User } from "src/typeorm/entities/User";
import { AuthService } from "../auth/auth.service";
import { RouteService } from "../route/route.service";
import { UserService } from "../user/user.service";
import { OpenRouteController } from "./openroute.controller";
import { OpenrouteService } from "./openroute.service";

@Module({
  imports: [TypeOrmModule.forFeature([Route, User])],
  providers: [OpenrouteService, RouteService, UserService, AuthService],
  controllers: [OpenRouteController],
})
export class OpenrouteModule {}
