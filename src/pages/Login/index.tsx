import { FC } from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import Header from '../../components/Header'
import {
	LoginRegisterWrap,
	LoginRegisterTitle,
	LoginRegisterContentWrap,
	LoginRegisterContainer,
	LoginRegisterDesktopBackground,
} from '../../components/shared/LoginRegister/styles'
import { Logo } from '../../components/shared/Logo/styles'
import BackgroundImage from '../../assets/images/background.png'
import LogoCharIcon from '../../components/icons/LogoCharIcon'

const Login: FC = () => {
	return (
		<LoginRegisterContainer>
			<Header />
			<LoginRegisterWrap>
				<LoginRegisterContentWrap>
					<Logo to='/' />
					<LoginRegisterTitle>Sign in</LoginRegisterTitle>
					<p>Welcome back to Geotagger. We are glad that you are back.</p>
					<LoginForm />
				</LoginRegisterContentWrap>
				<LoginRegisterDesktopBackground image={BackgroundImage}>
					<LogoCharIcon />
				</LoginRegisterDesktopBackground>
			</LoginRegisterWrap>
		</LoginRegisterContainer>
	)
}

export default Login
