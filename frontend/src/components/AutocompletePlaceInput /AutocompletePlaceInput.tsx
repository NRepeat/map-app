import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import { FC, Key, useState } from 'react';
import { handelAutocomplete } from '../../handlers/google';
import useFlyToMarker from '../../hooks/useFlyToMarker';
import useSetMarkers from '../../hooks/useSetMarkers';
import { CoordsType, Place } from '../../types/types';

const defaultItems = [{}]

type AutocompletePlaceInputType = {
	inputDefaultValue?: string
}

const AutocompletePlaceInput: FC<AutocompletePlaceInputType> = ({ inputDefaultValue }) => {
	const { handleFocusOnMarker } = useFlyToMarker()
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

	const debouncedSave = debounce((newValue: string) => getSuggestions(newValue), 2000);



	const updateValue = (newValue: string) => {
		setInputValue(newValue)
		debouncedSave(newValue);
	};

	const handelSelectionChange = (value: Key) => {
		// debouncedSave.cancel()
		const selectedPlace = options.find((option) => option.formatted_address === value);
		if (selectedPlace) {
			setSelectedPLace(selectedPlace)
			setMark({ lat: selectedPlace.geometry.location.lat, lng: selectedPlace.geometry.location.lng })
			const coord: CoordsType = [selectedPlace.geometry.location.lng, selectedPlace.geometry.location.lat]
			handleFocusOnMarker(coord)
		}
	};
	const handelInputClick = () => {
		if (selectedPlace) {
			const coord: CoordsType = [selectedPlace.geometry.location.lng, selectedPlace.geometry.location.lat]
			handleFocusOnMarker(coord)
		}
	}
	return (
		<Autocomplete
			color="default"
			fullWidth={true}
			variant="bordered"
			isLoading={loading}
			shouldCloseOnBlur={true}
			allowsCustomValue
			items={options}
			inputValue={inputValue}
			onClick={(e) => handelInputClick(e)}
			listboxProps={{ color: "secondary" }}
			popoverProps={{ color: "primary" }}
			onSelectionChange={(e) => handelSelectionChange(e)}
			onInputChange={(e) => updateValue(e)}

		>
			{((option) => (
				<AutocompleteItem variant="faded" color="default" key={option.formatted_address}>
					{option.formatted_address}
				</AutocompleteItem>
			))}
		</Autocomplete>
	);
};

export default AutocompletePlaceInput;
