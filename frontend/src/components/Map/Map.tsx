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
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      >
        {/* <OptimizedRouteSource /> */}
        {/* <HillshadeSource /> */}
        {state.route &&
          state.route.length > 0 &&
          state.route.map((route, i) => (
            <RouteSource
              index={i}
              key={route.id}
              coords={route.coordinates}
              id={route.id}
            />
          ))}

        <Markers markers={state.markers} />
        <GeolocateControl />
        <NavigationControl />
      </Map>
      <ControlPanel />
    </div>
  );
};

export default MapInstance;
