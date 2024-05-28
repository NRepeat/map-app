import { type FeatureCollection } from "geojson";
import { type FC } from "react";
import { Source } from "react-map-gl";
import OptimizedRouteLayer from "../Layers/OptimizedRouteLayer/OptimizedRouteLayer";
import { SourceDataType } from "./RouteSource";

interface OptimizedRouteSourceProps extends SourceDataType {}

const OptimizedRouteSource: FC<OptimizedRouteSourceProps> = ({ coords }) => {
  const optimizedGeojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        properties: [],
        type: "Feature",
        geometry: { type: "LineString", coordinates: [...coords!] },
      },
    ],
  };

  return (
    <Source id="optimizedRouteSource" type="geojson" data={optimizedGeojson}>
      <OptimizedRouteLayer />
    </Source>
  );
};

export default OptimizedRouteSource;
