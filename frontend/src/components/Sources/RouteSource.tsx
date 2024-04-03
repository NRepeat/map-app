import { FeatureCollection } from "geojson";
import { FC } from "react";
import { Layer, LineLayer, Source } from "react-map-gl";
import { CoordsType } from "../../types/types";

export interface SourceDataType {
  coords: CoordsType[] | undefined;
  id: string;
}

interface RouteSourceProps extends SourceDataType {}

const RouteSource: FC<RouteSourceProps> = ({ coords, id }) => {
  if (coords) {
    const geojson: FeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          properties: [],
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [...coords],
          },
        },
      ],
    };
    const layerStyle: LineLayer = {
      id: `roadLine-${id}`, // Use unique id for each layer
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
    return (
      <Source id={id} type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    );
  }
  return null; // Return null if coords is undefined
};

export default RouteSource;
