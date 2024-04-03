import { Layer, SymbolLayer } from "react-map-gl";

const layerRouteArrowStyle: SymbolLayer = {
  id: "routearrows",
  type: "symbol",
  layout: {
    "symbol-placement": "line",
    "text-field": "▶",
    "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
    "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 12, 30, 22, 160],
    "text-keep-upright": false,
  },
  paint: {
    "text-color": "#3887be",
    "text-halo-color": "hsl(55, 11%, 96%)",
    "text-halo-width": 3,
  },
};

const RouteArrowsLayer = () => {
  return <Layer {...layerRouteArrowStyle} />;
};

export default RouteArrowsLayer;
