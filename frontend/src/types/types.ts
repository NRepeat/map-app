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
    waypoints: [number, number][];
    totalDistance: { distance: number; duration: number };
  };
  autocomplete?: {};
  waypointsCoords?: [number, number][];
  route?: {
    coordinates: CoordsType[];
    properties: {
      segments: {
        distance: number;
        duration: number;
        steps: {
          distance: number;
          duration: number;
          type: number;
          instruction: string;
          name: string;
          way_points: [number, number];
        }[];
      }[];
    };
    id: string;
  }[];
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
  | "SET_ROUTE_INSTRUCTIONS"
  | "SET_ROUTE_WAYPOINTS_COORDS";

export type MapContextType = {
  state: MapStateContextType;
  dispatch: React.Dispatch<MapReducerType>;
};
