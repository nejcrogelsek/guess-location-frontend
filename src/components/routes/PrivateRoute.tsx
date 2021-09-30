import { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
	component: any
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
	const userValue = false

	return (
		<Route
			{...rest}
			render={(props) =>
				userValue ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

export default PrivateRoute
