import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import AutocompletePlaceInput from '../../AutocompletePlaceInput /AutocompletePlaceInput';
const CordList = () => {

	const { handleDeleteMark } = useDeleteMarker();
	const { state } = useMapContext();
	const [disableButton, setDisableButton] = useState<boolean>(false)
	console.log("🚀 ~ CordList ~ disableButton:", disableButton)
	const [inputArr, setInputArr] = useState<{ id: number }[]>([{ id: 0 }])
	const handleAddInput = (id: number) => {
		setInputArr(prev => {
			if (Array.isArray(prev)) {
				return [{ id }, ...prev]
			}
			return [{ id }]
		})
	}

	const startIcon = <FaMapMarkerAlt className="fill-green-700 sm:min-w-3 sm:min-h-3  min-h-2 min-w-2 " />
	const endIcon = <FaMapMarkerAlt className="fill-red-600 sm:min-w-3 sm:min-h-3  min-h-3 min-w-3 " />
	const pointIcon = (i: number) => <>
		{i + 1}
	</>

	useEffect(() => {
		if (state.markers && state.markers.length > 1) {
			const secondLastMarker = state.markers[state.markers.length - 1];
			console.log("🚀 ~ useEffect ~ secondLastMarker:", secondLastMarker)
			if (secondLastMarker.id === 'start') {
				setDisableButton(true);
			}
			if (state.markers.length !== inputArr.length) {
				setDisableButton(true);
			}
			// } else if (state.markers.length - 1 === inputArr.length) {
			// 	setDisableButton(false);
			// } else {
			// 	setDisableButton(true);
			// }

		}
	}, [state.markers, inputArr]);
	return (
		<div className="flex flex-col gap-[1rem] ">
			<AutocompletePlaceInput id={'start'} startContent={startIcon} start inputDefaultValue={state.places && state.places[0].formatted_address ? state.places[0].formatted_address : ""} />
			{inputArr && inputArr.map((_, i) => {
				if (_.id !== 0) {
					return <AutocompletePlaceInput startContent={pointIcon(i)} key={i} id={`${i}`} />
				}
			})}

			{state.markers && state.markers[0].id === "start" &&
				<>
					{state.markers && state.markers[state.markers?.length - 1].id === "end" && <div className='w-full flex relative justify-center'>
						<button className='absolute flex justify-center bg-emerald-400 z-10 min-w-[90%] min-h-3 items-center bottom-[3px]' disabled={disableButton} onClick={() => handleAddInput(inputArr[inputArr.length - 1].id + 1)}>
							<IoIosAddCircle />
						</button>
					</div>}

					<AutocompletePlaceInput startContent={endIcon} id={'end'} end inputDefaultValue={state.places && state.places[state.places.length - 1].end ? state.places[state.places.length - 1].formatted_address : ""} />
				</>
			}




			{/* {state.places && state.places.map((_, i) => {
				if (i !== 0 && i !== state.places!.length - 1) {
					return <AutocompletePlaceInput id={v4()} key={i} />

				}
			})} */}
			{/* {state.markers &&
				state.markers.map((marker, i) => (
					<div
						key={marker.id}
						className="inline-flex items-center justify-between w-full gap-4"
					>
						<Input
							onClick={(e) => handleFocusOnMarker(e, [marker.coords[0], marker.coords[1]])}
							value={`${marker.coords[0].toFixed(3)};${marker.coords[1].toFixed(3)}`}
							startContent={
								<p>
									{i === 0 && <IoChevronForwardCircle className='fill-emerald-400 min-h-6 min-w-6' />}
									{i !== 0 && i !== state.markers!.length - 1 && i}
									{state.markers!.length - 1 <= i && "Endpoint"}
								</p>
							}
						/>
						{i !== 0 && i !== state?.markers!.length - 1 && (
							<Button
								color="secondary"
								onClick={() => handleDeleteMark(marker.id)}
								isIconOnly
							>
								<TiDelete />
							</Button>
						)}
					</div>
				))} */}
		</div>
	)
}

export default CordList