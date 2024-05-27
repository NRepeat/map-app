import { saveRoute } from "../api/route";
import { MapReducerType, MapStateContextType, RouteType } from "../types/types";
import {
  deleteMarker,
  deletePlace,
  setPlaces,
  updateMarkers,
  updateMarkersCoord,
  updatePlaces,
} from "./actions";
export const reducer = (draft: MapStateContextType, action: MapReducerType) => {
  switch (action.type) {
    case "SET_MARKER":
      draft.markers = updateMarkers(
        action.markerId,
        draft.markers,
        action.mapCenter
      );
      break;
    case "SET_MARKERS":
      draft.markers = action.markers;
      break;
    case "UPDATE_MARKER_ID":
      {
        const data = action.updateMarkerId;
        const markerToUpdate = draft.markers?.find(
          (marker) => marker.id === data?.id
        );
        if (markerToUpdate && data?.newId && draft.markers) {
          const newMarker = {
            ...markerToUpdate,
            id: data.newId,
          };

          const newMarkers = draft.markers.map((marker) =>
            marker.id === data.id ? newMarker : marker
          );

          draft.markers = newMarkers;
        }
      }
      break;
    case "UPDATE_MARKERS_CORDS":
      {
        if (!draft.markers) {
          throw new Error("Markers not found");
        }
        draft.markers = updateMarkersCoord(
          draft.markers,
          action.markerEndPoint,
          action.markerIndex
        );
      }
      break;
    case "DELETE_MARKER":
      {
        if (!draft.markers) {
          throw new Error("Markers not found");
        }
        if (!action.markerId) {
          throw new Error("Marker id not found");
        }
        draft.markers = deleteMarker(draft.markers, action.markerId);
      }
      break;
    case "SET_OPEN_ROUTE_ROUTE":
      {
        draft.route = action.route;
      }
      break;
    case "SET_MAP_LOADING":
      {
        draft.mapLoading = action.mapLoading;
      }
      break;
    case "SET_ROUTE_INSTRUCTIONS":
      {
        draft.routeInstructions = action.routeInstructions;
      }
      break;
    case "SET_PLACE":
      {
        draft.places = setPlaces(draft.places, action.newPlace);
      }
      break;
    case "SET_PLACES":
      {
        draft.places = action.places;
      }
      break;
    case "UPDATE_PLACES":
      {
        draft.places = updatePlaces(
          draft.placeToUpdate?.place.id,
          action.newPlace,
          draft.places
        );
      }
      break;
    case "SET_PLACE_TO_UPDATE":
      {
        draft.placeToUpdate = action.placeToUpdate;
      }
      break;
    case "SET_USER":
      {
        draft.user = action.user;
      }
      break;
    case "SET_PLACE_INSTANCE":
      {
        draft.places = setPlaces(draft.places, action.placeInstance);
      }
      break;
    case "DELETE_PLACE":
      {
        draft.places = deletePlace(draft.places!, action.markerId!);
      }
      break;
    case "SET_IS_TO_UPDATE":
      {
        draft.isToUpdate = action.isToUpdate;
      }
      break;
    case "CLEAR_ROUTE_PLACE_DATA":
      {
        draft.routeInstructions = undefined;
        draft.route = [];
        draft.coords = [0, 0];
        draft.markers = undefined;
        draft.places = [
          {
            displayName: { text: "Start" },
            id: "start-place",
            location: { latitude: 0, longitude: 0 },
          },
          {
            displayName: { text: "Stop" },
            id: "end-place",
            location: { latitude: 0, longitude: 0 },
          },
        ];
      }
      break;
    case "SET_SELECTED_ROUTE":
      {
        draft.selectedRoute = action.selectedRoute;
      }
      break;
    case "SET_SELECTED_ROUTE_ID":
      {
        draft.selectedRouteId = action.selectedRouteId;
      }
      break;
    case "SET_SELECTED_WAYPOINT":
      {
        draft.selectedWaypoint = action.selectedWaypoint;
      }
      break;
    case "SET_LOADING":
      {
        draft.loading = action.loading;
      }
      break;
    case "SET_IS_OPEN_ROUTE_INSTRUCTION":
      {
        draft.isOpenRouteInstruction = action.isOpenRouteInstruction;
      }
      break;
    case "SET_ROUTE_OPTIONS":
      {
        draft.options = action.options;
      }
      break;
    case "SAVE_ROUTE":
      {
        const routeToSave = draft.route?.find(
          (route) => route.id === action.selectedRouteId
        );
        if (routeToSave) {
          const { user, places } = draft;
          const route = {
            optimized: true,
            places: JSON.stringify(places),
            userEmail: user?.email,
            ...routeToSave,
          };
          saveRoute(route);

          draft.routeToSave = route;
        }
      }
      break;
    case "SET_IS_SAVED_ROUTES":
      {
        draft.isSavedRouteOpen = action.isSavedRouteOpen;
      }
      break;
    case "SET_SAVED_ROUTES":
      {
        if (action.savedRoutes) {
          console.log("🚀 ~ reducer ~ action.savedRoutes:", action.savedRoutes);
          const savedRoutes: RouteType[] = action.savedRoutes.map((route) => {
            console.log(
              "🚀 ~ constsavedRoutes:RouteType[]=action.savedRoutes.map ~ route:",
              route
            );
            const coordinates = JSON.parse(route.coordinates as any);
            console.log(
              "🚀 ~ constsavedRoutes:RouteType[]=action.savedRoutes.map ~ coordinates:",
              coordinates
            );
            const properties = JSON.parse(route.properties as any);
            console.log(
              "🚀 ~ constsavedRoutes:RouteType[]=action.savedRoutes.map ~ properties:",
              properties
            );
            const options = JSON.parse(route.options as any);
            console.log(
              "🚀 ~ constsavedRoutes:RouteType[]=action.savedRoutes.map ~ options:",
              options
            );
            const places = JSON.parse(route.places as any);
            console.log(
              "🚀 ~ constsavedRoutes:RouteType[]=action.savedRoutes.map ~ places:",
              places
            );
            const savedRoute: RouteType = {
              coordinates,
              properties,
              name: route.name,
              optimized: route.optimized,
              options,
              places,
              userEmail: route.userEmail,
              id: route.id,
            };
            return savedRoute;
          });
          draft.savedRoutes = savedRoutes;
        }
      }
      break;
    default:
      return draft;
  }
};
