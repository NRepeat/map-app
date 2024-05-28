import useMapContext from "./useMapContext";

const useDeleteMarker = () => {
  const { dispatch } = useMapContext();
  const handleDeleteMark = (markerId: string) => {
    dispatch({ type: "DELETE_MARKER", markerId });
    dispatch({ type: "DELETE_PLACE", markerId });
  };
  return { handleDeleteMark };
};

export default useDeleteMarker;
