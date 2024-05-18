import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useMap } from 'react-map-gl';
import useMapContext from '../../../hooks/useMapContext';
import { CoordsType } from '../../../types/types';
import FilterDistance from '../../FilterDistance/FilterDistance';

const RouteInstructionCard = ({ step, waypointCoords, i }: { step: any, waypointCoords: CoordsType[], i: number }) => {

	const { current: map } = useMap();
	const { state, dispatch } = useMapContext()


	const handleFocusOnTargetWaypoint = () => {
		if (!map) {
			throw new Error("Map not found")
		}


		map.flyTo({
			center: waypointCoords[i],
			animate: true,
			around: waypointCoords[i],
			duration: 1000,
			essential: true,
			zoom: 16
		});
	}
	return (
		<div onClick={handleFocusOnTargetWaypoint}
			onMouseLeave={() => dispatch({ type: "SET_SELECTED_WAYPOINT", selectedWaypoint: undefined })}
			onMouseEnter={() => dispatch({ type: "SET_SELECTED_WAYPOINT", selectedWaypoint: { coords: waypointCoords[i], instruction: step } })} className=" p-1 border-2 rounded-lg  border-[#0f895c] hover:bg-[#0f895c] hover:animate-pulse">
			<CardHeader className="flex gap-3">
				<div className="flex flex-col">
					<strong><p className='text-xl'> {step.instruction}</p> </strong>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='inline-flex justify-between'>
					<strong>
						<p className='text-lg text-[#f7f7f7]'>Distance</p>
					</strong>
					<div className='text-xl text-[#efffe4]'>
						<FilterDistance distance={step.distance} />

					</div>
				</div>

			</CardBody>
		</div>
	)
}

export default RouteInstructionCard

