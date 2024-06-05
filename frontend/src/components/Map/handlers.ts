import { handelGeocode } from "../../handlers/google";
import { LatLng, Place } from "../../types/types";

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
    dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: false });
    if (state) {
      console.log(
        "🚀 ~ handleClick ~ state.places.length:",
        state.places.length
      );
      const handleClick = async () => {
        if (!state.markers) {
          const coords: LatLng = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
            end: false,
            start: true,
          };
          const newPlaceData = await handelGeocode([coords.lat, coords.lng]);
          const newPlace: Place = {
            displayName: {
              text: newPlaceData.results[0].formatted_address,
            },
            location: {
              latitude: newPlaceData.results[0].geometry.location.lat,
              longitude: newPlaceData.results[0].geometry.location.lng,
            },
            id: newPlaceData.results[0].place_id,
            start: true,
          };
          dispatch({ type: "SET_PLACE", newPlace: newPlace });
          // dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true });
          return dispatch({
            type: "SET_MARKER",
            mapCenter: coords,
            markerId: newPlace.id,
          });

          // return dispatch({
          //   type: "SET_PLACE_TO_UPDATE",
          //   placeToUpdate: {
          //     place: start ? start : end,
          //     newCoords: [e.lngLat.lat, e.lngLat.lng],
          //     fromHandlePutMarkerOnClick: true,
          //   },
          // });
        } else if (state.markers.length === 1) {
          const coords: LatLng = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
            end: true,
            start: false,
          };
          const newPlaceData = await handelGeocode([coords.lat, coords.lng]);
          const newPlace: Place = {
            displayName: {
              text: newPlaceData.results[0].formatted_address,
            },
            location: {
              latitude: newPlaceData.results[0].geometry.location.lat,
              longitude: newPlaceData.results[0].geometry.location.lng,
            },
            id: newPlaceData.results[0].place_id,
            end: true,
          };
          dispatch({ type: "SET_PLACE", newPlace: newPlace });

          return dispatch({
            type: "SET_MARKER",
            mapCenter: coords,
            markerId: newPlace.id,
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
            end: false,
            start: false,
          };
          const newPlaceData = await handelGeocode([coords.lat, coords.lng]);
          const newPlace: Place = {
            displayName: {
              text: newPlaceData.results[0].formatted_address,
            },
            location: {
              latitude: newPlaceData.results[0].geometry.location.lat,
              longitude: newPlaceData.results[0].geometry.location.lng,
            },
            id: newPlaceData.results[0].place_id,
          };
          dispatch({ type: "SET_PLACE", newPlace: newPlace });
          return dispatch({
            type: "SET_MARKER",
            mapCenter: coords,
            markerId: newPlace.id,
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
