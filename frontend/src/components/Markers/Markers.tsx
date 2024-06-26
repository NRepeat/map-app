import { Badge } from "@nextui-org/react";
import { useCallback, type FC } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker, type MarkerDragEvent } from "react-map-gl";
import { handelGeocode } from "../../handlers/google";
import useMapContext from "../../hooks/useMapContext";
import { CoordsType, MarkersType, Place } from "../../types/types";

type MarkersProps = {
  markers: MarkersType[] | undefined;
  setIsMarkerDrug: React.Dispatch<React.SetStateAction<boolean>>;
};
const Markers: FC<MarkersProps> = ({ markers, setIsMarkerDrug }) => {
  const { dispatch, state } = useMapContext();
  const handleGetBack = () => {
    dispatch({
      type: "SET_IS_OPEN_ROUTE_INSTRUCTION",
      isOpenRouteInstruction: false,
    });
    dispatch({ type: "SET_IS_SAVED_ROUTES", isSavedRouteOpen: false });
  };
  const onMarkerDragEnd = useCallback(
    async (event: MarkerDragEvent, index: number) => {
      setIsMarkerDrug(false);
      const endCords = event.lngLat;
      const endPoint = Object.keys(endCords).map(
        (coord) => (endCords as any)[coord]
      ) as CoordsType;

      dispatch({
        type: "UPDATE_MARKERS_CORDS",
        markerEndPoint: endPoint,
        markerIndex: index,
      });
      const newPlaceData = await handelGeocode([endPoint[1], endPoint[0]]);

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

      if (state.places) {
        dispatch({
          type: "SET_PLACE_TO_UPDATE",
          placeToUpdate: {
            place: state.places[index],
            newCoords: [endPoint[1], endPoint[0]],
            marker: markers![index],
          },
        });
        dispatch({ type: "UPDATE_PLACES", newPlace: newPlace });
      }
      dispatch({ type: "SET_IS_LOAD_FROM_DB", isLoadFromDB: false });
      handleGetBack();
    },
    [markers, state.markers]
  );

  return (
    <>
      {markers &&
        markers.map((marker, i) => {
          const isFirstMarker = marker.start;
          const isLastMarker = marker.end;
          const markerColor = isFirstMarker
            ? "fill-green-700"
            : isLastMarker
              ? "fill-red-600"
              : "fill-blue-600";
          const markerIcon = isFirstMarker ? (
            <FaMapMarkerAlt
              className={` sm:min-w-9  sm:min-h-9 min-h-6 min-w-6 ${markerColor}`}
            />
          ) : (
            <Badge content={`${i}`} color="secondary">
              <FaMapMarkerAlt
                className={` sm:min-w-9  sm:min-h-9 min-h-6 min-w-6 ${markerColor}`}
              />
            </Badge>
          );
          return (
            <Marker
              key={marker.id}
              anchor="bottom"
              draggable
              longitude={marker.coords[0]}
              latitude={marker.coords[1]}
              onDragStart={() => setIsMarkerDrug(true)}
              onDragEnd={(e) => onMarkerDragEnd(e, i)}
            >
              {isFirstMarker || isLastMarker ? (
                markerIcon
              ) : (
                <Badge className="" content={`${i}`} color="secondary">
                  {markerIcon}
                </Badge>
              )}
            </Marker>
          );
        })}
    </>
  );
};

export default Markers;
