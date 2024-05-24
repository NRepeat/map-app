import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import useMapContext from '../../hooks/useMapContext'
import { RouteType } from '../../types/types'
import FilterDistance from '../FilterDistance/FilterDistance'
import FilterTime from '../FilterTime/FilterTime'

const RouteCard = ({ route, i }: { route: RouteType, i: number }) => {
	const { state } = useMapContext()
	const { selectedRouteId, user } = state
	const isSelected = selectedRouteId && selectedRouteId === route.id;
	const options = route.options && Object.keys(route.options).join(",")
	return (
		<Card className={` border-2 transition-border duration-500 ${isSelected ? 'border-emerald-400' : 'border-gray-300'} hover:border-emerald-400 hover:border-2`}>
			<CardHeader>
				{route.name ? route.name : `${i + 1}:Route`}
				{selectedRouteId && selectedRouteId === route.id && <Button variant='light' color='success'>
					Route instruction
				</Button>}
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