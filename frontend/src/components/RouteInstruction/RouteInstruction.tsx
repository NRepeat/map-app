import FilterDistance from "../FilterDistance/FilterDistance"
import FilterTime from "../FilterTime/FilterTime"
import RouteInstructionCard from "./Card/Card"

export const RouteInstruction = ({ steps }: { steps: any }) => {

	return (<>
		<div className=" flex flex-col   overflow-auto ">
			<div>
				{steps && <div className=" ">
					<div className="  flex flex-col gap-4">
						{steps.steps.map((step: any, i: number) =>
							<RouteInstructionCard key={i} step={step} />
						)}
					</div>
				</div>}
			</div>
		</div>
	</>)
}

export const TotalRouteInformation = ({ steps }: { steps: any }) => {


	return (<div  >
		<div className="inline-flex w-full flex-nowrap gap-1">
			<strong><p>Total time:</p></strong>
			<FilterTime time={steps.totalDistance.duration} />

		</div>
		<div className="inline-flex w-full flex-nowrap gap-1">
			<strong>Total distance:</strong>
			<strong> <FilterDistance distance={steps.totalDistance.distance} /></strong>
		</div>
	</div>)
}