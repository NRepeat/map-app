import { MarkersType, Place, PlaceToUpdateType } from "../types/types";
import { handelGeocode } from "./google";

export type UpdatePlacePropsType = {
  placeToUpdate: PlaceToUpdateType | undefined;
  dispatch: any;
  setMark: any;
  markers: MarkersType[] | undefined;
};
export const updatePlace = async ({
  placeToUpdate,
  dispatch,
  setMark,
  markers,
}: UpdatePlacePropsType) => {
  console.log("🚀 ~  markers:", markers);
  console.log("🚀 ~   placeToUpdate:", placeToUpdate);
  if (!placeToUpdate) {
    throw new Error("Place to update not found");
  }
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
  if (placeToUpdate.place.instance) {
    // dispatch({
    //   type: "UPDATE_MARKER_ID",
    //   updateMarkerId: {
    //     id: placeToUpdate.marker?.id,
    //     newId: newPlaceData.results[0].place_id,
    //   },
    // });
    setMark(newPlace.id, {
      lat: newPlace.location.latitude,
      lng: newPlace.location.longitude,
    });
    // dispatch({ type: "UPDATE_PLACES", newPlace });
    dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true });
    return null;
  }
  if (placeToUpdate) {
    // dispatch({ type: "UPDATE_PLACES", newPlace });
    dispatch({
      type: "UPDATE_MARKER_ID",
      updateMarkerId: {
        id: placeToUpdate.marker?.id,
        newId: newPlaceData.results[0].place_id,
      },
    });
    if (placeToUpdate.place.id === "start-place") {
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
    // setMark(newPlace.id, {
    //   lat: newPlace.location.latitude,
    //   lng: newPlace.location.longitude,
    //   start: markers?.length,
    // });
    // if (!markers) {
    //   setMark(newPlace.id, {
    //     lat: newPlace.location.latitude,
    //     lng: newPlace.location.longitude,
    //     start: true,
    //   });
    // } else if (placeToUpdate.place.id === "end-place") {
    //   setMark(newPlace.id, {
    //     lat: newPlace.location.latitude,
    //     lng: newPlace.location.longitude,
    //     end: true,
    //   });
    // } else if (placeToUpdate.fromHandlePutMarkerOnClick) {
    //   setMark(newPlace.id, {
    //     lat: newPlace.location.latitude,
    //     lng: newPlace.location.longitude,
    //   });
    // }
    dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true });
    return null;
  }
};
