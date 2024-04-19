import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useMap } from 'react-map-gl';
import useMapContext from '../../../hooks/useMapContext';
import { findWaypoint } from '../../../utils/findWaypoints';
import FilterDistance from '../../FilterDistance/FilterDistance';

const RouteInstructionCard = ({ step }: { step: any }) => {

	const { current: map } = useMap();
	const { state } = useMapContext()


	const handleFocusOnTargetWaypoint = () => {
		if (!map) {
			throw new Error("Map not found")
		}
		const waypoint = findWaypoint(state.route![0].coordinates, step.way_points)
		map.flyTo({
			center: waypoint,
			animate: true,
			around: waypoint,
			duration: 1000,
			essential: true,
			zoom: 16
		});
	}
	return (
		<div onClick={handleFocusOnTargetWaypoint} className=" p-1 border-2 rounded-lg  border-[#0f895c] hover:bg-[#0f895c] hover:animate-pulse">
			<CardHeader className="flex gap-3">
				<div className="flex flex-col">
					<strong><p> {step.instruction}</p> </strong>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<strong>
					<p>Distance</p>
				</strong>
				<FilterDistance distance={step.distance} />
			</CardBody>
		</div>
	)
}

export default RouteInstructionCard

