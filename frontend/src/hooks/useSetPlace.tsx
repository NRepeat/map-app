import { Place } from '../types/types';
import useMapContext from './useMapContext';

const useSetPlace = () => {
	const { dispatch } = useMapContext();

	const setPlace = (place: Place) => {


		dispatch({ type: "SET_PLACES", newPlace: place })
	}
	const setPlaces = (places: Place[]) => {


		dispatch({ type: "SET_PLACES", places: places })
	}

	return { setPlace, setPlaces }
}

export default useSetPlace