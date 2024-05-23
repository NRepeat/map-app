import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "src/typeorm/entities/Route";
import { User } from "src/typeorm/entities/User";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { RouteController } from "./route.controller";
import { RouteService } from "./route.service";

@Module({
  imports: [TypeOrmModule.forFeature([Route, User])],
  providers: [RouteService, UserService, AuthService],
  controllers: [RouteController],
})
export class RouteModule {}
