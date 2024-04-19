import { v4 as uuidv4 } from "uuid";
import {
  getOpenRouteRoute,
  getOptimizedOpenRouteRoute,
} from "../api/openroute";
import { getWaypointsCoords } from "../reducer/actions";
import { MarkersType } from "../types/types";

export class OpenRoute {
  private dispatch: any;
  constructor(dispatch: any) {
    this.dispatch = dispatch;
  }
  async getOpenRouteRoute(markers: MarkersType[]) {
    const data = await getOpenRouteRoute(this.getCoords(markers));
    const routeCordsArr = data.coords.map((coord: any) => ({
      coordinates: coord.geometry.coordinates,
      properties: coord.properties,
      id: uuidv4(),
    }));
    this.dispatch({ type: "SET_OPEN_ROUTE_ROUTE", route: routeCordsArr });
  }
  private getCoords(markers?: MarkersType[] | undefined) {
    if (!markers) {
      throw new Error("Markers not found");
    }
    const coordsOpenRoute = markers.map((marker) => marker.coords);
    const coordsOpenRouteJSON = JSON.stringify(coordsOpenRoute);
    return coordsOpenRouteJSON;
  }
  async getOptimizationRoute(markers: MarkersType[]) {
    try {
      const data = await getOptimizedOpenRouteRoute(this.getCoords(markers));
      const routeCordsArr = data.coords.map((coord: any) => ({
        coordinates: coord.geometry.coordinates,
        properties: coord.properties,
        id: uuidv4(),
      }));
      const steps = data.coords[0].properties.segments[1].steps;
      const waypoints = steps.map((step: any) => step.way_points);

      const totalDistance = {
        distance: data.coords[0].properties.summary.distance,
        duration: data.coords[0].properties.summary.duration,
      };
      this.dispatch({ type: "SET_OPEN_ROUTE_ROUTE", route: routeCordsArr });
      this.dispatch({
        type: "SET_ROUTE_INSTRUCTIONS",
        routeInstructions: { steps, totalDistance, waypoints },
      });
      getWaypointsCoords(
        waypoints,
        routeCordsArr[0].coordinates,
        this.dispatch
      );
    } catch (error) {
      throw new Error("Get Optimization Route error");
    }
  }
}
