import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import useMapContext from "../../hooks/useMapContext";
import CordList from "../Menu/CordList/CordList";
import NavbarMenu from "../Menu/NavBar/Navbar";
import RouteButtonsMenu from "../Menu/RouteButtonsMenu/RouteButtonsMenu";
import { RouteInstruction, TotalRouteInformation } from "../RouteInstruction/RouteInstruction";
import { buttonVariants, itemVariants } from "./variants";
// type ControlPanelProps = {
//   markers: MarkersType[] | undefined;
// };
//To do. On marker field click navigate to marker with useMap(), onDelete marker, delete route 


function ControlPanel() {
  const { state } = useMapContext();
  const [toggleMenu, setToggleMenu] = useState<boolean>(true)


  return (
    <div>
      <motion.div variants={buttonVariants} animate={toggleMenu ? "open" : "closed"} className="absolute z-10  left-0 top-0 ">
        <Button radius="none" className="min-h-20 rounded-r-sm bg-emerald-400" isIconOnly onClick={() => setToggleMenu(prev => !prev)}>
          <motion.div animate={{ x: 3, rotate: toggleMenu ? 180 : 0 }} >
            <SlArrowRight />
          </motion.div>
        </Button>
      </motion.div>
      <motion.div

        className={`z-20 absolute  scrollbar-thumb-zinc-800 scrollbar-track-zinc-900    w-full sm:max-w-[500px] min-w-[300px]    left-0 top-0  `}
        animate={{ overflowY: "hidden", scrollBehavior: "auto", scrollbarWidth: "thin" }}
        transition={{ duration: 5 }}
      >
        <motion.div className=" rounded-br-sm  overflow-y-auto scrollbar-thin  
          sm:max-h-screen" variants={itemVariants} animate={toggleMenu ? "open" : "closed"}>
          <NavbarMenu />
          <Card radius="none" className=" flex-col   min-h-full  flex-grow  ">
            <CardHeader className=" flex-col gap-4">
              <RouteButtonsMenu />
            </CardHeader>
            <CardBody className=" gap-4   overflow-auto  ">
              <div className="max-h-[400px]  scrollbar-thin">
                <CordList />
              </div>
              {state.routeInstructions &&
                <>
                  {
                    state.routeInstructions.map(instruction => <div
                      aria-label="Route instruction" title={`Route  ${instruction.steps[0].name}`} key={instruction.id} className="   scrollbar-thin     scrollbar-thumb-zinc-800 scrollbar-track-zinc-900  ">
                      <TotalRouteInformation steps={instruction} />

                      <RouteInstruction steps={instruction} />
                      <Divider />
                    </div>)

                  }
                </>


              }
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ControlPanel;





