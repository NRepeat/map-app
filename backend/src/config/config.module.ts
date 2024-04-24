import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configurations } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations.google, configurations.jwt],
      envFilePath: [`${process.env.NODE_ENV}.env`],
      isGlobal: true,
    }),
  ],
})
export class ConfigsModule {}
