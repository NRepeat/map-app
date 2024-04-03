import { v4 as uuidv4 } from "uuid";
import { CoordsType, MarkersType } from "../types/types";

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
    // Delete the marker by filtering out the marker with the specified id
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    return updatedMarkers;
  } else if (indexToDelete !== -1 && markers.length > 1) {
    // Check if the marker exists and there is more than one marker
    // Get the second to last marker
    const prevMarker = markers[markers.length - 2];
    // Update the color of the second to last marker
    const updatedPrevMarker = { ...prevMarker, color: "#c21120" };
    markers[markers.length - 2] = updatedPrevMarker;
    // Remove the last marker from the array
    markers.pop();
    return markers;
  } else if (indexToDelete !== -1 && markers.length === 1) {
    // Check if there is only one marker
    // If there is only one marker, simply remove it
    markers.pop();
  }

  return markers;
};
