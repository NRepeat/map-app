import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import { FaLock, FaUnlock } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import * as yup from 'yup'
import { userRegistrationHandler } from '../../handlers/auth'


const FormSchema = yup.object().shape({
	email: yup.string(),
	pass: yup
		.string()
		.min(8, 'Password must be 8 characters long')
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[^\w]/, 'Password requires a symbol'),
	confirm: yup
		.string()
		.oneOf([yup.ref('pass')], 'Must match "password" field value'),
});

const RegisterForm = ({ onOpenChange }: { onOpenChange: () => void }) => {

	const formik = useFormik({
		initialValues: {
			email: '',
			pass: '',
			confirm: '',
		},

		onSubmit: values => {
			userRegistrationHandler({ email: values.email, password: values.pass })
		},
		validationSchema: FormSchema
	});

	return (

		<form onSubmit={formik.handleSubmit}>
			<div className="gap-2 flex flex-col">
				<Input
					autoFocus
					label="Email"
					name="email"
					id='email'
					placeholder="Enter your email"
					variant="bordered"
					type='email'
					errorMessage="Pleas input valid email"
					endContent={<IoMdMail />}
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				<Input
					value={formik.values.pass}
					id='pass'
					name="pass"
					onChange={formik.handleChange}
					endContent={
						<FaUnlock />
					}
					label="Password"
					min={8}
					isInvalid={!!formik.errors.pass}
					errorMessage={formik.errors.pass}
					placeholder="Enter your password"
					type="password"
					variant="bordered" />
				<Input
					id="confirm"
					name="confirm"
					endContent={
						<FaLock />
					}
					isInvalid={!!formik.errors.confirm}
					errorMessage={formik.errors.confirm}
					onChange={formik.handleChange}
					value={formik.values.confirm}
					label="Confirm password"
					placeholder="Confirm your password"
					type="password"
					variant="bordered" />
				<Button type='submit' disabled={!Object.keys(formik.errors).length ? false : true} fullWidth color={!Object.keys(formik.errors).length ? "success" : "default"} >
					Sign up
				</Button>
			</div>

		</form>

	)
}

export default RegisterForm