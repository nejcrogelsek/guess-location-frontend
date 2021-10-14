import styled from 'styled-components'

export const FooterStyled = styled.footer`
	background: ${(p) => p.theme.colors.greenLinear};
	border-top-left-radius: 2rem;
	border-top-right-radius: 2rem;
	height: 65px;
	padding: 1rem 2.125rem;
	@media (min-width: 413px) {
		padding: 1rem 2rem;
	}
	@media ${(p) => p.theme.screens.large} {
		height: 60px;
		padding: 2rem 2.1875rem;
	}
`
export const FooterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	padding: 0;
	> span {
		display: none;
		color: #fff;
		font-size: 1.3rem;
		font-weight: 500;
		letter-spacing: 0.3px;
	}
	> p {
		margin: 0;
		color: #fff;
		font-size: 0.75rem;
	}
	@media ${(p) => p.theme.screens.large} {
		> svg {
			display: none;
		}
		> span {
			display: block !important;
		}
		> p {
			font-size: 1rem;
		}
	}
`
