import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigsModule } from "./config/config.module";
import { configService } from "./config/config.service";
import { AuthModule } from "./modules/auth/auth.module";
import { GoogleModule } from "./modules/google/google.module";
import { OpenrouteModule } from "./modules/openroute/openroute.module";
@Module({
  imports: [
    ConfigsModule,
    OpenrouteModule,
    ConfigModule,
    AuthModule,
    GoogleModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),

    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
