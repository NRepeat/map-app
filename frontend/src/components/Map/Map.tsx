import { useEffect } from "react";
import Map, { FullscreenControl, GeolocateControl, NavigationControl } from "react-map-gl";
import { OpenRoute } from "../../handlers/openRoute";
import useMapContext from "../../hooks/useMapContext";
import ControlPanel from "../ControlePanel/ControlePanel";
import Markers from "../Markers/Markers";
import RouteSource from "../Sources/RouteSource";
import WaypointSource from "../Sources/WaypointSource";
const MapInstance = () => {
  const { state, dispatch } = useMapContext();

  const openRoute = new OpenRoute(dispatch);
  const handlePutMarkerOnClick = (e: mapboxgl.MapLayerMouseEvent) => {

    if (e.type === "click") {
      if (state.places) {
        const start = state.places[0].id === "start-place" && state.places[0]
        const end = state.places[1].id === "end-place" && state.places[1]

        if (start) {
          dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true })
          return dispatch({ type: "SET_PLACE_TO_UPDATE", placeToUpdate: { place: start, newCoords: [e.lngLat.lat, e.lngLat.lng], fromHandlePutMarkerOnClick: true } })
        } else if (end) {
          dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true })
          return dispatch({ type: "SET_PLACE_TO_UPDATE", placeToUpdate: { place: end, newCoords: [e.lngLat.lat, e.lngLat.lng], fromHandlePutMarkerOnClick: true } })
        } else {
          dispatch({ type: "SET_PLACE_INSTANCE", placeInstance: { displayName: { text: "" }, id: 'instance-place', location: { latitude: 0, longitude: 0 }, instance: true } })
          dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: true })
          return dispatch({ type: "SET_PLACE_TO_UPDATE", placeToUpdate: { place: { displayName: { text: "" }, id: 'instance-place', location: { latitude: 0, longitude: 0 }, instance: true }, newCoords: [e.lngLat.lat, e.lngLat.lng], fromHandlePutMarkerOnClick: true } })
        }
      }
    }
  }

  useEffect(() => {
    if (state.markers && state.markers.length >= 2) {
      openRoute.getOptimizationRoute(state.markers)
    }
  }, [state.markers])
  return (
    <div className="w-screen h-screen">
      <Map
        onClick={(e) => handlePutMarkerOnClick(e)}
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
        <WaypointSource />
        <Markers markers={state.markers} />
        <GeolocateControl />
        <NavigationControl />
        <ControlPanel />
        <FullscreenControl />
      </Map>
    </div>
  );
};

export default MapInstance;
