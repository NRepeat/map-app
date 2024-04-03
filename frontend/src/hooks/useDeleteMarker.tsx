import useMapContext from "./useMapContext";

const useDeleteMarker = () => {
  const { dispatch } = useMapContext();
  const handleDeleteMark = (markerId: string) => {
    return dispatch({ type: "DELETE_MARKER", markerId });
  };
  return { handleDeleteMark };
};

export default useDeleteMarker;
