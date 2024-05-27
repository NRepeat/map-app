import { Controller, Get, Query, Res } from "@nestjs/common";

import { Response } from "express";
import { RouteService } from "../route/route.service";
import { OpenrouteService } from "./openroute.service";

@Controller("open-route")
export class OpenRouteController {
  constructor(
    private readonly openRouteService: OpenrouteService,
    private readonly routeService: RouteService
  ) {}
  @Get("route")
  async getRoute(
    @Res() res: Response,
    @Query() query: { coordinates: string; options: string }
  ) {
    try {
      const { coordinates, options } = query;
      const routeData = await this.openRouteService.fetchOpenRouteRoute({
        coordinates,
        routeOptions: options,
      });
      return res.status(200).json({
        message: "Route information retrieved successfully",
        coords: routeData.coordsOpenRouteData,
        error: routeData.error,
        options: routeData.optionsData,
        name: routeData.routeName,
      });
    } catch (error) {
      console.error("Error fetching route:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  @Get("optimized-route")
  async getOptimizedRoute(
    @Res() res: Response,
    @Query() query: { coordinates: string; options: string }
  ) {
    try {
      const { coordinates, options } = query;
      const routeData = await this.openRouteService.fetchOptimizedRoute({
        coordinates,
        options,
      });
      return res.status(200).json({
        message: "Optimized route information retrieved successfully",
        coords: routeData.coordsOpenRouteData,
        error: routeData.error,
        options: routeData.optionsData,
        name: routeData.routeName,
      });
    } catch (error) {
      console.error("Error fetching route:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
