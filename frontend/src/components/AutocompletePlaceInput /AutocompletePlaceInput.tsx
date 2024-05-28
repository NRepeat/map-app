import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import debounce from "lodash.debounce";
import React, { FC, Key, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { handelAutocomplete, handelGetPlace } from "../../handlers/google";
import useFlyToMarker from "../../hooks/useFlyToMarker";
import useMapContext from "../../hooks/useMapContext";
import useSetMarkers from "../../hooks/useSetMarkers";
import useSetPlace from "../../hooks/useSetPlace";
import { CoordsType, Place, PlacePrediction } from "../../types/types";

type AutocompletePlaceInputType = {
  start?: boolean;
  end?: boolean;
  label?: string;
  startContent?: React.ReactNode;
  place?: Place | undefined;
  i: number;
};

const AutocompletePlaceInput: FC<AutocompletePlaceInputType> = ({
  startContent,
  label,
  place,
  start,
  end,
  i,
}) => {
  const { handleFocusOnMarker } = useFlyToMarker();
  const { dispatch, state } = useMapContext();
  const [loading, setLoading] = useState<boolean>(false);

  const [options, setOptions] = useState<PlacePrediction[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string | undefined>();
  const { setMark } = useSetMarkers();
  const { setPlace } = useSetPlace();

  useEffect(() => {
    if (place) {
      if (place.displayName.text === "Start") {
        setInputValue("");
      } else if (place.displayName.text === "Stop") {
        setInputValue("");
      } else {
        setInputValue(place.displayName.text);
      }
    }
  }, [place]);
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
  const debouncedSave = debounce(
    (newValue: string) => getSuggestions(newValue),
    500
  );
  useEffect(() => {
    if (inputRef && inputRef.current && inputValue) {
      inputRef.current.value = inputValue;
      setTimeout(() => {
        if (inputValue === inputRef.current?.value) {
          debouncedSave(inputValue);
        }
      }, 1000);
    }
  }, [inputValue]);

  const updateValue = (newValue: string) => {
    setInputValue(newValue);
  };
  const handelSelectionChange = async (value: Key) => {
    if (!value) {
      return null;
    }
    const place = await handelGetPlace(value as string);
    if (place) {
      const coord: CoordsType = [
        place.location.longitude,
        place.location.latitude,
      ];``
      dispatch({
        type: "SET_PLACE_TO_UPDATE",
        placeToUpdate: {
          place: state.places![i],
          newCoords: coord,
          marker: state.markers![i],
        },
      });
      dispatch({ type: "UPDATE_PLACES", newPlace: place });

      handleFocusOnMarker(coord);
      dispatch({
        type: "UPDATE_MARKER_ID",
        updateMarkerId: {
          id: state.markers![i].id,
          newId: place.id,
        },
      });
      dispatch({
        type: "UPDATE_MARKERS_CORDS",
        markerEndPoint: coord,
        markerIndex: i,
      });
      if (start) {
        setPlace({ start: true, ...place });
        return setMark(place.id, {
          lat: place.location.latitude,
          lng: place.location.longitude,
          start: true,
        });
      } else if (end) {
        setPlace({ end: true, ...place });
        return setMark(place.id, {
          lat: place.location.latitude,
          lng: place.location.longitude,
          end: true,
        });
      } else {
        const existPlace = state.places?.find((data) => data.id === place.id);
        if (existPlace) {
          setInputValue(existPlace.displayName.text);
          return console.log("Place exist");
        }
        // setPlace(place)
        // return setMark(place.id, { lat: place.location.latitude, lng: place.location.longitude });
      }
    }
  };
  const handelInputClick = () => {
    if (state.markers) {
      const martker = state.markers[i];

      const coord: CoordsType = martker.coords;
      handleFocusOnMarker(coord);
    }
  };
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
      aria-label="autocomplete"
      inputValue={inputValue}
      onClick={handelInputClick}
      listboxProps={{ color: "secondary" }}
      popoverProps={{ color: "primary" }}
      onSelectionChange={(e) => handelSelectionChange(e)}
      onInputChange={(e) => updateValue(e)}
      disableSelectorIconRotation
      selectorIcon={<IoIosSearch />}
    >
      {(option) => (
        <AutocompleteItem variant="faded" color="default" key={option.placeId}>
          {option.text}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default AutocompletePlaceInput;
