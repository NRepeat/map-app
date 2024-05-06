import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { FaCamera } from 'react-icons/fa'
import { logout } from '../../handlers/auth'
import useMapContext from '../../hooks/useMapContext'
const UserCard = () => {
	const { state } = useMapContext()

	return (
		<Card shadow="none" radius='md' className="max-w-[300px] ">
			<CardHeader className="justify-between">
				<div className="flex gap-3">
					<Avatar className='object-cover' showFallback fallback={<FaCamera />} src={state.user?.avatar} />
					<div className="flex flex-col items-start justify-center">
						<h4 className="text-small font-semibold leading-none text-default-600">{state.user?.name}</h4>
					</div>
				</div>
			</CardHeader>
			<CardBody className="px-3 py-0 flex gap-2">
				<Button size='sm' variant='ghost' color='default'>Profile</Button>
				<Button size='sm' variant='solid' color='primary'>Saved</Button>
				<Button onClick={logout} size='sm' variant='flat' color='danger'>Logout</Button>
			</CardBody>
			<CardFooter className="gap-3">

			</CardFooter>
		</Card>
	)
}

export default UserCard