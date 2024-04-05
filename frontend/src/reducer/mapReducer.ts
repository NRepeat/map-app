import { MapReducerType, MapStateContextType } from "../types/types";
import { deleteMarker, updateMarkers, updateMarkersCoord } from "./actions";
export const reducer = (draft: MapStateContextType, action: MapReducerType) => {
  switch (action.type) {
    case "SET_MARKERS":
      draft.markers = updateMarkers(draft.markers, action.mapCenter);
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
    default:
      return draft;
  }
};
