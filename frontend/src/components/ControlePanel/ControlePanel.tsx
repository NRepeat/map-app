import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import useMapContext from "../../hooks/useMapContext";
import { sort } from "../../utils/sortRoute";
import CordList from "../Menu/CordList/CordList";
import NavbarMenu from "../Menu/NavBar/Navbar";
import RouteButtonsMenu from "../Menu/RouteButtonsMenu/RouteButtonsMenu";
import RouteCard from "../RouteCard/RouteCard";
import SavedRoutes from "../SavedRoutes/SavedRoutes";
import Options from "./Options/Options";
import RouteInstructionsCard from "./RouteInstructionsCard/RouteInstructionsCard";
import { buttonVariants, itemVariants } from "./variants";

function ControlPanel() {
  const { state } = useMapContext();
  const { routeInstructions, selectedRouteId, isOpenRouteInstruction, route } =
    state;
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const [toggleSort, setToggleSort] = useState<{
    distance: boolean;
    desc: boolean;
  }>({ distance: true, desc: false });
  const selectedRouteInstruction =
    routeInstructions &&
    routeInstructions.find((instruction) => instruction.id === selectedRouteId);

  const handleToggleMenu = () => {
    setIsPopoverOpen(false);
    setToggleMenu((prev) => !prev);
  };
  return (
    <div>
      <motion.div
        variants={buttonVariants}
        animate={toggleMenu ? "open" : "closed"}
        className="absolute z-10  left-0 top-0 "
      >
        <Button
          radius="none"
          className="min-h-20 rounded-r-sm bg-emerald-400"
          isIconOnly
          onClick={handleToggleMenu}
        >
          <motion.div animate={{ x: 3, rotate: toggleMenu ? 180 : 0 }}>
            <SlArrowRight />
          </motion.div>
        </Button>
      </motion.div>
      <motion.div
        className={`z-20 absolute  scrollbar-thumb-zinc-800 scrollbar-track-zinc-900    w-full sm:max-w-[500px] min-w-[300px]    left-0 top-0  `}
        animate={{
          overflowY: "hidden",
          scrollBehavior: "auto",
          scrollbarWidth: "thin",
        }}
        transition={{ duration: 5 }}
      >
        <motion.div
          className=" rounded-br-sm  overflow-y-auto scrollbar-thin  
          sm:max-h-screen"
          variants={itemVariants}
          animate={toggleMenu ? "open" : "closed"}
        >
          <NavbarMenu
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
          />
          {state.isSavedRouteOpen ? (
            <SavedRoutes />
          ) : (
            <>
              {isOpenRouteInstruction && selectedRouteInstruction ? (
                <RouteInstructionsCard
                  selectedRouteInstruction={selectedRouteInstruction}
                />
              ) : (
                <Card
                  radius="none"
                  className=" flex-col   min-h-full  flex-grow   rounded-br-md"
                >
                  <CardHeader className=" flex-col gap-4">
                    <RouteButtonsMenu />
                  </CardHeader>
                  <CardBody className=" gap-4   overflow-auto  ">
                    <div className="max-h-[400px]  scrollbar-thin overflow-y-auto">
                      <CordList />
                    </div>
                    <Options />
                    {route && route.length > 1 && (
                      <ButtonGroup fullWidth>
                        <Button
                          onClick={() =>
                            setToggleSort((prev) => ({
                              desc: prev.desc,
                              distance: !prev.distance,
                            }))
                          }
                        >
                          {toggleSort.distance ? "Duration" : "Distance"}
                        </Button>
                        <Button
                          onClick={() =>
                            setToggleSort((prev) => ({
                              desc: !prev.desc,
                              distance: prev.distance,
                            }))
                          }
                        >
                          {toggleSort.desc ? "Asc" : "Desc"}
                        </Button>
                      </ButtonGroup>
                    )}
                    {state.route ? (
                      <>
                        {sort(state.route, toggleSort)
                          .slice()
                          .reverse()
                          .map((route) => (
                            <RouteCard route={route} key={route.id} />
                          ))}
                      </>
                    ) : (
                      state.selectedRoute && (
                        <>
                          {" "}
                          {
                            <RouteCard
                              route={state.selectedRoute}
                              isLoaded
                              showing
                            />
                          }
                        </>
                      )
                    )}
                  </CardBody>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ControlPanel;
