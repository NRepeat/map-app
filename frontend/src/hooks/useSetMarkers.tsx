import { useMap } from "react-map-gl";
import { LatLng } from "../types/types";
import useMapContext from "./useMapContext";

const useSetMarkers = () => {
  const { dispatch } = useMapContext();
  const map = useMap();
  const handleSetMark = (id: string, coords?: LatLng) => {
    console.log("🚀 ~ handleSetMark ~ coords:", coords)
    if (!map.default) {
      throw new Error("Map not found");
    }

    return dispatch({
      type: "SET_MARKERS",
      mapCenter: coords,
      markerId: id,
    });

  };
  return { setMark: handleSetMark };
};

export default useSetMarkers;
