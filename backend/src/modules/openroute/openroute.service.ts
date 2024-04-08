import { Injectable } from "@nestjs/common";
import { headers } from "./headers/headers";

// type CoordsType = [number, number][];

@Injectable()
export class OpenrouteService {
  constructor() {}

  async fetchOpenRouteRoute({ coordinates }: { coordinates: string }) {
    try {
      const coordsOpenRoute = JSON.parse(coordinates);
      const jsonCoords =
        coordsOpenRoute?.length > 2
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
      return coordsOpenRouteData;
    } catch (error) {
      throw new Response("Error", { status: 500 });
    }
  }
  async fetchOptimizedRoute() {}
}
