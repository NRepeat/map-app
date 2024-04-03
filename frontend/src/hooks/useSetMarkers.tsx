import { useMap } from "react-map-gl";
import useMapContext from "./useMapContext";

const useSetMarkers = () => {
  const { dispatch } = useMapContext();
  const map = useMap();
  const handleSetMark = () => {
    if (!map.default) {
      throw new Error("Map not found");
    }
    return dispatch({
      type: "SET_MARKERS",
      mapCenter: map.default.getCenter(),
    });
  };
  return { setMark: handleSetMark };
};

export default useSetMarkers;
