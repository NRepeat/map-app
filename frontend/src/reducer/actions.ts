import { v4 as uuidv4 } from "uuid";
import { CoordsType, MarkersType } from "../types/types";
import { findWaypoints } from "../utils/findWaypoints";

export const updateMarkers = (
  markers?: MarkersType[],
  center?: { lng: number; lat: number }
): MarkersType[] => {
  if (markers && markers.length >= 2) {
    const lastMarker = markers[markers.length - 1];
    const updatedMarkers = [
      ...markers.slice(0, markers.length - 1),
      { coords: [center!.lng, center!.lat], id: uuidv4(), color: "#1500ff" },
      lastMarker,
    ] as MarkersType[];
    return [...updatedMarkers];
  } else if (!markers?.length) {
    return [
      { coords: [center!.lng, center!.lat], id: uuidv4(), color: "#11c22c" },
    ];
  } else {
    return [
      ...markers,
      { coords: [center!.lng, center!.lat], id: uuidv4(), color: "#c21120" },
    ] as MarkersType[];
  }
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
