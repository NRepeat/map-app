import { Card, CardBody } from '@nextui-org/react'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { Instruction } from '../../types/types'
import { getInstructionByType } from '../../utils/instructionTypes'

const PopupCard = ({ instruction }: { instruction: Instruction }) => {
	const { Instruction: InstructionIcon, instructionText } = getInstructionByType(instruction.type)
	return (
		<div className='flex flex-col items-center relative'>
			<Card className='min-w-[150px] min-h-[50px] z-40'>
				<CardBody className='inline-flex flex-row  gap-4 items-center'  >
					<p className='text-base text-balance max-w-[200px]'>
						{instruction.instruction}
					</p>
					<div className='flex flex-col  items-center justify-evenly gap-4'>
						<p className='text-lg text-balance text-emerald-600'>
							{instructionText}
						</p>
						<InstructionIcon className='w-7 h-7 fill-emerald-500' />
					</div>
				</CardBody>
			</Card>
			<div className='absolute bottom-[-60px]'>
				<MdOutlineArrowDropDown className='fill-emerald-500 w-28 h-28' />

			</div>
		</div>

	)
}

export default PopupCard