import { Button } from '@nextui-org/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import AutocompletePlaceInput from '../../AutocompletePlaceInput /AutocompletePlaceInput';
const CordList = () => {

	const { handleDeleteMark } = useDeleteMarker();
	const { state, dispatch } = useMapContext();


	const startIcon = <FaMapMarkerAlt className="fill-green-700 sm:min-w-3 sm:min-h-3  min-h-2 min-w-2 " />
	const endIcon = <FaMapMarkerAlt className="fill-red-600 sm:min-w-3 sm:min-h-3  min-h-3 min-w-3 " />



	const handleClick = () => {
		dispatch({ type: "SET_PLACE_INSTANCE", placeInstance: { displayName: { text: "" }, id: '0', location: { latitude: 0, longitude: 0 }, instance: true } })
	}

	const handleDelete = (markerId: string) => {
		handleDeleteMark(markerId)
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
					return (<div key={data.id} className='inline-flex gap-2'>
						<AutocompletePlaceInput startContent={startContent} place={data} start={isStart} end={isEnd} />
						{!isStart && !isEnd && <Button onClick={() => handleDelete(data.id)} isIconOnly variant='light'>
							<FaDeleteLeft className='fill-red-500 min-h-6 min-w-6' />
						</Button>}
					</div>)
				}
			})}

		</div>
	)
}

export default CordList