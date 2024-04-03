import { Layer, LineLayer } from "react-map-gl";

const layerStyle: LineLayer = {
  id: "roadLine",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "black",
    "line-opacity": 0.8,
    "line-width": 4,
  },
};

const RouteLayer = () => {
  return <Layer {...layerStyle} />;
};

export default RouteLayer;
