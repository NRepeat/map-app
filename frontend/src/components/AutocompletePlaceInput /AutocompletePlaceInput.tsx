import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import React, { FC, Key, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { v4 as uuidv4 } from "uuid";
import { handelAutocomplete } from '../../handlers/google';
import useFlyToMarker from '../../hooks/useFlyToMarker';
import useMapContext from '../../hooks/useMapContext';
import useSetMarkers from '../../hooks/useSetMarkers';
import { CoordsType, Place } from '../../types/types';



type AutocompletePlaceInputType = {
	id: string,
	inputDefaultValue?: string
	start?: boolean,
	end?: boolean
	label?: string
	startContent?: React.ReactNode
}

const AutocompletePlaceInput: FC<AutocompletePlaceInputType> = ({ inputDefaultValue, id, startContent, label }) => {
	const { handleFocusOnMarker } = useFlyToMarker()
	const { dispatch, state } = useMapContext()
	const [options, setOptions] = useState<Place[]>([]);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState<string | undefined>(inputDefaultValue)
	const [selectedPlace, setSelectedPLace] = useState<Place>()
	const { setMark } = useSetMarkers()
	const getSuggestions = async (word: string) => {
		if (word) {
			setLoading(true);
			let response = await handelAutocomplete(word);
			setOptions(response.results);
			setLoading(false);
		} else {
			setOptions([]);
		}
	};

	const debouncedSave = debounce((newValue: string) => getSuggestions(newValue), 1500);



	const updateValue = (newValue: string) => {
		setInputValue(newValue)
		debouncedSave(newValue);
	};

	const handelSelectionChange = (value: Key) => {
		if (!value) {
			return null
		}
		const endSubstring = "id:";
		//@ts-ignore
		const endIndex = value.indexOf(endSubstring);
		//@ts-ignore
		const result = value.substring(0, endIndex).trim();
		const selectedPlace = options.find((option) => option.formatted_address === result);
		if (selectedPlace) {
			// setPlaces(state.places, selectedPlace, dispatch, start, end)
			setSelectedPLace(selectedPlace)

			const coord: CoordsType = [selectedPlace.geometry.location.lng, selectedPlace.geometry.location.lat];
			const existCoordsIndex = state.markers?.findIndex(marker => marker.id === id);

			if (existCoordsIndex !== undefined && existCoordsIndex !== -1) {
				const existMarker = state.markers![existCoordsIndex];
				const existCoords = Math.round(existMarker.coords[0]) === Math.round(coord[0]) && Math.round(existMarker.coords[1]) === Math.round(coord[1]);

				if (existCoords) {
					handleFocusOnMarker(coord);
					dispatch({
						type: "UPDATE_MARKERS_CORDS",
						markerEndPoint: coord,
						markerIndex: existCoordsIndex,
					});
				}
			} else {
				handleFocusOnMarker(coord);
				setMark(id, { lat: selectedPlace.geometry.location.lat, lng: selectedPlace.geometry.location.lng });
			}
		}
	}
	const handelInputClick = () => {
		if (selectedPlace) {
			const coord: CoordsType = [selectedPlace.geometry.location.lng, selectedPlace.geometry.location.lat]
			handleFocusOnMarker(coord)
		}
	}
	return (
		<Autocomplete
			className='z-50'
			startContent={startContent}
			color="default"
			label={label}
			fullWidth={true}
			variant="bordered"
			isLoading={loading}
			shouldCloseOnBlur={true}
			allowsCustomValue
			defaultItems={[]}
			items={options}
			inputValue={inputValue}
			onClick={handelInputClick}
			listboxProps={{ color: "secondary" }}
			popoverProps={{ color: "primary" }}
			onSelectionChange={(e) => handelSelectionChange(e)}
			onInputChange={(e) => updateValue(e)}
			disableSelectorIconRotation
			selectorIcon={<IoIosSearch />}
		>
			{((option) => (
				<AutocompleteItem variant="faded" color="default" key={option.formatted_address + `id:${uuidv4()}`}>
					{option.formatted_address}
				</AutocompleteItem>
			))}
		</Autocomplete>
	);
};

export default AutocompletePlaceInput;
