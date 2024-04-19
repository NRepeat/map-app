import { HillshadeLayer, Layer, RasterDemSource, Source } from "react-map-gl";

import { SourceDataType } from "./RouteSource";

interface HillshadeSource extends SourceDataType { }

const HillshadeSource = () => {
	const optimizedGeojson: RasterDemSource = {
		type: "raster-dem",
		url: "mapbox://mapbox.mapbox-terrain-dem-v1"

	};
	const optimizedLayerStyle: HillshadeLayer = {
		id: "raster-dem",
		type: "hillshade",
		source: optimizedGeojson
	};
	return (
		<Source id="optimizedRouteSource" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" >
			<Layer {...optimizedLayerStyle} />
		</Source>
	);
};

export default HillshadeSource;
