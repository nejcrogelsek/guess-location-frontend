import { FC } from 'react'
import RegisterForm from '../../components/Forms/RegisterForm'
import Header from '../../components/Header'
import {
	LoginRegisterContainer,
	LoginRegisterContentWrap,
	LoginRegisterDesktopBackground,
	LoginRegisterTitle,
	LoginRegisterWrap,
} from '../../components/shared/LoginRegister/styles'
import { Logo } from '../../components/shared/Logo/styles'
import BackgroundImage from '../../assets/images/background.png'
import LogoCharIcon from '../../components/icons/LogoCharIcon'

const Register: FC = () => {
	return (
		<LoginRegisterContainer>
			<Header />
			<LoginRegisterWrap isRegister={true}>
				<LoginRegisterContentWrap isRegister={true}>
					<Logo to='/' />
					<LoginRegisterTitle>Sign up</LoginRegisterTitle>
					<p>Your name will appear on posts and your public profile.</p>
					<RegisterForm />
				</LoginRegisterContentWrap>
				<LoginRegisterDesktopBackground image={BackgroundImage}>
					<LogoCharIcon />
				</LoginRegisterDesktopBackground>
			</LoginRegisterWrap>
		</LoginRegisterContainer>
	)
}

export default Register
