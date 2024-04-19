import { Button, Input } from '@nextui-org/react';
import { TiDelete } from 'react-icons/ti';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';

const CordList = () => {
	const { handleDeleteMark } = useDeleteMarker();
	const { state } = useMapContext();
	return (
		<div className="flex flex-col gap-[1rem]">
			{state.markers &&
				state.markers.map((marker, i) => (
					<div
						key={marker.id}
						className="inline-flex items-center justify-between w-full gap-4"
					>
						<Input
							disabled
							value={`${marker.coords[0].toFixed(3)};${marker.coords[1].toFixed(3)}`}
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
				))}
		</div>
	)
}

export default CordList