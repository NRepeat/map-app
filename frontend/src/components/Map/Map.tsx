import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import { OpenRoute } from "../../handlers/openRoute";
import useMapContext from "../../hooks/useMapContext";
import { CoordsType, RouteInstruction, RouteType } from '../../types/types';
import { findWaypointByCoords } from '../../utils/findWaypoints';
import ControlPanel from "../ControlePanel/ControlePanel";
import Markers from "../Markers/Markers";
import PopupCard from '../PopupCard/PopupCard';
import RouteSource from '../Sources/RouteSource';
import { handlePutMarkerOnClick } from './handlers';

const MapInstance = () => {
  const { state, dispatch } = useMapContext();
  console.log("🚀 ~ MapInstance ~ state:", state)
  const openRoute = new OpenRoute(dispatch);
  const [hoverInfo, setHoverInfo] = useState<{ layerId: string, lat: number, lng: number } | null>();
  const [routeIds, setRouteIds] = useState<string[]>([]);
  const [waypointsIds, setWaypointsIds] = useState<string[]>([]);
  const [isMarkerDrug, setIsMarkerDrug] = useState<boolean>(false)
  const [routes, setRoutes] = useState<RouteType[]>()
  const [routeInstructions, setRouteInstructions] = useState<RouteInstruction[]>()
  const [isDoubleClick, setIsDoubleClick] = useState<boolean>(false)
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);


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
  }, [state]);

  useEffect(() => {
    if (hoverInfo && state.routeInstructions) {
      if (hoverInfo.layerId.includes("waypoint")) {
        const coords = [hoverInfo.lng, hoverInfo.lat] as CoordsType
        const ins = findWaypointByCoords(hoverInfo.layerId, coords, state.routeInstructions)
        if (ins) {
          dispatch({ type: "SET_SELECTED_WAYPOINT", selectedWaypoint: { coords, instruction: ins?.instruction } })
        } else {
          dispatch({ type: "SET_SELECTED_WAYPOINT", selectedWaypoint: undefined })
        }
      } else {
        dispatch({ type: "SET_SELECTED_WAYPOINT", selectedWaypoint: undefined })
      }
    }
  }, [hoverInfo, state.routeInstructions])

  useEffect(() => {

    if (state.markers && state.markers.length >= 2 && state.options && !state.isLoadFromDB && state.isToUpdate) {
      openRoute.getOpenRouteRoute(state.markers, state.options)
      dispatch({ type: "SET_LOADING", loading: true })
      dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: false });
      dispatch({ type: "SET_IS_LOAD_FROM_DB", isLoadFromDB: false })
    } else if (state.selectedRoute) {
      const routeInstructions = state.routeInstructions?.find(instruction => instruction.id === state.selectedRoute?.id)
      setRoutes([state.selectedRoute])
      if (routeInstructions) {
        setRouteInstructions([routeInstructions])
      }
    }
  }, [state.isToUpdate, state.selectedRoute])


  useEffect(() => {
    if (state.route && state.route.length >= 1) {
      dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: state.route[0].id })
      setRoutes(state.route)
      dispatch({ type: "SET_LOADING", loading: false })
    }
    else if (state.selectedRoute) {

      setRoutes([state.selectedRoute])
    }
    else {
      setRoutes([])
    }
    if (state.routeInstructions) {
      setRouteInstructions(state.routeInstructions)
    }
  }, [state.route, state.routeInstructions])
  const handleClick = useCallback((e: any) => {

    if (isDoubleClick) {
      setIsDoubleClick(false);
      return null;
    }
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    if (state.isSavedRouteOpen) {
      return null
    }
    setClickTimeout(setTimeout(() => {
      handlePutMarkerOnClick(e, state, dispatch, hoverInfo?.layerId);
      setClickTimeout(null);
    }, 300));
  }, [isDoubleClick, clickTimeout, state, dispatch, hoverInfo]);
  const handleDoubleClick = useCallback(() => {
    setIsDoubleClick(true);
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
  }, [clickTimeout]);

  return (
    <div className="w-screen h-screen">
      <Map
        onDblClick={handleDoubleClick}
        onClick={handleClick}
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
        {routes && routeInstructions &&
          routes.length > 0 &&
          routes.slice().reverse().map((route, i) => (
            <RouteSource
              setWaypointsIds={setWaypointsIds}
              hoverInfo={hoverInfo?.layerId}
              setSelectedRouteIds={setRouteIds}
              index={i}
              key={route.id}
              coords={route.coordinates}
              id={route.id}
              waypoints={routeInstructions.slice().reverse()[i].waypointCoords}
            />
          ))}
        {/* {hoverInfo && state.selectedRouteId && !hoverInfo.layerId.includes(state.selectedRouteId) && <Popup
          longitude={hoverInfo.lng}
          latitude={hoverInfo.lat}
          closeButton={false}
          offset={-2}
          className='text-black '
        >
          {hoverInfo.layerId}
        </Popup>} */}

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
