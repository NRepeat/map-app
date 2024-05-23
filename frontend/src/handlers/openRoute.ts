import { v4 as uuidv4 } from "uuid";
import {
  getOpenRouteRoute,
  getOptimizedOpenRouteRoute,
} from "../api/openroute";
import { MarkersType } from "../types/types";
import { findWaypoints } from "../utils/findWaypoints";

export class OpenRoute {
  private dispatch: any;
  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }
  private getCoords(markers?: MarkersType[] | undefined) {
    if (!markers) {
      throw new Error("Markers not found");
    }
    const coordsOpenRoute = markers.map((marker) => marker.coords);
    const coordsOpenRouteJSON = JSON.stringify(coordsOpenRoute);
    return coordsOpenRouteJSON;
  }
  private setRouteDataTooState(routeCordsArr: any) {
    const routeData = routeCordsArr.map((route: any) => {
      const totalDistance = {
        distance: route.properties.summary.distance,
        duration: route.properties.summary.duration,
      };
      const steps = route.properties.segments.flatMap(
        (segment: any) => segment.steps
      );

      const waypoints = steps.map((step: any) => step.way_points);
      if (waypoints[0][0] === waypoints[1][0]) {
        waypoints.pop();
        steps.pop();
        waypoints.shift();
        steps.shift();
      }
      const waypointCoords = findWaypoints(waypoints, route.coordinates);

      return { id: route.id, steps, waypoints, totalDistance, waypointCoords };
    });
    this.dispatch({
      type: "SET_ROUTE_INSTRUCTIONS",
      routeInstructions: routeData,
    });
    this.dispatch({ type: "SET_OPEN_ROUTE_ROUTE", route: routeCordsArr });
  }
  async getOpenRouteRoute(markers: MarkersType[]) {
    const data = await getOpenRouteRoute(this.getCoords(markers));
    if (data.coords.error) {
      return null;
    }
    const routeCordsArr = data.coords.map((coord: any) => ({
      coordinates: coord.geometry.coordinates,
      properties: coord.properties,
      id: uuidv4(),
    }));

    this.setRouteDataTooState(routeCordsArr);
  }

  async getOptimizationRoute(markers: MarkersType[]) {
    try {
      const data = await getOptimizedOpenRouteRoute(this.getCoords(markers));
      const routeCordsArr = data.coords.map((coord: any) => ({
        coordinates: coord.geometry.coordinates,
        properties: coord.properties,
        id: uuidv4(),
      }));

      this.setRouteDataTooState(routeCordsArr);
    } catch (error) {
      throw new Error("Get Optimization Route error");
    }
  }
}
