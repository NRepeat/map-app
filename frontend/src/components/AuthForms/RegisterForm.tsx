import { Input } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react'
import { FaLock, FaUnlock } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { User } from '../../types/types'

type RegistrationFormTypes = {
	setRegistrationData: (data: User & {
		confirmPassword: string;
	}) => void
	error?: string
}

const RegisterForm: FC<RegistrationFormTypes> = ({ setRegistrationData, error }) => {

	const [email, setEmail] = useState<string>()
	const [password, setPassword] = useState<string>()
	const [confirmPassword, setConfirmPassword] = useState<string>()


	useEffect(() => {
		if (password && confirmPassword && email)
			setRegistrationData({ email: email, password, confirmPassword })
	}, [email, password, confirmPassword])
	return (
		<div className="gap-2 flex flex-col">
			<Input onChange={(e) => setEmail(e.target.value)} autoFocus label="Email"
				placeholder="Enter your email"
				variant="bordered" type='email' errorMessage="Pleas input valid email" endContent={<IoMdMail />} />
			<Input
				onChange={(e) => setPassword(e.target.value)}
				endContent={
					<FaUnlock />
				}
				label="Password"
				min={8}
				placeholder="Enter your password"
				type="password"
				variant="bordered" />
			<Input endContent={
				<FaLock />
			}
				isInvalid={!!error}
				errorMessage={error && "Password not match"}
				onChange={(e) => setConfirmPassword(e.target.value)}
				label="Confirm password"
				placeholder="Confirm your password"
				type="password"
				variant="bordered" />
		</div>
	)
}

export default RegisterForm