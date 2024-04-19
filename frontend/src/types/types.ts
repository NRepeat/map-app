export type MapProviderProps = {
  children: React.ReactNode;
};

export type CoordsType = [number, number];
export type MarkersType = {
  coords: CoordsType;
  id: string;
  color?: string;
};
export type MapStateContextType = {
  coords?: CoordsType;
  markers?: MarkersType[];
  mapCenter?: mapboxgl.LngLat;
  marker?: MarkersType;
  mapLoading?: boolean;
  routeInstructions?: {
    steps: [];
    totalDistance: { distance: number; duration: number };
  };
  route?: { coordinates: CoordsType[]; properties: {}; id: string }[];
};
export interface MapReducerType extends MapStateContextType {
  type: ActionType;
  markerIndex?: number;
  markerEndPoint?: CoordsType;
  markerId?: string;
}

export type ActionType =
  | "UPDATE_MARKERS_CORDS"
  | "SET_MARKERS"
  | "DELETE_MARKER"
  | "SET_OPEN_ROUTE_ROUTE"
  | "SET_MAP_LOADING"
  | "SET_ROUTE_INSTRUCTIONS";

export type MapContextType = {
  state: MapStateContextType;
  dispatch: React.Dispatch<MapReducerType>;
};
