import { v4 as uuidv4 } from "uuid";
import { LatLng } from "../../types/types";

export const handlePutMarkerOnClick = (
  e: mapboxgl.MapLayerMouseEvent,
  state: any,
  dispatch: any,
  isHoverInfo: string | undefined
) => {
  if (isHoverInfo) {
    if (isHoverInfo?.includes("roadLine-")) {
      const id = isHoverInfo.replace("roadLine-", "");
      dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: id });
      return;
    } else if (isHoverInfo?.includes("waypoint-")) {
      return;
    }
  }

  if (e.type === "click") {
    if (state) {
      const handleClick = () => {
        if (!state.markers) {
          const coords: LatLng = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
            end: false,
            start: true,
          };
          return dispatch({
            type: "SET_MARKER",
            mapCenter: coords,
            markerId: uuidv4(),
          });
          // return dispatch({
          //   type: "SET_PLACE_TO_UPDATE",
          //   placeToUpdate: {
          //     place: start ? start : end,
          //     newCoords: [e.lngLat.lat, e.lngLat.lng],
          //     fromHandlePutMarkerOnClick: true,
          //   },
          // });
        } else if (state.markers.length <= 1) {
          const coords: LatLng = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
            end: true,
            start: false,
          };
          return dispatch({
            type: "SET_MARKER",
            mapCenter: coords,
            markerId: uuidv4(),
          });
          // return dispatch({
          //   type: "SET_PLACE_TO_UPDATE",
          //   placeToUpdate: {
          //     place: {
          //       displayName: { text: "" },
          //       id: "instance-place",
          //       location: { latitude: 0, longitude: 0 },
          //       instance: true,
          //     },
          //     newCoords: [e.lngLat.lat, e.lngLat.lng],
          //     fromHandlePutMarkerOnClick: true,
          //   },
          // });
        } else {
          const coords: LatLng = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
          };
          return dispatch({
            type: "SET_MARKER",
            mapCenter: coords,
            markerId: uuidv4(),
          });
        }
      };
      const debouncedHandleClick = debounce(handleClick, 100);
      debouncedHandleClick();
    }
  }
};
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}
