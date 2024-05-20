import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, FC, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { healthCheck } from "../api/health-check";
import { reducer } from "../reducer/mapReducer";
import { MapContextType, MapProviderProps } from "../types/types";
const initialState: MapContextType = {
  state: {
    coords: [0, 0],
    markers: undefined,
    mapCenter: undefined,
    places: [{ displayName: { text: "Start" }, id: 'start-place', location: { latitude: 0, longitude: 0 } }, { displayName: { text: "Stop" }, id: 'end-place', location: { latitude: 0, longitude: 0 } }]
  },
  dispatch: () => { },
};

export const MapContext = createContext<MapContextType>(initialState);
const MapProvider: FC<MapProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState.state);
  useEffect(() => {
    const fetchData = async () => {
      const data = await healthCheck();
      dispatch({ type: "SET_MAP_LOADING", mapLoading: data === "bad" ? false : true })
    };
    const interval = setInterval(() => {
      if (!state.mapLoading) {
        fetchData();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state.mapLoading]);

  useEffect(() => {
    const user = Cookies.get("access_token");
    if (user) {
      const parsedUser = jwtDecode(user) as any

      dispatch({ type: "SET_USER", user: { email: parsedUser.email, name: parsedUser.name, avatar: parsedUser.avatar ? parsedUser.avatar : '' } })
    }
  }, [])
  if (!state) {
    throw new Error("State not found");
  }
  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
