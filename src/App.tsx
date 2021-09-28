import { FC } from 'react'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import PrivateRoute from './components/routes/PrivateRoute'
import { Home, Login, Profile, Register } from './pages'
import { Footer } from './components/shared'

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Register} />
          <PrivateRoute exact path='/me' component={Profile} />
          <Route path='*' component={Home} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
