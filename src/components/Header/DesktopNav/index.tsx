import { Avatar } from '@material-ui/core'
import { FC } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { UserData } from '../../../interfaces/user.interface'
import { LinkStyled } from '../../shared/Button/styles'
import { NavbarNav } from '../styles'

interface Props {
	user: UserData | null
}

const DesktopNav: FC<Props> = ({ user }: Props) => {
	const history = useHistory()

	const signout = () => {
		history.push('/')
	}

	return (
		<NavbarNav isAuth={user ? 'isAuth' : null}>
			{user ? (
				<>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/'>
							<span>Home</span>
						</NavLink>
					</li>
					<li className='nav-item'>
						<button
							className='nav-link'
							type='button'
							data-bs-toggle='modal'
							data-bs-target='#settingsModal'>
							<span>Settings</span>
						</button>
					</li>
					<li className='nav-item'>
						<button onClick={() => signout()} className='nav-link'>
							<span>Logout</span>
						</button>
					</li>
					<li className='nav-item user-item'>
						<NavLink to='/me'>
							<Avatar src={user.profile_image} />
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

export default DesktopNav
