import { Input } from "@nextui-org/react"
import { FaLock } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

const LoginForm = () => {
	return (
		<div className="gap-2 flex flex-col">
			<Input autoFocus label="Email"
				placeholder="Enter your email"
				variant="bordered" endContent={<IoMdMail />} />
			<Input endContent={
				<FaLock />
			}
				label="Password"
				placeholder="Enter your password"
				type="password"
				variant="bordered" />
		</div>
	)
}

export default LoginForm