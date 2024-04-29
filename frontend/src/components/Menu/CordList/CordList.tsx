import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useFlyToMarker from '../../../hooks/useFlyToMarker';
import useMapContext from '../../../hooks/useMapContext';
import AutocompletePlaceInput from '../../AutocompletePlaceInput /AutocompletePlaceInput';

const CordList = () => {

	const { handleDeleteMark } = useDeleteMarker();
	const { state } = useMapContext();
	const { handleFocusOnMarker } = useFlyToMarker()

	return (
		<div className="flex flex-col gap-[1rem] ">
			<AutocompletePlaceInput inputDefaultValue='asd' />
			{state.markers &&
				state.markers.map((marker, i) => {
					if (i !== 0 && i !== state?.markers!.length - 1) {
						return <AutocompletePlaceInput inputDefaultValue={`${marker}`} />
					}

				}

					// <div
					// 	key={marker.id}
					// 	className="inline-flex items-center justify-between w-full gap-4"
					// >
					// 	<Input
					// 		onClick={(e) => handleFocusOnMarker(e, [marker.coords[0], marker.coords[1]])}
					// 		value={`${marker.coords[0].toFixed(3)};${marker.coords[1].toFixed(3)}`}
					// 		startContent={
					// 			<p>
					// 				{i === 0 && <IoChevronForwardCircle className='fill-emerald-400 min-h-6 min-w-6' />}
					// 				{i !== 0 && i !== state.markers!.length - 1 && i}
					// 				{state.markers!.length - 1 <= i && "Endpoint"}
					// 			</p>
					// 		}
					// 	/>
					// 	{i !== 0 && i !== state?.markers!.length - 1 && (
					// 		<Button
					// 			color="secondary"
					// 			onClick={() => handleDeleteMark(marker.id)}
					// 			isIconOnly
					// 		>
					// 			<TiDelete />
					// 		</Button>
					// 	)}
					// </div>
				)}
			<AutocompletePlaceInput />
		</div>
	)
}

export default CordList