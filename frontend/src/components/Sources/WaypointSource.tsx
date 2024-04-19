import { FeatureCollection } from "geojson";
import { CircleLayer, Layer, Source } from "react-map-gl";
import useMapContext from "../../hooks/useMapContext";
import { SourceDataType } from "./RouteSource";

interface WaypointSource extends SourceDataType { }

const WaypointSource = () => {
	const { state } = useMapContext()
	if (state.route?.length, state.routeInstructions) {
		const geojson: FeatureCollection = {
			type: "FeatureCollection",
			features: [
				{
					properties: [],
					type: "Feature",
					geometry: {
						type: "MultiPoint",
						coordinates: state.waypointsCoords,
					},
				},
			],
		};
		const layerStyleWaypoint: CircleLayer = {
			id: `roadWaypoints`,
			type: "circle",
			source: {
				type: 'geojson',

			},
			paint: {
				'circle-radius': 10,
				'circle-color': '#3887be'
			}
		};
		return (
			<Source id="optimizedRouteSource" type="geojson" data={geojson}  >
				<Layer {...layerStyleWaypoint} />
			</Source>
		);
	}

};

export default WaypointSource;
