import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Route } from "src/typeorm/entities/Route";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

export type RouteResponseType = {
  id: string;
  name: string;
  optimized: boolean;
  place_data: string;
  userEmail: string;
  totalDistance: number;
  options: string;
};

@Injectable()
export class RouteService {
  constructor(
    private userService: UserService,
    @InjectRepository(Route) private readonly routeRepository: Repository<Route>
  ) {}

  async createRoute(route: RouteResponseType) {
    try {
      const user = await this.userService.findUser(route.userEmail);
      if (!user) {
        throw new Error("User not found");
      }
      const createdRoute = this.routeRepository.create({
        name: route.name,
        optimized: route.optimized,
        totalDistance: route.totalDistance,
        options: route.options,
        route_place_data: route.place_data,
        route_id: route.id,
        user: { email: user.email },
      });
      const savedRoute = await this.routeRepository.save(createdRoute);
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
              totalDistance: route.totalDistance,
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
}
