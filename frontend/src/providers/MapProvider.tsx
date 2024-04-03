import { createContext, FC } from "react";
import { useImmerReducer } from "use-immer";
import { reducer } from "../reducer/mapReducer";
import { MapContextType, MapProviderProps } from "../types/types";

const initialState: MapContextType = {
  state: {
    coords: [0, 0],
    markers: undefined,
    mapCenter: undefined,
  },
  dispatch: () => {},
};

export const MapContext = createContext<MapContextType>(initialState);

const MapProvider: FC<MapProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState.state);

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
