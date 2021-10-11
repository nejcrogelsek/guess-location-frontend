import { Avatar } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import locationStore from '../../../stores/location.store'
import userStore from '../../../stores/user.store'
import { LinkStyled } from '../../shared/Button/styles'
import { NavbarNav } from '../styles'

const DesktopNav: FC = () => {
	const history = useHistory()

	const signout = () => {
		localStorage.removeItem('user')
		userStore.logout()
		locationStore.logout()
		history.push('/')
	}

	return (
		<NavbarNav isAuth={userStore.user && 'isAuth'}>
			{userStore.user ? (
				<>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/'>
							<span>Home</span>
						</NavLink>
					</li>
					<li className='nav-item'>
						<button onClick={() => signout()} className='nav-link'>
							<span>Logout</span>
						</button>
					</li>
					<li className='nav-item user-item'>
						<NavLink to='/me'>
							<Avatar src={userStore.user.profile_image} />
						</NavLink>
					</li>
				</>
			) : (
				<>
					<li className='nav-item login'>
						<NavLink to='/login'>Sign in</NavLink>
					</li>
					<li className='delimeter'>or</li>
					<li className='nav-item signup'>
						<LinkStyled to='/signup' color='green'>
							Sign up
						</LinkStyled>
					</li>
				</>
			)}
		</NavbarNav>
	)
}

export default observer(DesktopNav)
