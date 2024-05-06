import { Button, ButtonGroup, Tooltip } from '@nextui-org/react';
import { OpenRoute } from '../../../handlers/openRoute';
import useMapContext from '../../../hooks/useMapContext';
import useSetMarkers from '../../../hooks/useSetMarkers';



const RouteButtonsMenu = () => {


	const { setMark } = useSetMarkers();
	const { state, dispatch } = useMapContext();
	console.log("🚀 ~ RouteButtonsMenu ~ state:", state)
	const openRoute = new OpenRoute(dispatch);

	return (
		<ButtonGroup fullWidth>


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
				<Tooltip color='primary' placement='bottom' content="Place end marker">
					<Button

						disabled={true}
						disableAnimation={true}
						variant={"bordered"}
						color={"default"}
						radius="md"

					>
						Get route
					</Button>
				</Tooltip>

			)}
			<Button color={state.markers && state.markers.length >= 2 ? "secondary" : "default"} disabled={state.markers && state.markers.length < 2} onClick={() => openRoute.getOptimizationRoute(state.markers!)}>
				Get optimization
			</Button>

		</ButtonGroup>
	)
}

export default RouteButtonsMenu