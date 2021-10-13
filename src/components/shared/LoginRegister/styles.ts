import styled from 'styled-components'
import BackgroundImage from '../../../assets/images/background.png'
import {
	LoginRegisterContentWrapProps,
	LoginRegisterDesktopBackgroundProps,
} from '../../../interfaces/style.interface'

export const LoginRegisterContainer = styled.div`
	${(p) => p.theme.screens.large} {
		> header {
			display: none;
		}
	}
`

export const LoginRegisterWrap = styled.div<LoginRegisterContentWrapProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - 100px);
	background-image: url(${BackgroundImage});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	padding: 0 35px;
	${(p) => p.theme.screens.large} {
		background-image: none;
		justify-content: flex-start;
		height: ${(p) => (p.isRegister ? '125vh' : '100vh')};
		overflow: hidden;
		padding: 0;
	}
	${(p) => p.theme.screens.huge} {
		height: 100vh;
	}
`

export const LoginRegisterDesktopBackground = styled.div<LoginRegisterDesktopBackgroundProps>`
	display: none;
	position: relative;
	background-image: url(${(p) => p.image});
	width: 60%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	> svg {
		position: absolute;
		top: 50%;
		left: 52%;
		transform: translate(-50%, -50%);
	}
	${(p) => p.theme.screens.large} {
		display: block;
	}
`

export const LoginRegisterContentWrap = styled.div<LoginRegisterContentWrapProps>`
	padding: 20px 15px;
	border-radius: 2rem;
	background: #fff;
	text-align: center;
	margin: ${(p) => (p.isRegister ? '56px 0 100px' : '0')};
	box-shadow: 0px 0px 8px ${(p) => p.theme.colors.shadow};
	> a {
		display: none;
	}
	> p {
		line-height: 24px;
		max-width: 375px;
		margin: 0 auto;
	}
	${(p) => p.theme.screens.xxsmall} {
		padding: 20px 30px;
	}
	${(p) => p.theme.screens.large} {
		width: 40%;
		margin-top: ${(p) => (p.isRegister ? '25vh' : '0')};
		box-shadow: none;
		> a {
			display: block;
			position: absolute;
			top: 45px;
			left: 70;
		}
	}
`
export const LoginRegisterTitle = styled.h1`
	font-size: 2.1875rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
`
