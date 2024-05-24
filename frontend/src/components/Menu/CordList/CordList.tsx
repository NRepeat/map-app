import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { updatePlace } from '../../../handlers/place';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import useSetMarkers from '../../../hooks/useSetMarkers';
import AutocompletePlaceInput from '../../AutocompletePlaceInput /AutocompletePlaceInput';
const CordList = () => {
	const { setMark } = useSetMarkers()
	const [loading, setLoading] = useState<boolean>(false)
	const { handleDeleteMark } = useDeleteMarker();
	const { state, dispatch } = useMapContext();
	console.log("🚀 ~ CordList ~ state:", state)
	const { markers, placeToUpdate } = state

	const startIcon = <FaMapMarkerAlt className="fill-green-700 sm:min-w-3 sm:min-h-3  min-h-2 min-w-2 " />
	const endIcon = <FaMapMarkerAlt className="fill-red-600 sm:min-w-3 sm:min-h-3  min-h-3 min-w-3 " />

	useEffect(() => {
		if (state.isToUpdate) {
			updatePlace({ dispatch, markers, placeToUpdate, setLoading, setMark })
			dispatch({ type: "SET_IS_TO_UPDATE", isToUpdate: false });
		}
	}, [state.isToUpdate])

	const handleClick = () => {
		dispatch({ type: "SET_PLACE_INSTANCE", placeInstance: { displayName: { text: "" }, id: '0', location: { latitude: 0, longitude: 0 }, instance: true } })
	}

	const handleDelete = (markerId: string) => {
		handleDeleteMark(markerId)
	}
	const handleClearInputsState = () => {
		dispatch({ type: "CLEAR_ROUTE_PLACE_DATA" })
	}
	const handleLoad = () => {
		dispatch({ type: "SET_IS_LOAD_FROM_DB", isLoadFromDB: true })
		// dispatch({ type: "SET_PLACES", places: test })
		// const markers = test.map((place) => {
		// 	const marker: MarkersType = {
		// 		coords: [place.location.longitude, place.location.latitude],
		// 		id: place.id,
		// 		start: place.start,
		// 		end: place.end,
		// 	};
		// 	return marker
		// })

		dispatch({ type: "SET_MARKERS", markers })
	}


	return (
		<div className="flex flex-col gap-[1rem] ">
			{state.places && state.places.map((data, i) => {
				if (state.places) {
					const isStart = i === 0;
					const isEnd = state.places.length >= 2 && i === state.places.length - 1;
					const startContent = isStart ? startIcon : isEnd ? endIcon : i !== 0 && i !== state.places.length - 1 && i;
					return (<div key={data.id} className='inline-flex gap-2'>
						<AutocompletePlaceInput startContent={startContent} place={data} start={isStart} end={isEnd} loading={loading} setLoading={setLoading} />
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