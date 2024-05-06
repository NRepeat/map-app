import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import AutocompletePlaceInput from '../../AutocompletePlaceInput /AutocompletePlaceInput';
const CordList = () => {

	const { handleDeleteMark } = useDeleteMarker();
	const { state } = useMapContext();

	const [disableButton, setDisableButton] = useState<boolean>(false)

	const startIcon = <FaMapMarkerAlt className="fill-green-700 sm:min-w-3 sm:min-h-3  min-h-2 min-w-2 " />
	const endIcon = <FaMapMarkerAlt className="fill-red-600 sm:min-w-3 sm:min-h-3  min-h-3 min-w-3 " />
	const pointIcon = (i: number) => <>
		{i + 1}
	</>


	return (
		<div className="flex flex-col gap-[1rem] ">
			<AutocompletePlaceInput id={'start'} startContent={startIcon} start />
			{/* <AutocompletePlaceInput startContent={pointIcon(1)}  /> */}

			{state.markers && state.markers[0].id === "start" &&
				<>
					{state.markers && state.markers[state.markers?.length - 1].id === "end" && <div className='w-full flex relative justify-center'>
						{/* <button className='absolute flex justify-center bg-emerald-400 z-10 min-w-[90%] min-h-3 items-center bottom-[3px]' disabled={disableButton} onClick={() => handleAddInput(inputArr[inputArr.length - 1].id + 1)}>
							<IoIosAddCircle />
						</button> */}
					</div>}

					<AutocompletePlaceInput startContent={endIcon} id={'end'} end />
				</>
			}



		</div>
	)
}

export default CordList