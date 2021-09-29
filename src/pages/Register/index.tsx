import { FC } from 'react'
import RegisterForm from '../../components/Forms/RegisterForm'
import Header from '../../components/Header'
import { LoginRegisterContainer, LoginRegisterContentWrap, LoginRegisterDesktopBackground, LoginRegisterTitle, LoginRegisterWrap } from '../../components/shared/LoginRegister/styles'
import { Logo } from '../../components/shared/Logo/styles'
import BackgroundImage from "../../assets/images/background.png"

const Register: FC = () => {
    return (
        <LoginRegisterContainer>
            <Header />
            <LoginRegisterWrap>
                <LoginRegisterContentWrap isRegister='true'>
                    <Logo to='/' />
                    <LoginRegisterTitle>Sign up</LoginRegisterTitle>
                    <p>Your name will appear on posts and your public profile.</p>
                    <RegisterForm />
                </LoginRegisterContentWrap>
                <LoginRegisterDesktopBackground image={BackgroundImage}>
                    <svg width="207" height="298" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M204.371 108.201a136.28 136.28 0 00-40.033-31.624c-10.53-23.569-33.98-39.986-61.168-39.986-27.19 0-50.556 16.417-61.086 39.986A136.29 136.29 0 002.05 108.201C.257 49.892 46.26 2 103.17 2c56.985 0 102.92 47.892 101.201 106.201z" stroke="#fff" strokeWidth="4" /><path d="M189.068 159.366c.972-1.748 1.869-3.19 2.54-4.408.226-.456.445-.912.671-1.218.151-.307.301-.464.377-.688.294-.456.445-.837.595-1.143a224.229 224.229 0 00-2.163-4.028c0-.082-.075-.157-.151-.232-.671-1.21-1.342-2.428-2.163-3.646-.52-.912-1.123-1.824-1.643-2.661-.076-.082-.151-.231-.227-.306-.301-.456-.595-.912-.972-1.442-.746-1.061-1.492-2.13-2.314-3.116-.912-1.241-1.832-2.399-2.744-3.565-1.907-2.421-3.934-4.745-6.166-6.86a102.687 102.687 0 01-3.045-2.959c-18-16.873-42.045-27.215-68.488-27.215-7.093 0-14.035.762-20.834 2.204v35.809a65.49 65.49 0 0120.834-3.422c20.088 0 38.164 9.049 50.413 23.187-16.508 27.746-48.023 80.585-50.413 83.253L34.838 122.878l-3.211 3.19a64.932 64.932 0 00-3.06 3.348c-.973 1.061-1.945 2.122-2.842 3.266-.219.231-.445.455-.596.762-.746.911-1.492 1.905-2.314 2.892 0 0-.075.074-.075.149-.897 1.211-1.794 2.429-2.616 3.647a81.358 81.358 0 00-2.163 3.265c-.15.15-.226.381-.301.531a110.22 110.22 0 00-2.39 3.953c-.746 1.293-1.417 2.66-2.163 4.028.15.306.37.687.595 1.143.151.232.226.381.377.688.226.306.445.762.671 1.218a173.69 173.69 0 011.794 3.19c.302.382.52.763.746 1.218.219.374.445.68.671 1.062 0 .082.075.231.15.306 2.692 4.64 6.272 10.798 10.456 17.942 20.095 34.15 54.083 91.233 68.344 113.838 2.933 4.648 9.603 4.648 12.536 0 14.284-22.62 48.324-79.763 68.42-113.913 4.183-7.151 8.649-14.708 11.264-19.348" stroke="#fff" strokeWidth="4" /></svg>
                </LoginRegisterDesktopBackground>
            </LoginRegisterWrap>
        </LoginRegisterContainer>
    )
}

export default Register
