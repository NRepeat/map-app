import Map, { GeolocateControl, NavigationControl } from "react-map-gl";
import useMapContext from "../../hooks/useMapContext";
import ControlPanel from "../ControlePanel/ControlePanel";
import Markers from "../Markers/Markers";
import RouteSource from "../Sources/RouteSource";
const MapInstance = () => {
  const { state } = useMapContext();

  return (
    <div className="w-screen h-screen">
      <Map
        mapboxAccessToken={import.meta.env.VITE_ACCESS_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: import.meta.env.LONGITUDE || 35.11697906675258,
          latitude: import.meta.env.LATITUDE || 47.84785262713706,
          zoom: import.meta.env.ZOOM || 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {/* <OptimizedRouteSource /> */}
        {state.route &&
          state.route.length > 0 &&
          state.route.map((route) => (
            <RouteSource
              key={route.id}
              coords={route.coordinates}
              id={route.id}
            />
          ))}
        {state.route && (
          <RouteSource
            key={state.route[0].id}
            coords={state.route[0].coordinates}
            id={state.route[0].id}
          />
        )}
        <Markers markers={state.markers} />
        <GeolocateControl />
        <NavigationControl />
      </Map>
      <ControlPanel markers={state.markers} />
    </div>
  );
};

export default MapInstance;
