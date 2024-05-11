import { Place } from '../types/types';
import useMapContext from './useMapContext';

const useSetPlace = () => {
	const { dispatch } = useMapContext();

	const setPlace = (place: Place) => {


		dispatch({ type: "SET_PLACES", newPlace: place })
	}

	return { setPlace }
}

export default useSetPlace