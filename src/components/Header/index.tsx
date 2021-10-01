import { FC, useEffect, useState } from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import { IUser } from '../../interfaces/user.interface'
import { Logo } from '../shared/Logo/styles'
import {
	MenuButtonOpen,
	MobileOverlay,
	Navbar,
	NavButtons,
	NavContainer,
} from './styles'

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
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-list'
								viewBox='0 0 16 16'>
								<path
									fillRule='evenodd'
									d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
								/>
							</svg>
						</MenuButtonOpen>
					</NavButtons>
					{isMobile ? (
						<MobileNav toggleNav={toggleNav} toggle={toggle} />
					) : (
						<DesktopNav />
					)}
				</NavContainer>
			</Navbar>
			<MobileOverlay toggle={toggle ? 'open' : null} />
		</>
	)
}

export default Header
