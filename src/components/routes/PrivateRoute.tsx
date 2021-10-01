import { FC } from 'react'
import {
	Route,
	Redirect,
	RouteProps,
	RouteComponentProps,
} from 'react-router-dom'
import userStore from '../../stores/user.store'

interface Props extends RouteProps {
	component: FC<RouteComponentProps>
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				userStore.user ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

export default PrivateRoute
