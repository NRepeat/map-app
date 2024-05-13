export async function updatePlace() {
  if (state.placeToUpdate?.place.instance) {
    const newPlaceData = await handelGeocode(state.placeToUpdate.newCoords);
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
    return null;
  }
  if (state.placeToUpdate) {
    setLoading(true);
    const newPlaceData = await handelGeocode(state.placeToUpdate.newCoords);
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
    if (!state.markers) {
      setMark(newPlace.id, {
        lat: newPlace.location.latitude,
        lng: newPlace.location.longitude,
        start: true,
      });
    } else if (state.placeToUpdate.place.id === "end-place") {
      setMark(newPlace.id, {
        lat: newPlace.location.latitude,
        lng: newPlace.location.longitude,
        end: true,
      });
    } else if (state.placeToUpdate.fromHandlePutMarkerOnClick) {
      setMark(newPlace.id, {
        lat: newPlace.location.latitude,
        lng: newPlace.location.longitude,
      });
    }
    setLoading(false);
  }
}
