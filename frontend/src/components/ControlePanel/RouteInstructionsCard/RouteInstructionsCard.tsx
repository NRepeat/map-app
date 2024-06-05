import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { VscChromeClose } from "react-icons/vsc";
import useMapContext from "../../../hooks/useMapContext";
import { RouteInstruction } from "../../../types/types";
import { RouteInstruction as RouteInstructionSteps } from "../../RouteInstruction/RouteInstruction";

const RouteInstructionsCard = ({
  selectedRouteInstruction,
}: {
  selectedRouteInstruction: RouteInstruction;
}) => {
  const { state, dispatch } = useMapContext();

  const selectedRoute = state.route
    ? state.route.find((r) => r.id === state.selectedRouteId)
    : state.selectedRoute;

  const handelOpenRouteInstructions = () => {
    dispatch({
      type: "SET_IS_OPEN_ROUTE_INSTRUCTION",
      isOpenRouteInstruction: false,
    });
  };
  return (
    <Card
      radius="none"
      className=" flex-col   min-h-full  flex-grow   rounded-br-md"
    >
      <CardHeader className=" ">
        <div className="flex items-center  justify-between w-full">
          <p className="text-xl font-bold">{selectedRoute?.name}</p>
          <Button
            onClick={handelOpenRouteInstructions}
            isIconOnly
            variant="solid"
            color="danger"
          >
            {" "}
            <VscChromeClose className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <RouteInstructionSteps steps={selectedRouteInstruction} />
      </CardBody>
    </Card>
  );
};

export default RouteInstructionsCard;
