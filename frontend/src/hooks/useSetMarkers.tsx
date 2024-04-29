import { useMap } from "react-map-gl";
import { LatLng } from "../types/types";
import useMapContext from "./useMapContext";

const useSetMarkers = () => {
  const { dispatch } = useMapContext();
  const map = useMap();
  const handleSetMark = (coords?: LatLng) => {
    if (!map.default) {
      throw new Error("Map not found");
    }
    const { lat, lng } = map.default.getCenter()

    // if (!coords) {
    //   return dispatch({
    //     type: "SET_MARKERS",
    //     mapCenter: { lat, lng },
    //   });
    // }

    return dispatch({
      type: "SET_MARKERS",
      mapCenter: coords,
    });

  };
  return { setMark: handleSetMark };
};

export default useSetMarkers;
