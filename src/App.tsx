import { FC, useEffect } from 'react'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import PrivateRoute from './components/routes/PrivateRoute'
import { Home, Login, Profile, Register } from './pages'
import { observer } from 'mobx-react-lite'
import userStore from './stores/user.store'
import axios from './api/axios'

const App: FC = () => {
	const checkIfAccessTokenExists = async () => {
		const token: string | null = localStorage.getItem('user')
		if (token) {
			await axios
				.get('/auth/protected', { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					userStore.login(res.data)
					checkForRefreshToken()
				})
				.catch((err) => {
					console.error('ERROR MESSAGE: ', err)
				})
		}
	}

	const checkForRefreshToken = () => {
		if (localStorage.getItem('user')) {
			const payload = JSON.parse(getPayload())
			const expiration = new Date(payload.exp)
			const now = new Date()
			const minutes = 1000 * 60 * 14

			if (expiration.getTime() - now.getTime() < minutes) {
				axios
					.post('/auth/refresh-token', { name: payload.name, sub: payload.sub })
					.then((res) => {
						localStorage.setItem('user', res.data.access_token)
					})
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
