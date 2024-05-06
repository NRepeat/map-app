import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import LoginForm from "../components/AuthForms/LoginForm";
import RegisterForm from "../components/AuthForms/RegisterForm";
import { authHandler } from "../handlers/auth";

const Auth = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: () => void, }) => {
	const [isRegistration, setIsRegistration] = useState<boolean>(false)





	return (
		<div className="w-full h-full">
			<Modal className="" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">{isRegistration ? "Registration" : "Login"}</ModalHeader>
							<ModalBody className="justify-center flex-col">
								{isRegistration && <RegisterForm />}
								{!isRegistration && <LoginForm />}
							</ModalBody>
							<ModalFooter className="justify-center flex-col">
								{!isRegistration && <>
									<Button color="default" onClick={() => setIsRegistration(true)} variant="flat" >
										Registration
									</Button>
									<Button color="primary" onClick={authHandler} startContent={<FaGoogle />}>
										Sign in wit Google
									</Button>
								</>}
								{isRegistration && <>

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