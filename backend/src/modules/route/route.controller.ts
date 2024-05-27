import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { RouteService } from "./route.service";

// @UseGuards(JwtAuthGuard)
@Controller("route")
export class RouteController {
  constructor(private routeService: RouteService) {}
  @Post("save")
  async saveRoute(@Res() res: Response, @Body() body) {
    try {
      const savedRoute = await this.routeService.saveRoute(body);

      res.send({ route: savedRoute });
    } catch (error) {}
  }

  @Get("all")
  async getAllRouts(
    @Res() res: Response,
    @Query() query: { pageSize: number; email: string }
  ) {
    try {
      console.log("🚀 ~ RouteController ~ query:", query);

      const allRoutes = await this.routeService.getAllRoutes(
        query.pageSize,
        query.email
      );
      console.log("🚀 ~ RouteController ~  allRoutes:", allRoutes);
      res.send({ allRoutes });
    } catch (error) {
      throw new Error("Get all routes error");
    }
  }

  @Get("route")
  async getRoute(@Res() res: Response, @Query() query: { routeId: string }) {
    try {
      const route = this.routeService.getRoute(query.routeId);
      if (!route) {
        res.send({ error: "Route not found" });
      }
      res.send({ route });
    } catch (error) {
      throw new Error("Route get error");
    }
  }
}
