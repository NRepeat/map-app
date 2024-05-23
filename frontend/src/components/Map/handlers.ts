import { RouteType } from "../../types/types";

export const handlePutMarkerOnClick = (
  e: mapboxgl.MapLayerMouseEvent,
  state: any,
  dispatch: any,
  isHoverInfo: string | undefined,
  route: RouteType[] | undefined
) => {
  if (isHoverInfo) {
    if (isHoverInfo?.includes("roadLine-")) {
      const id = isHoverInfo.replace("roadLine-", "");
      dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: id });
      // if (route) {
      //   const foundRouteIndex = route.findIndex((r) => r.id === id);
      //   if (foundRouteIndex === -1) {
      //     console.log("Route not found");
      //   } else {
      //     const rtostart = route[foundRouteIndex];

      //     const newRoutes = [
      //       rtostart,
      //       ...route.slice(0, foundRouteIndex),
      //       ...route.slice(foundRouteIndex + 1),
      //     ];

      //     dispatch({ type: "SET_OPEN_ROUTE_ROUTE", route: newRoutes });
      //   }
      // }
      return;
    } else if (isHoverInfo?.includes("waypoint-")) {
      const id = isHoverInfo.replace("roadLine-", "");
      // dispatch({ type: "SET_SELECTED_WAYPOINT" });
      return;
    }
  }
  if (e.type === "click") {
    if (state.places) {
      const start = state.places[0].id === "start-place" && state.places[0];
      const end = state.places[1].id === "end-place" && state.places[1];

      if (start) {
        dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true });
        return dispatch({
          type: "SET_PLACE_TO_UPDATE",
          placeToUpdate: {
            place: start,
            newCoords: [e.lngLat.lat, e.lngLat.lng],
            fromHandlePutMarkerOnClick: true,
          },
        });
      } else if (end) {
        dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true });
        return dispatch({
          type: "SET_PLACE_TO_UPDATE",
          placeToUpdate: {
            place: end,
            newCoords: [e.lngLat.lat, e.lngLat.lng],
            fromHandlePutMarkerOnClick: true,
          },
        });
      } else {
        dispatch({
          type: "SET_PLACE_INSTANCE",
          placeInstance: {
            displayName: { text: "" },
            id: "instance-place",
            location: { latitude: 0, longitude: 0 },
            instance: true,
          },
        });
        dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true });
        return dispatch({
          type: "SET_PLACE_TO_UPDATE",
          placeToUpdate: {
            place: {
              displayName: { text: "" },
              id: "instance-place",
              location: { latitude: 0, longitude: 0 },
              instance: true,
            },
            newCoords: [e.lngLat.lat, e.lngLat.lng],
            fromHandlePutMarkerOnClick: true,
          },
        });
      }
    }
  }
};
