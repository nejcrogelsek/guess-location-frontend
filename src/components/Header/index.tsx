import { FC, useEffect, useState } from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import { Logo } from '../shared/Logo/styles'
import {
	MenuButtonOpen,
	MobileOverlay,
	Navbar,
	NavButtons,
	NavContainer,
} from './styles'
import MenuIcon from '../icons/MenuIcon'

const Header: FC = () => {
	const [isMobile, setIsMobile] = useState(true)
	const [toggle, setToggle] = useState(false)

	const checkIfMobile = () => {
		if (window.innerWidth < 992) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	useEffect(() => {
		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)
		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	const toggleNav = () => {
		console.log('toggle')
		setToggle(!toggle)
	}
	return (
		<>
			<Navbar>
				<NavContainer>
					<NavButtons>
						<Logo to='/' />
						<MenuButtonOpen onClick={() => toggleNav()}>
							<MenuIcon />
						</MenuButtonOpen>
					</NavButtons>
					{isMobile ? (
						<MobileNav toggleNav={toggleNav} toggle={toggle} />
					) : (
						<DesktopNav />
					)}
				</NavContainer>
			</Navbar>
			<MobileOverlay toggle={toggle} />
		</>
	)
}

export default Header
