import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { TiDelete } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import { getOpenRouteRoute } from "../../api/openroute";
import useDeleteMarker from "../../hooks/useDeleteMarker";
import useMapContext from "../../hooks/useMapContext";
import useSetMarkers from "../../hooks/useSetMarkers";
import { MarkersType } from "../../types/types";

type ControlPanelProps = {
  markers: MarkersType[] | undefined;
};
//To do. On marker field click navigate to marker with useMap(), onDelete marker, delete route 
function ControlPanel({ markers }: ControlPanelProps) {
  const { setMark } = useSetMarkers();
  const { handleDeleteMark } = useDeleteMarker();
  const { dispatch } = useMapContext();
  const coordsOpenRoute = markers?.map((marker) => marker.coords);

  const coordsOpenRouteJSON = JSON.stringify(coordsOpenRoute);

  const handleGetOpenRouteRoute = async () => {
    const data = await getOpenRouteRoute(coordsOpenRouteJSON);
    const routeCordsArr = data.coords.map((coord: any) => ({
      coordinates: coord.geometry.coordinates,
      properties: coord.properties,
      id: uuidv4(),
    }));
    dispatch({ type: "SET_OPEN_ROUTE_ROUTE", route: routeCordsArr });
  };

  return (
    <Card className="absolute left-10 top-10  flex flex-col  min-w-[300px]">
      <CardHeader>
        <ButtonGroup fullWidth>
          {/* <Button onClick={handleGetOptimizationRoute}>
						Get optimization
					</Button> */}
          <Button color="primary" onClick={setMark}>
            Add point to trip
          </Button>
          {/* <Button onClick={() => handleGetOpenRouteRoute()}>Get route</Button> */}
          {markers && markers.length >= 2 ? (
            <Button
              variant={"solid"}
              color={"success"}
              radius="md"
              onClick={handleGetOpenRouteRoute}
            >
              Get route
            </Button>
          ) : (
            <Button
              disabled={true}
              disableAnimation={true}
              variant={"bordered"}
              color={"default"}
              radius="md"
            >
              Get route
            </Button>
          )}
        </ButtonGroup>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-[1rem]">
          {markers &&
            markers.map((marker, i) => (
              <div
                key={marker.id}
                className="inline-flex items-center justify-between w-full gap-4"
              >
                <Input
                  disabled
                  value={`${marker.coords[0].toFixed(3)};${marker.coords[1].toFixed(3)}`}
                />
                {i !== 0 && i !== markers.length - 1 && (
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
      </CardBody>
    </Card>
  );
}

export default ControlPanel;
