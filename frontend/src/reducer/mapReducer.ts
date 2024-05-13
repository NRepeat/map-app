import { MapReducerType, MapStateContextType } from "../types/types";
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
    case "SET_MARKERS":
      draft.markers = updateMarkers(
        action.markerId,
        draft.markers,
        action.mapCenter
      );
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
    case "SET_ROUTE_WAYPOINTS_COORDS":
      {
        draft.waypointsCoords = action.waypointsCoords;
      }
      break;
    case "SET_PLACES":
      {
        draft.places = setPlaces(draft.places, action.newPlace);
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
    default:
      return draft;
  }
};
