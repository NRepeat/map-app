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
export type MapStateContextType = {
  coords?: CoordsType;
  markers?: MarkersType[];
  mapCenter?: LatLng;
  marker?: MarkersType;
  mapLoading?: boolean;
  isToUpdate?: boolean;
  routeInstructions?: {
    steps: [];
    waypoints: [number, number][];
    totalDistance: { distance: number; duration: number };
  };
  placeToUpdate?: PlaceToUpdateType;
  user?: User;
  placeInstance?: Place;
  places?: Place[];
  autocomplete?: {};
  newPlace?: Place;
  isLoadFromDB?: boolean;
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
  | "SET_IS_LOAD_FROM_DB";

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
