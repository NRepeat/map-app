import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { useState } from 'react';
import { authHandler } from '../../../handlers/auth';

const NavbarMapMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoginIn, setIsLoginIn] = useState(false);
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


	return (
		<Navbar isBlurred={false} shouldHideOnScroll isBordered className='rounded-t-lg'
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent justify="start">
				<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#" >
						Openrouteservice
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link color="foreground" href="#" aria-current="page">
						Mapbox
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						OSRM
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">


				{isLoginIn ? <NavbarContent justify="end">
					<Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name="Jason Hughes"
								size="sm"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions" color='primary' >
							<DropdownItem key="new">New file</DropdownItem>
							<DropdownItem key="copy">Copy link</DropdownItem>
							<DropdownItem key="edit">Edit file</DropdownItem>
							<DropdownItem key="delete" className="text-danger" color="danger">
								Delete file
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent> : <NavbarItem>
					<Button onClick={() => authHandler()} className='bg-emerald-700' as={Link} href="#" variant="bordered">
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
	)
}

export default NavbarMapMenu