import { Injectable } from "@nestjs/common";
import { RouteOptions } from "src/utils/types";
import { headers } from "./headers/headers";

@Injectable()
export class OpenrouteService {
  constructor() {}

  async fetchOpenRouteRoute({
    coordinates,
    options,
  }: {
    coordinates: string | [number, number][];
    options: string;
    body?: any;
  }) {
    try {
      const optionsData: RouteOptions = JSON.parse(options);
      let coordsOpenRoute;
      if (Array.isArray(coordinates)) {
        coordsOpenRoute = coordinates;
      } else {
        coordsOpenRoute = JSON.parse(coordinates);
      }
      const jsonCoords =
        coordsOpenRoute.length > 2
          ? JSON.stringify({ coordinates: coordsOpenRoute })
          : JSON.stringify({
              coordinates: coordsOpenRoute,
              alternative_routes: {
                target_count: 3,
                weight_factor: 1.4,
                share_factor: 0.6,
              },
            });

      const responseOpenRoute = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        { headers, method: "POST", body: jsonCoords }
      );
      const data = (await responseOpenRoute.json()) as any;
      const coordsOpenRouteData = data.features;
      if (data.error) {
        return { error: data.error };
      }
      return { coordsOpenRouteData, optionsData };
    } catch (error) {
      throw new Response("Error", { status: 500 });
    }
  }
  async fetchOptimizedRoute({
    coordinates,
    options,
  }: {
    coordinates: string;
    options: string;
  }) {
    try {
      const coordsOpenRoute = JSON.parse(coordinates);
      const jobs = coordsOpenRoute.map((marker, i) => {
        return {
          id: i,
          location: marker,
          skills: [1],
        };
      });
      const vehicles = [
        {
          id: 1,
          profile: "driving-car",
          start: coordsOpenRoute[0],
          end: coordsOpenRoute[coordsOpenRoute.length - 1],
          capacity: [1],
          skills: [1],
        },
      ];
      const bodyOPEN_ROUTE_OPT = JSON.stringify({ jobs, vehicles });

      const responseOPEN_ROUTE_OPT = await fetch(
        "https://api.openrouteservice.org/optimization",
        {
          headers,
          method: "POST",
          body: bodyOPEN_ROUTE_OPT,
        }
      );

      const optimizedRoutesData = await responseOPEN_ROUTE_OPT.json();

      const optimizedRoutesCords = optimizedRoutesData.routes[0].steps.map(
        (step: any) => step.location
      );

      const optimizedData = await this.fetchOpenRouteRoute({
        coordinates: optimizedRoutesCords,
        options,
      });
      return optimizedData;
    } catch (error) {
      throw new Response("Error", { status: 500 });
    }
  }
}
