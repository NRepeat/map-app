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
