import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from "react-map-gl";
import { OpenRoute } from "../../handlers/openRoute";
import useMapContext from "../../hooks/useMapContext";
import { CoordsType, RouteType } from '../../types/types';
import ControlPanel from "../ControlePanel/ControlePanel";
import Markers from "../Markers/Markers";
import PopupCard from '../PopupCard/PopupCard';
import RouteSource from '../Sources/RouteSource';
import { handlePutMarkerOnClick } from './handlers';

const MapInstance = () => {
  const { state, dispatch } = useMapContext();
  const openRoute = new OpenRoute(dispatch);

  const [hoverInfo, setHoverInfo] = useState<{ layerId: string, lat: number, lng: number } | null>();
  const [routeIds, setRouteIds] = useState<string[]>([]);
  const [waypointsIds, setWaypointsIds] = useState<string[]>([]);
  const [isMarkerDrug, setIsMarkerDrug] = useState<boolean>(false)
  const [route, setRoute] = useState<RouteType>()
  const [waypointCoords, setWaypointCoords] = useState<CoordsType>()

  const onHover = useCallback((e: mapboxgl.MapLayerMouseEvent) => {
    const segment = e.features && e.features[0];
    if (segment && segment.properties) {
      setHoverInfo({
        layerId: segment.properties.id, lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      });

    } else {
      setHoverInfo(null)
    }
  }, []);

  useEffect(() => {
    if (state.markers && state.markers.length >= 2) {
      openRoute.getOpenRouteRoute(state.markers)
    }
  }, [state.markers])
  useEffect(() => {
    if (state.route) {

      dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: state.route[0].id })
    }
  }, [state.route])

  return (
    <div className="w-screen h-screen">
      <Map

        onClick={(e) => handlePutMarkerOnClick(e, state, dispatch, hoverInfo?.layerId)}
        mapboxAccessToken={import.meta.env.VITE_ACCESS_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: import.meta.env.LONGITUDE || 35.11697906675258,
          latitude: import.meta.env.LATITUDE || 47.84785262713706,
          zoom: import.meta.env.ZOOM || 12,
        }}

        interactiveLayerIds={[...waypointsIds, ...routeIds]}
        onMouseMove={isMarkerDrug ? () => { } : (e) => onHover(e)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      >
        {state.selectedWaypoint && <Marker pitchAlignment='viewport' offset={[0, -60]} draggable={false} longitude={state.selectedWaypoint.coords[0]}
          latitude={state.selectedWaypoint.coords[1]}>
          <PopupCard instruction={state.selectedWaypoint.instruction} />
        </Marker>}
        {state.route &&
          state.route.length > 0 &&
          state.route.map((route, i) => (
            <RouteSource
              setWaypointsIds={setWaypointsIds}
              hoverInfo={hoverInfo?.layerId}
              setSelectedRouteIds={setRouteIds}
              index={i}
              key={route.id}
              coords={route.coordinates}
              id={route.id}
              waypoints={state.routeInstructions![i].waypointCoords}
            />
          ))}
        {hoverInfo?.layerId && <Popup
          longitude={hoverInfo.lng}
          latitude={hoverInfo.lat}
          closeButton={false}
          offset={-2}
          className='text-black '
        >
          {hoverInfo.layerId}
        </Popup>}

        <Markers markers={state.markers} setIsMarkerDrug={setIsMarkerDrug} />
        <GeolocateControl />
        <NavigationControl />
        <ControlPanel />
        <FullscreenControl />
      </Map>
    </div>
  );
};

export default MapInstance;
