import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OpenrouteModule } from "./modules/openroute/openroute.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    OpenrouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
