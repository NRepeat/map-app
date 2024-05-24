import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { VscSave } from 'react-icons/vsc'
import useMapContext from '../../hooks/useMapContext'
import { RouteType } from '../../types/types'
import FilterDistance from '../FilterDistance/FilterDistance'
import FilterTime from '../FilterTime/FilterTime'

const RouteCard = ({ route, i }: { route: RouteType, i: number }) => {
	const { state, dispatch } = useMapContext()
	const { selectedRouteId, user } = state
	const isSelected = selectedRouteId && selectedRouteId === route.id;
	const options = route.options && route.options

	const handelOpenRouteInstructions = () => {
		dispatch({ type: "SET_IS_OPEN_ROUTE_INSTRUCTION", isOpenRouteInstruction: true })
	}
	const handleSelectRoute = () => {
		if (isSelected) {
			return handelOpenRouteInstructions()
		}
		dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: route.id });
	}

	return (
		<div onClick={handleSelectRoute} onMouseOver={() => dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: route.id })} className='cursor-pointer'>
			<Card className={` border-2 transition-border duration-500 ${isSelected ? 'border-emerald-500' : 'border-gray-300 border-opacity-0'} hover:border-emerald-500 hover:border-2`}>
				<CardHeader className='justify-between items-center'>
					<p className='text-lg'>
						{route.name ? route.name : `${i + 1}:Route`}
					</p>
					<div className='flex items-center min-h-[64px]'>
						{user && isSelected &&
							<Button isIconOnly color='primary' variant='light'><VscSave className='w-5 h-5' /></Button>}
						{selectedRouteId && selectedRouteId === route.id &&
							<Button onClick={handelOpenRouteInstructions} variant='light' color='success'>
								Route instruction
							</Button>}
					</div>
				</CardHeader>
				<CardBody>
					{options?.avoid_features?.join(",")}
					{options?.preference?.join(",")}
					{options?.maximum_speed}
					{options?.units}
					{options?.continue_straight}
				</CardBody>
				<CardFooter>
					<FilterDistance distance={route.properties.summary.distance} />
					<FilterTime time={route.properties.summary.duration} />
				</CardFooter>
			</Card>
		</div>


	)
}

export default RouteCard