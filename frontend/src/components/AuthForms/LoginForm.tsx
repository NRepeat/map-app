import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaUnlock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import * as yup from 'yup';
import { userLoginHandler } from "../../handlers/auth";
import useMapContext from "../../hooks/useMapContext";



const FormSchema = yup.object().shape({
	email: yup.string().required().email('Invalid email address').matches(/[.]/),
	pass: yup
		.string().required()
});


const LoginForm = ({ onOpenChange }: { onOpenChange: () => void }) => {
	const { dispatch } = useMapContext()
	const handleSubmit = async (values: {
		email: string;
		pass: string;
	}) => {
		const user = await userLoginHandler({ email: values.email, password: values.pass })
		console.log("🚀 ~ LoginForm ~ user:", user)
		if (user) {
			console.log("🚀 ~ LoginForm ~ user:", user)
			dispatch({ type: "SET_USER", user: user })
			onOpenChange()
		}
	}
	const formik = useFormik({
		initialValues: {
			email: '',
			pass: '',
		},

		onSubmit: values => {
			handleSubmit(values)
		},
		validationSchema: FormSchema
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="gap-2 flex flex-col">
				<Input autoFocus
					label="Email"
					name="email"
					id='email'
					placeholder="Enter your email"
					variant="bordered"
					type='email'
					errorMessage="Pleas input valid email"
					endContent={<IoMdMail />}
					onChange={formik.handleChange}
					value={formik.values.email} />
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
				<Button type='submit' disabled={!Object.keys(formik.errors).length ? false : true} fullWidth color={!Object.keys(formik.errors).length ? "success" : "default"} >
					Login
				</Button>
			</div>
		</form>

	)
}

export default LoginForm