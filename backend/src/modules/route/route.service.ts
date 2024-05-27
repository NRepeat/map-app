import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Route } from "src/typeorm/entities/Route";
import { RouteSaveType } from "src/utils/types";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

@Injectable()
export class RouteService {
  constructor(
    private userService: UserService,
    @InjectRepository(Route) private readonly routeRepository: Repository<Route>
  ) {}

  async createRoute(route: RouteSaveType) {
    try {
      const {
        coordinates,
        id,
        properties,
        name,
        optimized,
        options,
        places,
        userEmail,
      } = route;

      const existRoute = await this.routeRepository.findOne({
        where: {
          route_id: id,
        },
      });
      if (existRoute) {
        return existRoute;
      }
      const user = await this.userService.findUser(userEmail);
      if (!user) {
        throw new Error("User not found");
      }
      const routeDB = this.routeRepository.create({
        name,
        optimized,
        options: JSON.stringify(options),
        route_id: id,
        coords: JSON.stringify(coordinates),
        route_place_data: places,
        user: { id: user.id },
        properties: JSON.stringify(properties),
      });

      const savedRoute = await this.routeRepository.save(routeDB);
      if (!savedRoute) {
        throw new Error("Save route error");
      }
      return savedRoute;
    } catch (error) {
      throw new Error("Save route error");
    }
  }
  async getAllRoutes(pageSize = 10) {
    try {
      let page = 1;
      let hasMore = true;
      const allRoutes = [];

      while (hasMore) {
        const routes = await this.routeRepository.find({
          skip: (page - 1) * pageSize,
          take: pageSize,
        });

        if (routes.length === 0) {
          hasMore = false;
        } else {
          const parsedRoutesData = routes.map((route) => {
            return {
              name: route.name,
              properties: route.properties,
              options: route.options,
              route_id: route.route_id,
              optimized: route.optimized,
            };
          });
          allRoutes.push(parsedRoutesData);
          page++;
        }
      }

      return allRoutes;
    } catch (error) {
      throw new Error("Get all routes error");
    }
  }

  async getRoute(id: string) {
    try {
      const route = this.routeRepository.findOne({ where: { route_id: id } });

      return route || null;
    } catch (error) {
      throw new Error("Error find route");
    }
  }
  async saveRoute(routeData: any) {
    console.log("🚀 ~ RouteService ~ saveRoute ~ routeData:", routeData.body);
    try {
      const route = JSON.parse(routeData.body) as RouteSaveType;
      console.log("🚀 ~ RouteService ~ saveRoute ~ route:", route);
      const savedRoute = await this.createRoute(route);
      return savedRoute || null;
    } catch (error) {
      console.log("🚀 ~ RouteService ~ saveRoute ~ error:", error);
      throw new Error("Error save route");
    }
  }
}
