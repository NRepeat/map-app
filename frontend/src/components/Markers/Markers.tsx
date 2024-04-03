import { useCallback, type FC } from "react";
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
          return (
            <Marker
              color={marker.color ? marker.color : "#c21120"}
              key={marker.id}
              anchor="bottom"
              draggable
              longitude={marker.coords[0]}
              latitude={marker.coords[1]}
              onDrag={(e) => onMarkerDrag(e, i)}
            />
          );
        })}
    </>
  );
};

export default Markers;
