import { Avatar } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import locationStore from '../../../stores/location.store'
import userStore from '../../../stores/user.store'
import ArrowRightIcon from '../../icons/ArrowRight'
import CloseIcon from '../../icons/CloseIcon'
import { LinkStyled } from '../../shared/Button/styles'
import { MenuButtonClose, NavMobile, NavButtons, NavbarNav } from '../styles'

interface Props {
	toggleNav: () => void
	toggle: boolean
}

const MobileNav: FC<Props> = ({ toggleNav, toggle }: Props) => {
	const history = useHistory()

	const signout = () => {
		localStorage.removeItem('user')
		userStore.logout()
		locationStore.logout()
		toggleNav()
		history.push('/')
	}

	return (
		<NavMobile toggle={toggle}>
			<div>
				<NavButtons reverse={true}>
					<MenuButtonClose onClick={() => toggleNav()}>
						<CloseIcon />
					</MenuButtonClose>
				</NavButtons>
				<NavbarNav isAuth={userStore.user && true}>
					{userStore.user ? (
						<>
							<li className='nav-item user-item'>
								<NavLink to='/me' onClick={() => toggleNav()}>
									<Avatar src={userStore.user.profile_image} />
									<span className='auth-user'>
										{userStore.user.first_name} {userStore.user.last_name}
									</span>
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/' onClick={() => toggleNav()}>
									<span>Home</span>
									<ArrowRightIcon />
								</NavLink>
							</li>
							<li className='nav-item'>
								<button onClick={() => signout()} className='nav-link'>
									<span>Logout</span>
									<ArrowRightIcon />
								</button>
							</li>
						</>
					) : (
						<>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/' onClick={() => toggleNav()}>
									<span>Home</span>
									<ArrowRightIcon />
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

export default observer(MobileNav)
