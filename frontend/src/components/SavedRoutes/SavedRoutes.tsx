import { Button, ButtonGroup, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getAllRoutes } from "../../api/route";
import useMapContext from "../../hooks/useMapContext";
import { sort } from "../../utils/sortRoute";
import RouteCard from "../RouteCard/RouteCard";

const SavedRoutes = () => {
	const { state, dispatch } = useMapContext();
	const [toggleSort, setToggleSort] = useState<{ distance: boolean, desc: boolean }>({ distance: true, desc: false })
	const { user } = state
	useEffect(() => {
		const fetchAllSavedRoutes = async () => {
			if (user) {
				const data = await getAllRoutes({ email: user.email, pageSize: 10 })
				console.log("🚀 ~ fetchAllSavedRoutes ~ data:", data)
				if (data) {

					dispatch({ type: "SET_SAVED_ROUTES", savedRoutes: JSON.parse(data.allRoutes) })
				}
			}
		}
		fetchAllSavedRoutes()
	}, [user])
	return (
		<Card radius="none" className=" flex-col   sm:max-w-[500px] min-w-[300px]     flex-grow   rounded-br-md">
			<CardHeader className=' '>
				<ButtonGroup fullWidth>
					<Button onClick={() => setToggleSort(prev => ({ desc: prev.desc, distance: !prev.distance }))}>{toggleSort.distance ? "Duration" : "Distance"}</Button>
					<Button onClick={() => setToggleSort(prev => ({ desc: !prev.desc, distance: prev.distance }))}>{toggleSort.desc ? "Asc" : "Desc"}</Button>
				</ButtonGroup>
			</CardHeader>
			<CardBody>
				<>
					{state.savedRoutes && sort(state.savedRoutes, toggleSort).slice().reverse().map((route, i: number) =>
						<RouteCard route={route} i={i} key={route.id} />
					)}
				</>
			</CardBody>
		</Card>
	)
}

export default SavedRoutes