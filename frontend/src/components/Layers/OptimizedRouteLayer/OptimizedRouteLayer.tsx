import { LineLayer } from "mapbox-gl";
import { Layer } from "react-map-gl";

const OptimizedRouteLayer = () => {
  const optimizedLayerStyle: LineLayer = {
    id: "optimizedRoadLine",
    type: "line",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "green",
      "line-opacity": 0.8,
      "line-width": 4,
    },
  };
  return <Layer {...optimizedLayerStyle} />;
};

export default OptimizedRouteLayer;
