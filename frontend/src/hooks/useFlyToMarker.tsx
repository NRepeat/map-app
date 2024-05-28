import { useMap } from "react-map-gl";
import { CoordsType } from "../types/types";

const useFlyToMarker = () => {
  const { current: map } = useMap();

  const handleFocusOnMarker = (marker: CoordsType | null) => {
    if (!map) {
      throw new Error("Map not found");
    }
    if (marker) {
      map.flyTo({
        center: marker,
        animate: true,
        around: marker,
        duration: 1200,
        essential: true,
        zoom: 16,
      });
    }
  };

  return { handleFocusOnMarker };
};

export default useFlyToMarker;
