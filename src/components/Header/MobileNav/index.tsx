import { Avatar } from '@material-ui/core'
import { FC } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { IUser } from '../../../interfaces/user.interface'
import { LinkStyled } from '../../shared/Button/styles'
import { MenuButtonClose, NavMobile, NavButtons, NavbarNav } from '../styles'

interface Props {
	user: IUser | null
	toggleNav: () => void
	toggle: boolean
}

const MobileNav: FC<Props> = ({ user, toggleNav, toggle }: Props) => {
	const history = useHistory()

	const signout = () => {
		toggleNav()
		history.push('/')
	}

	return (
		<NavMobile toggle={toggle ? 'open' : null}>
			<div>
				<NavButtons reverse='true'>
					<MenuButtonClose onClick={() => toggleNav()}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							className='bi bi-x'
							viewBox='0 0 16 16'>
							<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
						</svg>
					</MenuButtonClose>
				</NavButtons>
				<NavbarNav isAuth={user ? 'isAuth' : null}>
					{user ? (
						<>
							<li className='nav-item user-item'>
								<NavLink to='/me' onClick={() => toggleNav()}>
									<Avatar src={user.profile_image} />
									<span className='auth-user'>John Scott</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/' onClick={() => toggleNav()}>
									<span>Home</span>
									<svg
										width='9'
										height='16'
										viewBox='0 0 9 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M2.09247 15.9979C1.82603 15.9985 1.56782 15.9057 1.36266 15.7357C1.24719 15.6399 1.15174 15.5224 1.08178 15.3897C1.01182 15.257 0.968721 15.1118 0.95495 14.9625C0.94118 14.8131 0.95701 14.6625 1.00153 14.5193C1.04606 14.3761 1.1184 14.243 1.21442 14.1278L6.32309 8.01564L1.39687 1.89208C1.30215 1.77543 1.23141 1.64122 1.18873 1.49715C1.14604 1.35308 1.13225 1.202 1.14815 1.05259C1.16404 0.90317 1.20931 0.75837 1.28135 0.626506C1.35339 0.494642 1.45078 0.378315 1.56792 0.284212C1.6859 0.180401 1.82407 0.102097 1.97375 0.0542161C2.12344 0.00633482 2.2814 -0.0100901 2.43773 0.00597127C2.59406 0.0220327 2.74539 0.070234 2.88221 0.14755C3.01903 0.224867 3.13839 0.329629 3.2328 0.455262L8.74058 7.29723C8.9083 7.50127 8.99999 7.75721 8.99999 8.02134C8.99999 8.28547 8.9083 8.54141 8.74058 8.74545L3.03894 15.5874C2.92455 15.7254 2.77923 15.8345 2.61478 15.9058C2.45034 15.9772 2.27139 16.0087 2.09247 15.9979Z'
											fill='black'
										/>
									</svg>
								</NavLink>
							</li>
							<li className='nav-item'>
								<button onClick={() => signout()} className='nav-link'>
									<span>Logout</span>
									<svg
										width='9'
										height='16'
										viewBox='0 0 9 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M2.09247 15.9979C1.82603 15.9985 1.56782 15.9057 1.36266 15.7357C1.24719 15.6399 1.15174 15.5224 1.08178 15.3897C1.01182 15.257 0.968721 15.1118 0.95495 14.9625C0.94118 14.8131 0.95701 14.6625 1.00153 14.5193C1.04606 14.3761 1.1184 14.243 1.21442 14.1278L6.32309 8.01564L1.39687 1.89208C1.30215 1.77543 1.23141 1.64122 1.18873 1.49715C1.14604 1.35308 1.13225 1.202 1.14815 1.05259C1.16404 0.90317 1.20931 0.75837 1.28135 0.626506C1.35339 0.494642 1.45078 0.378315 1.56792 0.284212C1.6859 0.180401 1.82407 0.102097 1.97375 0.0542161C2.12344 0.00633482 2.2814 -0.0100901 2.43773 0.00597127C2.59406 0.0220327 2.74539 0.070234 2.88221 0.14755C3.01903 0.224867 3.13839 0.329629 3.2328 0.455262L8.74058 7.29723C8.9083 7.50127 8.99999 7.75721 8.99999 8.02134C8.99999 8.28547 8.9083 8.54141 8.74058 8.74545L3.03894 15.5874C2.92455 15.7254 2.77923 15.8345 2.61478 15.9058C2.45034 15.9772 2.27139 16.0087 2.09247 15.9979Z'
											fill='black'
										/>
									</svg>
								</button>
							</li>
						</>
					) : (
						<>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/' onClick={() => toggleNav()}>
									<span>Home</span>
									<svg
										width='9'
										height='16'
										viewBox='0 0 9 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M2.09247 15.9979C1.82603 15.9985 1.56782 15.9057 1.36266 15.7357C1.24719 15.6399 1.15174 15.5224 1.08178 15.3897C1.01182 15.257 0.968721 15.1118 0.95495 14.9625C0.94118 14.8131 0.95701 14.6625 1.00153 14.5193C1.04606 14.3761 1.1184 14.243 1.21442 14.1278L6.32309 8.01564L1.39687 1.89208C1.30215 1.77543 1.23141 1.64122 1.18873 1.49715C1.14604 1.35308 1.13225 1.202 1.14815 1.05259C1.16404 0.90317 1.20931 0.75837 1.28135 0.626506C1.35339 0.494642 1.45078 0.378315 1.56792 0.284212C1.6859 0.180401 1.82407 0.102097 1.97375 0.0542161C2.12344 0.00633482 2.2814 -0.0100901 2.43773 0.00597127C2.59406 0.0220327 2.74539 0.070234 2.88221 0.14755C3.01903 0.224867 3.13839 0.329629 3.2328 0.455262L8.74058 7.29723C8.9083 7.50127 8.99999 7.75721 8.99999 8.02134C8.99999 8.28547 8.9083 8.54141 8.74058 8.74545L3.03894 15.5874C2.92455 15.7254 2.77923 15.8345 2.61478 15.9058C2.45034 15.9772 2.27139 16.0087 2.09247 15.9979Z'
											fill='black'
										/>
									</svg>
								</NavLink>
							</li>
							<li className='nav-item'>
								<LinkStyled
									to='/signup'
									size='full'
									color='green'
									onClick={() => toggleNav()}>
									Sign up
								</LinkStyled>
							</li>
							<li className='nav-item'>
								<LinkStyled to='/login' size='full' onClick={() => toggleNav()}>
									Login
								</LinkStyled>
							</li>
						</>
					)}
				</NavbarNav>
			</div>
		</NavMobile>
	)
}

export default MobileNav
