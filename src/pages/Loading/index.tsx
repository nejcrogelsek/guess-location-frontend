import { FC } from 'react'
import { PictureWrap, Wrapper } from './styles'
import LogoChar from '../../assets/images/logo-char.svg'
import Logo from '../../assets/images/logo.svg'

const Loading: FC = () => {
	return (
		<Wrapper>
			<PictureWrap>
				<img src={LogoChar} alt='Logo' />
			</PictureWrap>
			<img src={Logo} alt='Logo' />
		</Wrapper>
	)
}

export default Loading
