import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigsModule } from "./config/config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { OpenrouteModule } from "./modules/openroute/openroute.module";
@Module({
  imports: [ConfigsModule, OpenrouteModule, ConfigModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
