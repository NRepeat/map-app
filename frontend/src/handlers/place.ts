import { MarkersType, Place, PlaceToUpdateType } from "../types/types";
import { handelGeocode } from "./google";

export type UpdatePlacePropsType = {
  placeToUpdate: PlaceToUpdateType | undefined;
  dispatch: any;
  setMark: any;
  markers: MarkersType[] | undefined;
  setLoading: any;
};
export const updatePlace = async ({
  placeToUpdate,
  dispatch,
  setMark,
  markers,
  setLoading,
}: UpdatePlacePropsType) => {
  if (!placeToUpdate) {
    throw new Error("Place to update not found");
  }
  if (placeToUpdate.place.instance) {
    const newPlaceData = await handelGeocode(placeToUpdate.newCoords);
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
    dispatch({ type: "UPDATE_PLACES", newPlace });
    setMark(newPlace.id, {
      lat: newPlace.location.latitude,
      lng: newPlace.location.longitude,
    });
    dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: false });
    return null;
  }
  if (placeToUpdate) {
    setLoading(true);
    const newPlaceData = await handelGeocode(placeToUpdate.newCoords);
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
    dispatch({ type: "UPDATE_PLACES", newPlace });
    if (!markers) {
      setMark(newPlace.id, {
        lat: newPlace.location.latitude,
        lng: newPlace.location.longitude,
        start: true,
      });
    } else if (placeToUpdate.place.id === "end-place") {
      setMark(newPlace.id, {
        lat: newPlace.location.latitude,
        lng: newPlace.location.longitude,
        end: true,
      });
    } else if (placeToUpdate.fromHandlePutMarkerOnClick) {
      setMark(newPlace.id, {
        lat: newPlace.location.latitude,
        lng: newPlace.location.longitude,
      });
    }
    setLoading(false);
    dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: false });
    return null;
  }
};
