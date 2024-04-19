import { Modal, ModalContent, Spinner } from "@nextui-org/react";
import MapInstance from "./components/Map/Map";
import useMapContext from "./hooks/useMapContext";
import "./styles/IdeClone.css";
import "./styles/SampleSplitter.css";
export function App() {
  const { state } = useMapContext()
  // const [optimizedCoords, setOptimizedCoords] = useState([]);

  // const getRoute = async () => {
  // const responseOpenRoute = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', { headers, method: "POST", body: jsonCoords })
  // const responseMAPBOX = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${dataCoords}?alternatives=true&steps=true&geometries=geojson&access_token=${accessToken}`,)
  // const responseOSRM = await fetch(`http://router.project-osrm.org/route/v1/driving/${dataCoords}?steps=true&alternatives=true&geometries=geojson`)
  // const data = await responseOpenRoute.json()
  // const coordsOpenRouteData = data.features[0].geometry.coordinates
  // const coords = data.routes[0].geometry.coordinates
  // console.log("🚀 ~ getRoute ~ coords:", ...coords)
  // setCoords(coordsOpenRouteData)
  // };

  // const optimizedGeojson: FeatureCollection = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       properties: [],
  //       type: "Feature",
  //       geometry: { type: "LineString", coordinates: [...optimizedCoords] },
  //     },
  //   ],
  // };
  // const layerRouteArrowStyle: SymbolLayer = {
  //   id: "routearrows",
  //   type: "symbol",
  //   layout: {
  //     "symbol-placement": "line",
  //     "text-field": "▶",
  //     "text-size": ["interpolate", ["linear"], ["zoom"], 12, 24, 22, 60],
  //     "symbol-spacing": ["interpolate", ["linear"], ["zoom"], 12, 30, 22, 160],
  //     "text-keep-upright": false,
  //   },
  //   paint: {
  //     "text-color": "#3887be",
  //     "text-halo-color": "hsl(55, 11%, 96%)",
  //     "text-halo-width": 3,
  //   },
  // };
  // const layerStyle: LineLayer = {
  //   id: "roadLine",
  //   type: "line",
  //   layout: {
  //     "line-join": "round",
  //     "line-cap": "round",
  //   },
  //   paint: {
  //     "line-color": "black",
  //     "line-opacity": 0.8,
  //     "line-width": 4,
  //   },
  // };
  // const optimizedLayerStyle: LineLayer = {
  //   id: "optimizedRoadLine",
  //   type: "line",
  //   layout: {
  //     "line-join": "round",
  //     "line-cap": "round",
  //   },
  //   paint: {
  //     "line-color": "green",
  //     "line-opacity": 0.8,
  //     "line-width": 4,
  //   },
  // };

  // const handleGetOptimizationRoutes = async () => {
  // if (!markers) {
  //   throw new Error("Markers not found")
  // }
  // const job = markers.map((marker, i) => {
  //   return {
  //     id: i,
  //     location: marker.coords,
  //     skills: [1]
  //   }
  // })
  // const jobs = job
  // const vehicles = [{ id: 1, profile: "driving-car", start: markers[0].coords, end: markers[markers.length - 1].coords, capacity: [1], skills: [1] }]
  // const bodyOPENROUTEOPT = JSON.stringify({ jobs, vehicles })
  // const responseOPENROUTEOPT = await fetch('https://api.openrouteservice.org/optimization', {
  //   headers,
  //   method: "POST",
  //   body: bodyOPENROUTEOPT
  // })
  // const optimizedRoutesData = await responseOPENROUTEOPT.json()
  // const optimizedRoutesCords = optimizedRoutesData.routes[0].steps.map((step: any) => step.location)
  // const optimizedRoutesCordsJSON = JSON.stringify({ coordinates: optimizedRoutesCords })
  // const optimizedRouteResponse = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', { headers, method: "POST", body: optimizedRoutesCordsJSON })
  // const optimizedRoute = await optimizedRouteResponse.json()
  // console.log("🚀 ~ handleGetOptimizationRoute ~ optimizedRoute:", optimizedRoute)
  // const coordsOpenRouteData = optimizedRoute.features[0].geometry.coordinates
  // setOptimizedCoords(coordsOpenRouteData)
  // const responseMAPBOXOPT = await fetch(
  //   `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?overview=full&steps=true&geometries=geojson&roundtrip=false&source=first&destination=last&access_token=${accessToken}`,
  //   { method: 'GET' }
  // );
  // const data = await response.json() as { code: string, trips: [{ geometry: { coordinates: [] } }], waypoints: [] }
  // const coordsopt = data.trips[0].geometry.coordinates
  // setOptimizedCoords(coordsopt)
  // };
  // if (!state.mapLoading) {
  //   return <>
  //     <Modal backdrop={"blur"} isOpen={!state.mapLoading} >
  //       <ModalContent>
  //         <Spinner size="lg" />
  //       </ModalContent>
  //     </Modal>
  //   </>
  // }

  return (<>
    <Modal backdrop={"blur"} className="max-w-[200px] pt-4" isOpen={!state.mapLoading} hideCloseButton >
      <ModalContent>
        <Spinner label="Loading map..." size="lg" />
      </ModalContent>
    </Modal>
    {<MapInstance />}

  </>);
}
