import { CoordsType, MarkersType, Place } from "../types/types";
import { findWaypoints } from "../utils/findWaypoints";

export const updateMarkers = (
  id?: string,
  markers?: MarkersType[],
  center?: { lng: number; lat: number }
): MarkersType[] => {
  if (markers && markers.length >= 2) {
    const lastMarker = markers[markers.length - 1];
    const updatedMarkers = [
      ...markers.slice(0, markers.length - 1),
      { coords: [center!.lng, center!.lat], id, color: "#1500ff" },
      lastMarker,
    ] as MarkersType[];
    return [...updatedMarkers];
  } else if (!markers?.length) {
    return [{ coords: [center!.lng, center!.lat], id: id!, color: "#11c22c" }];
  } else if (id === "end") {
    return [
      ...markers,
      { coords: [center!.lng, center!.lat], id, color: "#c21120" },
    ] as MarkersType[];
  }
  return [
    ...markers,
    { coords: [center!.lng, center!.lat], id, color: "#c21120" },
  ] as MarkersType[];
};

export const updateMarkersCoord = (
  markers: MarkersType[],
  endPoint?: CoordsType,
  index?: number
) => {
  if (endPoint && index !== undefined && index >= 0 && index < markers.length) {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = {
      ...updatedMarkers[index],
      coords: endPoint,
    };

    return updatedMarkers;
  }

  return markers;
};

export const deleteMarker = (markers: MarkersType[], id: string) => {
  const indexToDelete = markers.findIndex((marker) => marker.id === id);

  if (indexToDelete !== markers.length - 1 && indexToDelete !== -1) {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    return updatedMarkers;
  } else if (indexToDelete !== -1 && markers.length > 1) {
    const prevMarker = markers[markers.length - 2];

    const updatedPrevMarker = { ...prevMarker, color: "#c21120" };
    markers[markers.length - 2] = updatedPrevMarker;

    markers.pop();
    return markers;
  } else if (indexToDelete !== -1 && markers.length === 1) {
    markers.pop();
  }

  return markers;
};

export const getWaypointsCoords = (
  waypoints: [number, number][],
  coords: [number, number][],
  dispatch: any
) => {
  const waypointsData = findWaypoints(waypoints, coords);
  dispatch({
    type: "SET_ROUTE_WAYPOINTS_COORDS",
    waypointsCoords: waypointsData,
  });
  return waypointsData;
};

export const setPlaces = (
  places: Place[] | undefined,
  place: Place,
  dispatch: any,
  start?: boolean,
  end?: boolean
) => {
  if (start) {
    if (places) {
      return dispatch({ type: "SET_PLACES", places: [place, ...places] });
    }
    return dispatch({ type: "SET_PLACES", places: [place] });
  }
  if (end) {
    place.end = true;

    if (places) {
      const newPlaces = [...places, place];
      console.log("🚀 ~ places:", newPlaces);

      dispatch({ type: "SET_PLACES", places: [...places, place] });
    }

    return dispatch({ type: "SET_PLACES", places: [place] });
  }
  if (!places) {
    throw new Error("Places not found");
  }
  const lastIndexOfPlace = places.lastIndexOf(place);
  if (lastIndexOfPlace !== -1) {
    const updatedPlaces = [
      ...places.slice(0, lastIndexOfPlace),
      place,
      ...places.slice(lastIndexOfPlace),
    ];
    dispatch({ type: "SET_PLACES", places: updatedPlaces });
  }
};
