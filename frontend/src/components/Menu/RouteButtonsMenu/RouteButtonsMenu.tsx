import { Button, ButtonGroup } from '@nextui-org/react';
import { OpenRoute } from '../../../handlers/openRoute';
import useMapContext from '../../../hooks/useMapContext';
import useSetMarkers from '../../../hooks/useSetMarkers';



const RouteButtonsMenu = () => {


	const { setMark } = useSetMarkers();
	const { state, dispatch } = useMapContext();
	const openRoute = new OpenRoute(dispatch);

	return (
		<ButtonGroup fullWidth>

			<Button disabled={state.markers?.length! <= 0} onClick={() => openRoute.getOptimizationRoute(state.markers!)}>
				Get optimization
			</Button>
			<Button color="primary" onClick={setMark}>
				Add point to trip
			</Button>
			{state.markers && state.markers.length >= 2 ? (
				<Button
					variant={"solid"}
					color={"success"}
					radius="md"
					onClick={() => openRoute.getOpenRouteRoute(state.markers!)}
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
	)
}

export default RouteButtonsMenu