import { FeatureCollection } from "geojson";
import { FC, useEffect, useState } from "react";
import { Layer, LineLayer, Source, SymbolLayer } from "react-map-gl";
import { CoordsType } from "../../types/types";

export interface SourceDataType {
  coords: CoordsType[] | undefined;
  id: string;
  index: number
}

interface RouteSourceProps extends SourceDataType { }

const getRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const RouteSource: FC<RouteSourceProps> = ({ coords, id, index }) => {
  const [lineColor, setLineColor] = useState<string>(
    index === 0 ? "#0000FF" : getRandomColor()
  );

  useEffect(() => {
    if (index !== 0) {
      setLineColor(getRandomColor());
    }
  }, [id]);

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
    const layerRouteArrowStyle: SymbolLayer = {
      id: `routearrows-${id}`,
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
    const layerStyle: LineLayer = {
      id: `roadLine-${id}`,
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": lineColor,
        "line-opacity": 0.8,
        "line-width": 4,
      },
    };

    return (
      <Source id={id} type="geojson" data={geojson}>
        <Layer {...layerStyle} />
        <Layer {...layerRouteArrowStyle} />
      </Source>
    );
  }
  return null;
};

export default RouteSource;
