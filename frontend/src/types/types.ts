export type MapProviderProps = {
  children: React.ReactNode;
};

export type CoordsType = [number, number];
export type MarkersType = {
  coords: CoordsType;
  id: string;
  color?: string;
  start?: boolean;
  end?: boolean;
};
export type LatLng = {
  lat: number;
  lng: number;
  start?: boolean;
  end?: boolean;
};
export type PlaceToUpdateType = {
  place: Place;
  newCoords: CoordsType;
  fromHandlePutMarkerOnClick?: boolean;
};
export type RouteType = {
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
};

export type InstructionTypes = [
  "Left",
  "Right",
  "Sharp left",
  "Sharp right",
  "Slight left",
  "Slight right",
  "Straight",
  "Enter roundabout",
  "Exit roundabout",
  "U-turn",
  "Goal",
  "Depart",
  "Keep left",
  "Keep right",
];

export type RouteInstruction = {
  id: string;
  steps: Instruction[];
  waypoints: CoordsType[];
  waypointCoords: CoordsType[];
  totalDistance: { distance: number; duration: number };
};
export type Instruction = {
  name: string;
  distance: string;
  instruction: string;
  duration: number;
  way_points: CoordsType;
  type: number;
};
export type MapStateContextType = {
  coords?: CoordsType;
  markers?: MarkersType[];
  mapCenter?: LatLng;
  marker?: MarkersType;
  mapLoading?: boolean;
  isToUpdate?: boolean;
  routeInstructions?: RouteInstruction[];
  placeToUpdate?: PlaceToUpdateType;
  user?: User;
  placeInstance?: Place;
  places?: Place[];
  autocomplete?: {};
  newPlace?: Place;
  isLoadFromDB?: boolean;
  route?: RouteType[];
  selectedRoute?: RouteType;
  selectedRouteId?: string;
  selectedWaypoint?: { coords: CoordsType; instruction: Instruction };
  loading?: boolean;
};
export interface MapReducerType extends MapStateContextType {
  type: ActionType;
  markerIndex?: number;
  markerEndPoint?: CoordsType;
  markerId?: string;
}

export type ActionType =
  | "UPDATE_MARKERS_CORDS"
  | "SET_MARKER"
  | "SET_MARKERS"
  | "DELETE_MARKER"
  | "SET_OPEN_ROUTE_ROUTE"
  | "SET_MAP_LOADING"
  | "SET_ROUTE_INSTRUCTIONS"
  | "SET_ROUTE_WAYPOINTS_COORDS"
  | "SET_PLACE"
  | "SET_PLACES"
  | "SET_USER"
  | "SET_PLACE_INSTANCE"
  | "SET_PLACE_TO_UPDATE"
  | "UPDATE_PLACES"
  | "DELETE_PLACE"
  | "SET_IS_TO_UPDATE"
  | "CLEAR_ROUTE_PLACE_DATA"
  | "SET_IS_LOAD_FROM_DB"
  | "SET_SELECTED_ROUTE"
  | "SET_SELECTED_ROUTE_ID"
  | "SET_SELECTED_WAYPOINT"
  | "SET_LOADING";

export type MapContextType = {
  state: MapStateContextType;
  dispatch: React.Dispatch<MapReducerType>;
};

export type Place = {
  id: string;
  location: { latitude: number; longitude: number };
  displayName: { text: string };
  start?: boolean;
  end?: boolean;
  instance?: boolean;
};

export type User = {
  email?: string;
  password?: string;
  access_token?: string;
  name?: string;
  avatar?: string;
};

export type PlacePrediction = {
  place: string;
  placeId: string;
  text: string;
};
