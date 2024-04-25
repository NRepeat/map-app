import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./strategies/google-oauth.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { SessionSerializer } from "./utils/serializer";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: "abc123",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [GoogleStrategy, AuthService, SessionSerializer, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
