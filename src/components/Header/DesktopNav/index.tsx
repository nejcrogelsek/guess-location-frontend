import { Avatar } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { FC } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

interface Props {
    user: any;
    setUserValue: any;
    setQuoteValue: any;
}

const DesktopNav: FC<Props> = ({ user, setUserValue, setQuoteValue }: Props) => {
    const history = useHistory();

    const signout = () => {
        localStorage.removeItem('user');
        setUserValue(null);
        setQuoteValue(null);
        history.push('/');
    }

    return (
        <ul className={user ? 'navbar-nav isAuth' : 'navbar-nav'}>
            {user ?
                <>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/' >
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <button className='nav-link' type='button' data-bs-toggle='modal' data-bs-target='#settingsModal'>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={() => signout()} className='nav-link' >
                            <span>Logout</span>
                        </button>
                    </li>
                    <li className='nav-item user-item'>
                        <NavLink to='/me'>
                            <Avatar src={user.profile_image} />
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <button className='add-quote' type='button' data-bs-toggle='modal' data-bs-target='#addQuoteModal'>
                            <Add />
                        </button>
                    </li>
                </> :
                <>
                    <li className='nav-item'>
                        <NavLink className='btn site-btn btn-orange' to='/signup' >Sign up</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='btn site-btn btn-light' to='/login' >Login</NavLink>
                    </li>
                </>
            }
        </ul>
    )
}

export default DesktopNav
