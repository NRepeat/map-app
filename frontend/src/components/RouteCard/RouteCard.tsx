import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { FaRoute } from 'react-icons/fa'
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
	console.log(route)
	const handelOpenRouteInstructions = () => {
		dispatch({ type: "SET_IS_OPEN_ROUTE_INSTRUCTION", isOpenRouteInstruction: true })
	}
	const handleSelectRoute = () => {
		if (isSelected) {
			return handelOpenRouteInstructions()
		}
		dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: route.id });
	}
	const handleSaveRoute = () => {
		dispatch({ type: "SAVE_ROUTE", selectedRouteId: route.id });
	}
	return (
		<div onClick={handleSelectRoute} onMouseOver={() => dispatch({ type: "SET_SELECTED_ROUTE_ID", selectedRouteId: route.id })} className='cursor-pointer'>
			<Card className={` border-2 transition-border duration-500 ${isSelected ? 'border-emerald-500' : 'border-gray-300 border-opacity-0'} hover:border-emerald-500 hover:border-2`}>
				<CardHeader className='justify-between items-center'>
					<p className='text-lg'>
						{route.name ? <>
							<span className='text-emerald-400 text-xl'>Route:</span>
							<span>{route.name}</span>
						</> : `${i + 1}:Route`}
					</p>
					<div className='flex items-center min-h-[64px] flex-col-reverse '>
						{user && isSelected &&
							<Button className='text-lg' fullWidth color='primary' onClick={handleSaveRoute} variant='light'>Save Route<VscSave className='w-5 h-5' /></Button>}
						{selectedRouteId && selectedRouteId === route.id &&
							<Button className='text-lg' fullWidth onClick={handelOpenRouteInstructions} variant='light' color='success'>
								Route instruction <FaRoute className='w-5 h-5' />
							</Button>}
					</div>
				</CardHeader>
				<CardBody className=''>
					<p className='text-xl text-purple-400'>Options</p>
					<div className='flex pt-2 pl-0.5  text-lg  justify-between w-full text-balance'>
						<div className='flex flex-col w-full  font-light'>
							<span className=''>
								{options?.avoid_features?.join(",") && <div className='capitalize flex flex-row gap-0.5 flex-wrap'>
									• Avoid:   {options?.avoid_features?.map((f, i: number) => <span className=''>{f}{i !== options?.avoid_features!.length - 1 && ","}</span>)}
								</div>}
							</span>
							<span >
								•	Preference: <span className='capitalize'>  {options?.preference}</span>
							</span>
							<span>

								{options?.maximum_speed && <>
									• Maximum speed: {options?.maximum_speed} km/h
								</>}
							</span>
						</div>
						<div className='flex flex-col w-full pl-2'>
							<span className='pl-4'>
								• Units:{options?.units}
							</span>
							<span className='pl-4'>
								{options?.continue_straight && <span>
									• Continue straight
								</span>}
							</span>
						</div>
					</div>
				</CardBody>
				<CardFooter className='text-lg flex-row justify-between'>
					<p className='flex w-full'>
						Total distance:
						<span className='text-emerald-400 font-bold pl-1.5'>
							<FilterDistance distance={route.properties.summary.distance} units={options?.units} />
						</span>
					</p>
					<p className='flex w-full'>
						Duration:
						<span className='font-bold text-purple-400 pl-1.5'>
							<FilterTime time={route.properties.summary.duration} />
						</span>
					</p>
				</CardFooter>
			</Card>
		</div>


	)
}

export default RouteCard