import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import FilterDistance from '../../FilterDistance/FilterDistance'

const RouteInstructionCard = ({ step }: { step: any }) => {
	return (
		<Card className=" p-1 border rounded-lg  border-emerald-400">
			<CardHeader className="flex gap-3">
				<div className="flex flex-col">
					<strong><p> {step.instruction}</p> </strong>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<strong>
					<p>Distance</p>
				</strong>	<FilterDistance distance={step.distance} />
			</CardBody>
		</Card>
	)
}

export default RouteInstructionCard