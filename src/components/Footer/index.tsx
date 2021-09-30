import { FC } from 'react'
import { FooterContainer, FooterStyled } from './styles'
import Logo from '../../assets/images/logo-mobile.svg'

const Footer: FC = () => {
	return (
		<FooterStyled>
			<FooterContainer>
				<img src={Logo} alt='Logo' />
				<span>Geotagger</span>
				<p>All Rights Reserved | skillupmentor.com</p>
			</FooterContainer>
		</FooterStyled>
	)
}

export default Footer
