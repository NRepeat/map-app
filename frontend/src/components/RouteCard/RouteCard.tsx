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
	const options = route.options && Object.keys(route.options).join(",")

	const handleSelectRoute = () => {
		console.log("🚀 ~ handleSelectRoute ~ route.id:", route.id)

		dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: route.id });
	}

	return (
		<Card onClick={() => handleSelectRoute()} className={` border-2 transition-border duration-500 ${isSelected ? 'border-emerald-500' : 'border-gray-300 border-opacity-0'} hover:border-emerald-500 hover:border-2`}>
			<CardHeader className='justify-between items-center'>
				{route.name ? route.name : `${i + 1}:Route`}
				<div className='flex items-center'>
					{user && isSelected && <Button isIconOnly color='primary' variant='light'><VscSave className='w-5 h-5' /></Button>}
					{selectedRouteId && selectedRouteId === route.id && <Button variant='light' color='success'>
						Route instruction
					</Button>}
				</div>

			</CardHeader>
			<CardBody>
				{options}
			</CardBody>
			<CardFooter>
				<FilterDistance distance={route.properties.summary.distance} />
				<FilterTime time={route.properties.summary.duration} />
			</CardFooter>
		</Card>

	)
}

export default RouteCard