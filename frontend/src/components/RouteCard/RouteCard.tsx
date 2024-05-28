import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { FaRoute } from "react-icons/fa";
import { VscSave } from "react-icons/vsc";
import useMapContext from "../../hooks/useMapContext";
import { MarkersType, Place, RouteType } from "../../types/types";
import FilterDistance from "../FilterDistance/FilterDistance";
import FilterTime from "../FilterTime/FilterTime";

const RouteCard = ({
  route,
  isLoaded,
  showing,
}: {
  route: RouteType;
  isLoaded?: boolean;
  showing?: boolean;
}) => {
  const { state, dispatch } = useMapContext();
  const { selectedRouteId, user } = state;
  const isSelected = selectedRouteId && selectedRouteId === route.id;
  const options = route.options && route.options;
  const handelOpenRouteInstructions = () => {
    if (isLoaded && selectedRouteId && state.isSavedRouteOpen) {
      return handleLoad();
    }
    dispatch({
      type: "SET_IS_OPEN_ROUTE_INSTRUCTION",
      isOpenRouteInstruction: true,
    });
  };

  const handleGetBack = () => {
    dispatch({
      type: "SET_IS_OPEN_ROUTE_INSTRUCTION",
      isOpenRouteInstruction: false,
    });
    dispatch({ type: "SET_IS_SAVED_ROUTES", isSavedRouteOpen: false });
  };
  const handleLoad = () => {
    const places = route.places as any as Place[];
    dispatch({ type: "SET_PLACES", places: places });
    const markers = places.map((place, i: number) => {
      const marker: MarkersType = {
        coords: [place.location.longitude, place.location.latitude],
        id: place.id,
        start: place.start ? true : i === 0 ? true : false,
        end: place.end ? true : i === places.length - 1 ? true : false,
      };
      return marker;
    });
    dispatch({ type: "CLEAR_ROUTE_PLACE_DATA" });
    dispatch({ type: "SET_SELECTED_ROUTE", selectedRoute: route });
    dispatch({ type: "SET_ROUTE_OPTIONS", options: route.options });
    dispatch({ type: "SET_MARKERS", markers });

    handleGetBack();
  };
  const handleSelectRoute = () => {
    if (isLoaded) {
      // dispatch({ type: "CLEAR_ROUTE_PLACE_DATA" })
    }
    if (!isLoaded) {
      return;
    }

    dispatch({ type: "SET_SELECTED_ROUTE", selectedRoute: route });

    dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: route.id });
  };
  const handleSaveRoute = () => {
    dispatch({ type: "SAVE_ROUTE", selectedRouteId: route.id });
  };
  return (
    <div
      onClick={handelOpenRouteInstructions}
      onMouseOver={handleSelectRoute}
      className="cursor-pointer"
    >
      <Card
        className={` border-2 transition-border duration-500 ${isSelected ? "border-emerald-500" : "border-gray-300 border-opacity-0"} hover:border-emerald-500 hover:border-2`}
      >
        <CardHeader className="justify-between items-center">
          <p className="text-lg">
            {route.name ? (
              <>
                <span className="text-emerald-400 text-xl">Route:</span>
                <span>{route.name}</span>
              </>
            ) : (
              `Route:`
            )}
          </p>
          <div className="flex items-center min-h-[64px] flex-col-reverse justify-center ">
            {isLoaded ? (
              <>
                {selectedRouteId && selectedRouteId === route.id && !showing ? (
                  <Button onClick={handleLoad}> Show route</Button>
                ) : (
                  <>
                    {" "}
                    {selectedRouteId && selectedRouteId === route.id && (
                      <Button
                        className="text-lg"
                        fullWidth
                        onClick={handelOpenRouteInstructions}
                        variant="light"
                        color="success"
                      >
                        Route instruction <FaRoute className="w-5 h-5" />
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {user && isSelected && (
                  <Button
                    className="text-lg"
                    fullWidth
                    color="primary"
                    onClick={handleSaveRoute}
                    variant="light"
                  >
                    Save Route
                    <VscSave className="w-5 h-5" />
                  </Button>
                )}
                {selectedRouteId && selectedRouteId === route.id && (
                  <Button
                    className="text-lg"
                    fullWidth
                    onClick={handelOpenRouteInstructions}
                    variant="light"
                    color="success"
                  >
                    Route instruction <FaRoute className="w-5 h-5" />
                  </Button>
                )}
              </>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="">
          <p className="text-xl text-purple-400">Options</p>
          <div className="flex pt-2 pl-0.5  text-lg  justify-between w-full text-balance">
            <div className="flex flex-col w-full  font-light">
              <span className="">
                {options?.avoid_features?.join(",") && (
                  <div className="capitalize flex flex-row gap-0.5 flex-wrap">
                    • Avoid:{" "}
                    {options?.avoid_features?.map((f, i: number) => (
                      <span className="">
                        {f}
                        {i !== options?.avoid_features!.length - 1 && ","}
                      </span>
                    ))}
                  </div>
                )}
              </span>
              <p className="text-pretty">
                • Preference:{" "}
                <span className="capitalize"> {options?.preference}</span>
              </p>
              <span>
                {options?.maximum_speed && (
                  <p className="text-pretty">
                    • Maximum speed: {options?.maximum_speed} km/h
                  </p>
                )}
              </span>

              <span className="">• Units:{options?.units}</span>

              <span className="pl-4">
                {options?.continue_straight && <span>• Continue straight</span>}
              </span>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="text-lg flex-row justify-between">
          <p className="flex w-full">
            Total distance:
            <span className="text-emerald-400 font-bold pl-1.5">
              <FilterDistance
                distance={route.properties.summary.distance}
                units={options?.units}
              />
            </span>
          </p>
          <p className="flex w-full">
            Duration:
            <span className="font-bold text-purple-400 pl-1.5">
              <FilterTime time={route.properties.summary.duration} />
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RouteCard;
