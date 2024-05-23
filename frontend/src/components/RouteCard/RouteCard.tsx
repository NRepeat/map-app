import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { RouteType } from '../../types/types'
import FilterDistance from '../FilterDistance/FilterDistance'
import FilterTime from '../FilterTime/FilterTime'

const RouteCard = ({ route, i }: { route: RouteType, i: number }) => {

	const options = route.options && Object.keys(route.options).join(",")
	return (
		<Card>
			<CardHeader>
				{route.name ? route.name : `${i + 1}:Route`}
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