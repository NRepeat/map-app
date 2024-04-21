import { Badge } from "@nextui-org/react";
import { useCallback, type FC } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Marker, type MarkerDragEvent } from "react-map-gl";
import useMapContext from "../../hooks/useMapContext";
import { CoordsType, MarkersType } from "../../types/types";

type MarkersProps = {
  markers: MarkersType[] | undefined;
};
const Markers: FC<MarkersProps> = ({ markers }) => {
  const { dispatch } = useMapContext();

  const onMarkerDrag = useCallback(
    (event: MarkerDragEvent, index: number) => {
      const endCords = event.lngLat;
      const endPoint = Object.keys(endCords).map(
        (coord) => (endCords as any)[coord]
      ) as CoordsType;
      dispatch({
        type: "UPDATE_MARKERS_CORDS",
        markerEndPoint: endPoint,
        markerIndex: index,
      });
    },
    [markers]
  );

  return (
    <>
      {markers &&
        markers.map((marker, i) => {
          if (i === 0) {
            return (< Marker

              key={marker.id}
              anchor="bottom"
              draggable
              longitude={marker.coords[0]}
              latitude={marker.coords[1]}
              onDrag={(e) => onMarkerDrag(e, i)}
            >
              <FaMapMarkerAlt className="fill-green-700 sm:min-w-9 sm:min-h-9  min-h-6 min-w-6 " />

            </ Marker>)
          } else if (i >= markers.length - 1) {
            return (< Marker

              key={marker.id}
              anchor="bottom"
              draggable
              longitude={marker.coords[0]}
              latitude={marker.coords[1]}
              onDrag={(e) => onMarkerDrag(e, i)}
            >
              <FaMapMarkerAlt className="fill-red-600 sm:min-w-9 sm:min-h-9  min-h-6 min-w-6 " />
            </ Marker>)
          } else {
            return (
              <Marker
                color={marker.color ? marker.color : "#c21120"}
                key={marker.id}
                anchor="bottom"
                draggable
                longitude={marker.coords[0]}
                latitude={marker.coords[1]}
                onDrag={(e) => onMarkerDrag(e, i)}
              >
                <Badge content={`${i}`} color="secondary">
                  <FaMapMarkerAlt className="fill-blue-600 sm:min-w-8 sm:min-h-8  min-h-4 min-w-4 " />
                </Badge>
              </Marker>
            );
          }
        })}
    </>
  );
};

export default Markers;
