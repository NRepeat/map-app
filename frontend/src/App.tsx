import { Modal, ModalContent, Spinner } from "@nextui-org/react";
import { Outlet } from "react-router-dom";
import MapInstance from "./components/Map/Map";
import useMapContext from "./hooks/useMapContext";
import "./styles/IdeClone.css";
import "./styles/SampleSplitter.css";


export function App() {
  const { state } = useMapContext()


  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Modal backdrop={"blur"} className="max-w-[200px] pt-4" isOpen={!state.mapLoading} hideCloseButton >
        <ModalContent className="bg-emerald-400 text-white" >
          <Spinner color="white" label="Loading map..." size="lg" labelColor="foreground" />
        </ModalContent>
      </Modal>
      <MapInstance />
      <Outlet />
    </div>);
}
