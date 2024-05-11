import { Button } from '@nextui-org/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import useSetMarkers from '../../../hooks/useSetMarkers';
import AutocompletePlaceInput from '../../AutocompletePlaceInput /AutocompletePlaceInput';
const CordList = () => {

	const { handleDeleteMark } = useDeleteMarker();
	const { state, dispatch } = useMapContext();


	const startIcon = <FaMapMarkerAlt className="fill-green-700 sm:min-w-3 sm:min-h-3  min-h-2 min-w-2 " />
	const endIcon = <FaMapMarkerAlt className="fill-red-600 sm:min-w-3 sm:min-h-3  min-h-3 min-w-3 " />



	const { setMark } = useSetMarkers()
	const handleClick = () => {
		dispatch({ type: "SET_PLACE_INSTANCE", placeInstance: { displayName: { text: "" }, id: '0', location: { latitude: 0, longitude: 0 }, instance: true } })
	}
	return (
		<div className="flex flex-col gap-[1rem] ">
			<Button onClick={() => handleClick()}>
				Test
			</Button>
			{state.places && state.places.map((data, i) => {
				if (state.places) {
					const isStart = i === 0;
					const isEnd = state.places.length >= 2 && i === state.places.length - 1;
					const startContent = isStart ? startIcon : isEnd ? endIcon : i !== 0 && i !== state.places.length - 1 && i;
					return <AutocompletePlaceInput startContent={startContent} key={data.id} place={data} start={isStart} end={isEnd} />;
				}
			})}

		</div>
	)
}

export default CordList