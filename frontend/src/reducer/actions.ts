import { CoordsType, MarkersType, Place } from "../types/types";
import { findWaypoints } from "../utils/findWaypoints";

export const updateMarkers = (
  id?: string,
  markers?: MarkersType[],
  coords?: { lng: number; lat: number; end?: boolean; start?: boolean }
) => {
  if (markers) {
    const existMarker = markers.find((data) => data.id === id);
    if (existMarker) {
      return markers;
    }
    const marker: MarkersType = {
      coords: [coords!.lng, coords!.lat],
      id: id!,
      start: coords?.start,
      end: coords?.end,
    };
    if (coords?.start) {
      const start = markers.find((data) => data.start === true);
      if (!start) {
        return [marker, ...markers];
      } else {
        markers[0] = marker;
        return markers;
      }
    } else if (coords!.end) {
      const end = markers.find((data) => data.end === true);
      if (end) {
        markers[markers.length - 1] = marker;
        return markers;
      } else if (markers.length >= 2) {
        markers[markers.length - 1] = marker;
        return markers;
      }
      return [...markers, marker];
    }
    const lastMarker = markers[markers.length - 1];
    markers[markers.length - 1] = marker;
    markers.push(lastMarker);
    return markers;
  } else {
    const marker: MarkersType = {
      coords: [coords!.lng, coords!.lat],
      id: id!,
      start: coords?.start,
      end: coords?.end,
    };
    return [marker];
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

  if (indexToDelete !== -1) {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    return updatedMarkers;
  }
  return markers;
};
export const deletePlace = (places: Place[], id: string) => {
  const indexToDelete = places.findIndex((place) => place.id === id);
  if (indexToDelete !== -1) {
    const updatedPlaces = places.filter((place) => place.id !== id);
    return updatedPlaces;
  } else {
    return places;
  }
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

export const setPlaces = (places?: Place[], place?: Place) => {
  if (!places) {
    throw new Error("Places not found");
  }
  if (!place) {
    throw new Error("Place not found");
  }

  const existPlace = places.find((nplace) => {
    return nplace.id === place.id;
  });
  if (existPlace) {
    return places;
  }
  if (place.instance) {
    const lastPlace = places[places.length - 1];
    places[places.length - 1] = place;
    places.push(lastPlace);
    return places;
  }
  if (place?.start) {
    places[0] = place;
    return places;
  } else if (place?.end) {
    places[places.length - 1] = place;
    return places;
  } else {
    const instancePlace = places[places.length - 2];
    if (instancePlace.instance) {
      places[places.length - 2] = place;
      return places;
    }
    const lastPlace = places[places.length - 1];
    places[places.length - 1] = place;
    places.push(lastPlace);
    return places;
  }
};

export const updatePlaces = (
  place_id?: string | undefined,
  newPlace?: Place | undefined,
  places?: Place[] | undefined
) => {
  if (!places && !place_id && !newPlace) {
    throw new Error("Places not found");
  }

  if (!places) {
    return places;
  }

  const updatedPlaces = places.map((data) => {
    if (data.id === place_id) {
      return newPlace!;
    }
    return data;
  });

  return updatedPlaces;
};
