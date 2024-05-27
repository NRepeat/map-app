import { Avatar, Button, Link, Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import useMapContext from '../../../hooks/useMapContext';
import Auth from '../../../pages/auth';
import UserCard from '../../UserCard/UserCard';

const NavbarMapMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { state, dispatch } = useMapContext()
	const [isLoginIn, setIsLoginIn] = useState<boolean>(false);
	const { isOpen, onOpenChange, onOpen } = useDisclosure();
	// if (state.user) {
	// 	if (state.user.avatar) {
	// 		fetch(state.user!.avatar!).then(data => data.json())
	// 	}
	// }
	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];

	useEffect(() => {
		if (state.user) {
			setIsLoginIn(true)
		}
	}, [state.user])
	return (
		<>
			{isOpen && <Auth isOpen={isOpen} onOpenChange={onOpenChange} />}
			<Navbar isBlurred={false} shouldHideOnScroll isBordered
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
			>
				{/* <NavbarContent justify="start">
				<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
			</NavbarContent> */}
				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem>
						<Link onClick={() => dispatch({ type: "SET_IS_OPEN_ROUTE_INSTRUCTION", isOpenRouteInstruction: false })}>
							<span className='text-2xl text-left font-bold text-emerald-700'>NN</span><span className='text-xl text-left font-bold text-white'>MAP</span>
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify="end">
					{isLoginIn && state.user ? <NavbarContent justify="end">
						<Popover placement="bottom" color='default'>
							<PopoverTrigger>
								{/* <User
									name={state.user?.name?.slice(20)}
									className='max-w-[120px]'
									avatarProps={{
										src: state.user?.avatar
									}}
								/> */}
								<div className='inline-flex  items-center gap-1 flex-row-reverse'>
									<Avatar className='object-cover cursor-pointer' showFallback fallback={<FaCamera />} src={state.user.avatar} />
									{/* <p className='max-w-[90px] truncate  line-clamp-1'>{state.user?.name}</p> */}
								</div>
							</PopoverTrigger>
							<PopoverContent className='bg-[#313134] rounded-md'>
								<UserCard />
							</PopoverContent>
						</Popover>
					</NavbarContent> : <NavbarItem>
						<Button onClick={() => onOpen()} className='bg-emerald-700' as={Link} href="#" variant="bordered">
							Sign Up
						</Button>
					</NavbarItem>}
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								className="w-full"
								color={
									index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
								}
								href="#"
								size="lg"
							>
								{item}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
		</>

	)
}

export default NavbarMapMenu