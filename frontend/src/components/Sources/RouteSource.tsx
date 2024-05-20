import { FeatureCollection } from "geojson";
import { FC, useEffect, useState } from "react";
import { Layer, LineLayer, Source, SymbolLayer } from "react-map-gl";
import useMapContext from "../../hooks/useMapContext";
import { CoordsType } from "../../types/types";
import WaypointSource from "./WaypointSource";

export interface SourceDataType {
  coords: CoordsType[] | undefined;
  id: string;
  index: number
}

interface RouteSourceProps extends SourceDataType {
  setSelectedRouteIds: React.Dispatch<React.SetStateAction<string[]>>
  hoverInfo: string | undefined
  waypoints: CoordsType[]
  setWaypointsIds: React.Dispatch<React.SetStateAction<string[]>>
}

const getRandomColor = (): string[] => {
  return ['#43fa00', '#43fa00', '#43fa00']
}

const RouteSource: FC<RouteSourceProps> = ({ coords, id, index, setSelectedRouteIds, hoverInfo, waypoints, setWaypointsIds }) => {
  const roadId = `roadLine-${id}`
  const { state } = useMapContext()
  const [lineColor, setLineColor] = useState<string>(
    index === 0 ? "#7fff7f" : getRandomColor()[index]
  );
  useEffect(() => {
    setSelectedRouteIds(prev => [...prev, roadId])

  }, [id]);


  if (coords) {
    const geojson: FeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          properties: { id: roadId },
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [...coords],
          },
        },
      ],
    };
    const layerRouteArrowStyle: SymbolLayer = {
      id: `routeArrows-${id}`,
      type: "symbol",
      source: id,
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
        "line-color-transition": { delay: 1, duration: 3 },
        "line-color": lineColor,
        "line-opacity": hoverInfo === roadId || state.selectedRouteId === id ? 1 : 0.2,
        "line-width": 10,
      },
    };
    // const highlightLayer: LineLayer = {
    //   id: `counties-highlighted-${id}`,
    //   type: 'line',
    //   layout: {
    //     "line-join": "round",
    //     "line-cap": "round",
    //   },
    //   paint: {
    //     "line-color-transition": { delay: 1, duration: 3 },
    //     'line-color': '#7fff7f',
    //     "line-opacity": hoverInfo === roadId || index === 0 ? 1 : 0.1,
    //     "line-width": 10,
    //   }
    // };
    // const filter = ['==', "id", hoverInfo || ""]


    return (
      <>
        <Source id={id} type="geojson" data={geojson} >
          <Layer    {...layerStyle} />
          {state.selectedRoute?.id === id &&
            <>
              <Layer {...layerRouteArrowStyle} />
              <WaypointSource waypoints={waypoints} id={id} setWaypointsIds={setWaypointsIds} />
            </>

          }

          {/* <Layer {...highlightLayer} /> */}
        </Source>

      </>

    );
  }
  return null;
};

export default RouteSource;
