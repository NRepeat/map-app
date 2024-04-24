import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { IoChevronForwardCircle } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import { useMap } from 'react-map-gl';
import useDeleteMarker from '../../../hooks/useDeleteMarker';
import useMapContext from '../../../hooks/useMapContext';
import { CoordsType } from '../../../types/types';

const CordList = () => {
	const [startCoord, setStartCoord] = useState<string | null>(null)
	const { handleDeleteMark } = useDeleteMarker();
	const { state } = useMapContext();
	const { current: map } = useMap()
	const handleFocusOnMarker = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, marker: CoordsType | null) => {
		e.stopPropagation()
		if (!map) {
			throw new Error("Map not found")
		}
		if (marker) {
			map.flyTo({
				center: marker,
				animate: true,
				around: marker,
				duration: 1000,
				essential: true,
				zoom: 16
			})
		}

	}
	const handleStartInput = (e: React.ChangeEvent<HTMLInputElement>, marker?: CoordsType) => {
		setStartCoord(e.target.value)
	}
	const handleGeocodeRequest = async () => {

		const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&location=37.76999%2C-122.44696&radius=500&types=establishment&key=AIzaSyDxe2634ayBpmgAkoWBrTyckcYtp-MK974`;
		const headers = new Headers()
		headers.append('Access-Control-Allow-Origin', '*')
		headers.append('Access-Control-Allow-Credentials', "true")
		headers.append('Access-Control-Allow-Methods', 'POST,GET')

		try {
			const response = await fetch(apiUrl, {
				headers,
			});
			const data = await response.json();
			// Process the data as needed
			console.log(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	return (
		<div className="flex flex-col gap-[1rem]">
			<form>

				<Button onClick={handleGeocodeRequest}>Submit</Button>
			</form>
			<Input
				type='number'
				onChange={(e) => handleStartInput(e)}
				// onClick={(e) => startCoord && handleFocusOnMarker(e, [startCoord[0], startCoord[1]])}
				value={`${startCoord}`}
				startContent={
					<p>
						{<IoChevronForwardCircle className='fill-emerald-400 min-h-6 min-w-6' />}
					</p>
				}
			/>
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
				))}
		</div>
	)
}

export default CordList