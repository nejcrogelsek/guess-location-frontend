import { FC } from 'react'
import { FooterContainer, FooterStyled } from './styles'
import LogoMobile from '../icons/LogoMobile'

const Footer: FC = () => {
	return (
		<FooterStyled>
			<FooterContainer>
				<LogoMobile />
				<span>Geotagger</span>
				<p>All Rights Reserved | skillupmentor.com</p>
			</FooterContainer>
		</FooterStyled>
	)
}

export default Footer
