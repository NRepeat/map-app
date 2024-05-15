import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import React, { FC, Key, useEffect, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { handelAutocomplete, handelGetPlace } from '../../handlers/google';
import useFlyToMarker from '../../hooks/useFlyToMarker';
import useMapContext from '../../hooks/useMapContext';
import useSetMarkers from '../../hooks/useSetMarkers';
import useSetPlace from '../../hooks/useSetPlace';
import { CoordsType, Place, PlacePrediction } from '../../types/types';



type AutocompletePlaceInputType = {
	start?: boolean,
	end?: boolean
	label?: string
	startContent?: React.ReactNode,
	place?: Place | undefined,
	setLoading: (loading: boolean) => void
	loading: boolean
}

const AutocompletePlaceInput: FC<AutocompletePlaceInputType> = ({ startContent, label, place, start, end, loading, setLoading }) => {
	const { handleFocusOnMarker } = useFlyToMarker()
	const { dispatch, state } = useMapContext()
	const [options, setOptions] = useState<PlacePrediction[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [inputValue, setInputValue] = useState<string | undefined>()
	const [selectedPlace, setSelectedPLace] = useState<Place | undefined>()
	const { setMark } = useSetMarkers()
	const { setPlace } = useSetPlace()

	useEffect(() => {
		if (place) {
			if (place.displayName.text === "Start") {
				setInputValue('')
			} else if (place.displayName.text === "Stop") {
				setInputValue('')
			} else {
				setInputValue(place.displayName.text)
				// setPlaces(place)
				// return setMark(place.id, { lat: place.location.latitude, lng: place.location.longitude, start, end });
			}
		}
	}, [place])
	const getSuggestions = async (word: string) => {
		if (word) {
			setLoading(true);
			const predictions = await handelAutocomplete(word);
			setOptions(predictions);
			setLoading(false);
		} else {
			setOptions([]);
		}
	};
	const debouncedSave = debounce((newValue: string) => getSuggestions(newValue), 500);
	useEffect(() => {
		if (inputRef && inputRef.current && inputValue) {
			inputRef.current.value = inputValue;
			setTimeout(() => {
				if (inputValue === inputRef.current?.value) {
					debouncedSave(inputValue)
				}
			}, 1500);
		}
	}, [inputValue])

	const updateValue = (newValue: string) => {
		setInputValue(newValue)
	};
	const handelSelectionChange = async (value: Key) => {
		if (!value) {
			return null
		}
		const place = await handelGetPlace(value as string)
		dispatch({ type: "SET_MAP_LOADING", mapLoading: true })
		if (place) {
			setSelectedPLace(place)

			const coord: CoordsType = [place.location.longitude, place.location.latitude];
			handleFocusOnMarker(coord);

			if (start) {
				setPlace({ start: true, ...place })
				return setMark(place.id, { lat: place.location.latitude, lng: place.location.longitude, start: true });
			} else if (end) {
				setPlace({ end: true, ...place })
				return setMark(place.id, { lat: place.location.latitude, lng: place.location.longitude, end: true });
			} else {
				const existPlace = state.places?.find(data => data.id === place.id)
				if (existPlace) {

					setInputValue(existPlace.displayName.text)
					return console.log("Place exist")
				}
				setPlace(place)
				return setMark(place.id, { lat: place.location.latitude, lng: place.location.longitude });
			}
		}

	}
	const handelInputClick = () => {
		if (state.markers && selectedPlace) {
			const start = selectedPlace.location.longitude === 0 && selectedPlace.location.latitude === 0
			if (!start) {
				const coord: CoordsType = [selectedPlace.location.longitude, selectedPlace.location.latitude]
				handleFocusOnMarker(coord)
			}
		}
	}
	return (
		<Autocomplete
			ref={inputRef}
			startContent={startContent}
			color="default"
			label={label}
			fullWidth={true}
			variant="bordered"
			isLoading={loading}
			allowsCustomValue
			defaultItems={[]}
			items={options}
			aria-label='autocomplete'
			inputValue={inputValue}
			onClick={handelInputClick}
			listboxProps={{ color: "secondary" }}
			popoverProps={{ color: "primary" }}
			onSelectionChange={(e) => handelSelectionChange(e)}
			onInputChange={(e) => updateValue(e)}
			disableSelectorIconRotation
			// autoFocus
			selectorIcon={<IoIosSearch />}
		>
			{((option) => (
				<AutocompleteItem variant="faded" color="default" key={option.placeId}>
					{option.text}
				</AutocompleteItem>
			))}
		</Autocomplete>
	);
};

export default AutocompletePlaceInput;
