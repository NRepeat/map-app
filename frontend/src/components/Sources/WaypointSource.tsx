import { FeatureCollection } from "geojson";
import { useEffect } from "react";
import { CircleLayer, Layer, Source } from "react-map-gl";
import { CoordsType } from "../../types/types";
import { SourceDataType } from "./RouteSource";

interface WaypointSource extends SourceDataType { }

const WaypointSource = ({ waypoints, id, setWaypointsIds }: { waypoints: CoordsType[], id: string, setWaypointsIds: React.Dispatch<React.SetStateAction<string[]>> }) => {
	const roadId = `roadWaypoints-${id}`
	useEffect(() => {
		setWaypointsIds(prev => [...prev, roadId])

	}, [id]);

	const geojson: FeatureCollection = {
		type: "FeatureCollection",

		features: [
			{
				properties: { id: `waypoint-${id}` },
				type: "Feature",
				geometry: {
					type: "MultiPoint",
					coordinates: [...waypoints],
				},
			},
		],
	};
	const layerStyleWaypoint: CircleLayer = {
		id: `roadWaypoints-${id}`,
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
		<Source id={`waypoints-source-${id}`} type="geojson" data={geojson}  >
			<Layer   {...layerStyleWaypoint} />
		</Source>
	);

};

export default WaypointSource;
