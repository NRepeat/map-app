import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { VscChromeClose } from 'react-icons/vsc'
import useMapContext from '../../../hooks/useMapContext'
import { RouteInstruction } from '../../../types/types'
import { RouteInstruction as RouteInstructionSteps } from '../../RouteInstruction/RouteInstruction'

const RouteInstructionsCard = ({ selectedRouteInstruction }: {
	selectedRouteInstruction: RouteInstruction
}) => {
	const { state, dispatch } = useMapContext()



	const handelOpenRouteInstructions = () => {
		dispatch({ type: "SET_IS_OPEN_ROUTE_INSTRUCTION", isOpenRouteInstruction: false })
	}
	return (
		<Card radius="none" className=" flex-col   min-h-full  flex-grow   rounded-br-md">
			<CardHeader className='justify-between'>
				Route name <Button onClick={handelOpenRouteInstructions} isIconOnly variant='light' color='danger'> <VscChromeClose className='w-5 h-5' /></Button>
			</CardHeader>
			<CardBody>
				<RouteInstructionSteps steps={selectedRouteInstruction} />
			</CardBody>
		</Card>
	)
}

export default RouteInstructionsCard