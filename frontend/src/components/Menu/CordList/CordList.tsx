import { Button, Input } from '@nextui-org/react';
import { TiDelete } from 'react-icons/ti';
import { useMap } from 'react-map-gl';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import { CoordsType } from '../../../types/types';

const CordList = () => {
	const { handleDeleteMark } = useDeleteMarker();
	const { state } = useMapContext();
	const { current: map } = useMap()
	const handleFocusOnMarker = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, marker: CoordsType) => {
		e.stopPropagation()
		if (!map) {
			throw new Error("Map not found")
		}
		map.flyTo({
			center: marker,
			animate: true,
			around: marker,
			duration: 1000,
			essential: true,
			zoom: 16
		})
	}
	return (
		<div className="flex flex-col gap-[1rem]">
			{state.markers &&
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
									{i === 0 && "Start"}
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
				))}
		</div>
	)
}

export default CordList