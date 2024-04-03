import { useContext } from "react";
import { MapContext } from "../providers/MapProvider";

const useMapContext = () => {
  const { state, dispatch } = useContext(MapContext);
  return { state, dispatch };
};

export default useMapContext;
