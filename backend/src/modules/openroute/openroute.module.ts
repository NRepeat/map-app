import { Module } from "@nestjs/common";
import { OpenRouteController } from "./openroute.controller";
import { OpenrouteService } from "./openroute.service";

@Module({
  providers: [OpenrouteService],
  controllers: [OpenRouteController],
})
export class OpenrouteModule {}
