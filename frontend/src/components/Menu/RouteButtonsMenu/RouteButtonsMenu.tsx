import { Button, ButtonGroup, Tooltip } from '@nextui-org/react';
import { BsGearWide } from 'react-icons/bs';
import { MdRoute } from 'react-icons/md';
import { OpenRoute } from '../../../handlers/openRoute';
import useMapContext from '../../../hooks/useMapContext';



const RouteButtonsMenu = () => {


	const { state, dispatch } = useMapContext();
	const openRoute = new OpenRoute(dispatch);
	const handleClearInputsState = () => {
		dispatch({ type: "CLEAR_ROUTE_PLACE_DATA" })
	}

	const handleGetRoute = () => {
		dispatch({ type: "SET_LOADING", loading: true });
		openRoute.getOpenRouteRoute(state.markers!, state.options!)
	}
	const handleGetOptimizedRoute = () => {
		dispatch({ type: "SET_LOADING", loading: true });
		openRoute.getOptimizationRoute(state.markers!, state.options!)
	}
	return (
		<>
			<ButtonGroup fullWidth >
				<Tooltip color='primary' placement='bottom' content={state.markers && state.markers.length >= 2 ? "Get route" : "Place marker"}>
					<Button
						variant={"solid"}
						color={"success"}
						radius="md"
						disabled={state.route && state.route.length >= 1 || state.selectedRoute ? false : true}
						onClick={() => handleGetRoute()}
					>
						Get route <MdRoute className={`w-5 h-5 ${state.loading ? "animate-pulse " : ''}`} />
					</Button>
				</Tooltip>
				<Button color={state.markers && state.markers.length >= 2 ? "secondary" : "default"} disabled={state.route && state.route.length >= 1 ? false : true} onClick={() => handleGetOptimizedRoute()}>
					Get optimization 	<BsGearWide className={`${state.loading ? "animate-spin " : ''}`} />
				</Button>
				{state.route && state.route?.length >= 1 || state.selectedRoute && <Button onClick={() => handleClearInputsState()} variant='solid' color='danger'>Clear route</Button >}
			</ButtonGroup>
		</>
	)
}

export default RouteButtonsMenu