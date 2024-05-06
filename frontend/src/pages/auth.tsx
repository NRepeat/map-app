import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import LoginForm from "../components/AuthForms/LoginForm";
import RegisterForm from "../components/AuthForms/RegisterForm";
import { authHandler, userRegistrationHandler } from "../handlers/auth";
import { User } from "../types/types";

const Auth = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: () => void, }) => {
	const [isRegistration, setIsRegistration] = useState<boolean>(false)
	const [registrationData, setRegistrationData] = useState<User & {
		confirmPassword: string;
	}>()
	const [error, setError] = useState<string>()


	const handleRegistration = async () => {
		if (registrationData) {

			// if (!registrationData.confirmPassword) {
			// 	console.log("🚀 ~ handleRegistration ~ registrationData.confirmPassword :", registrationData.confirmPassword)
			// 	setError("Passwords not match")
			// } else if (!registrationData.email) {
			// 	console.log("🚀 ~ handleRegistration ~ registrationData.email:", registrationData.email)
			// 	setError("Input valid email")

			// }
			await userRegistrationHandler({ email: registrationData.email, password: registrationData.password })
		}
	}
	return (
		<div className="w-full h-full">
			<Modal className="" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">{isRegistration ? "Registration" : "Login"}</ModalHeader>
							<ModalBody>
								{isRegistration && <RegisterForm setRegistrationData={setRegistrationData} error={error} />}
								{!isRegistration && <LoginForm />}
							</ModalBody>
							<ModalFooter className="justify-center flex-col">
								{!isRegistration && <>
									<Button onClick={() => handleRegistration()} fullWidth color="success" >
										Login
									</Button>
									<Button color="default" onClick={() => setIsRegistration(true)} variant="flat" >
										Registration
									</Button>
									<Button color="primary" onClick={authHandler} startContent={<FaGoogle />}>
										Sign in wit Google
									</Button>
								</>}
								{isRegistration && <>
									<Button fullWidth onClick={() => handleRegistration()} color="success" >
										Sign up
									</Button>
									<Button color="default" onClick={() => setIsRegistration(false)} variant="flat" >
										Login in
									</Button>
									<Button color="primary" onClick={authHandler} startContent={<FaGoogle />}>
										Sign up Google
									</Button>
								</>}

							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}

export default Auth