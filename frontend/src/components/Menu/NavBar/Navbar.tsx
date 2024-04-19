import { Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'

const NavbarMenu = () => {
	return (
		<Navbar shouldHideOnScroll className='rounded-t-lg'>
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

		</Navbar>
	)
}

export default NavbarMenu