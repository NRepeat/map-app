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
    if (state.places) {
      const handleClick = () => {
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
