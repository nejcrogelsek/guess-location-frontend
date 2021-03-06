import { FC, useEffect } from 'react'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import PrivateRoute from './components/routes/PrivateRoute'
import { Home, Login, Profile, Register } from './pages'
import { observer } from 'mobx-react-lite'
import userStore from './stores/user.store'
import { accessTokenFC, refreshTokenFC } from './api/auth.actions'
import { loadMapApi } from './utils/GoogleMapsUtils'

const App: FC = () => {
	const checkIfAccessTokenExists = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			const res = await accessTokenFC(token)
			if (res.data) {
				userStore.login(res.data)
				await checkForRefreshToken()
			}
		}
	}

	const checkForRefreshToken = async () => {
		if (localStorage.getItem('user')) {
			const payload = JSON.parse(getPayload())
			const expiration = new Date(payload.exp)
			const now = new Date()
			const minutes = 1000 * 60 * 14

			if (expiration.getTime() - now.getTime() < minutes) {
				const token: string | null = localStorage.getItem('user')
				if (token) {
					const res = await refreshTokenFC(payload.name, payload.sub, token)
					if (res.data) {
						localStorage.setItem('user', res.data.access_token)
					}
				}
			}
		}
	}

	const getPayload = () => {
		const token: string = localStorage.getItem('user')!
		return atob(token.split('.')[1])
	}

	useEffect(() => {
		checkIfAccessTokenExists()
		const interval = setInterval(() => {
			checkForRefreshToken()
		}, 1000 * 60 * 14)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const googleMapScript = loadMapApi()
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Register} />
					<PrivateRoute exact path='/me' component={Profile} />
					<Route path='*' component={Login} />
				</Switch>
			</Router>
		</ThemeProvider>
	)
}

export default observer(App)
