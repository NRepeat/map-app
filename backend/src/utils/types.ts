export type UserDetails = {
  email: string;
  displayName?: string;
  password?: string;
};
export type UnitsType = "m" | "km" | "mi";
export type RouteOptions = {
  continue_straight?: boolean;
  language?: { en: boolean; ru: boolean };
  avoid_features?: string[];
  preference?: string[];
  units?: UnitsType;
  maximum_speed?: number;
};

export type PropertiesType = {
  summary: { distance: number; duration: number };
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
export type CoordsType = [number, number];
export type RouteSaveType = {
  coordinates: string;
  properties: string;
  userEmail: string;
  id: string;
  name: string;
  options: string;
  optimized: boolean;
  places: string;
};
