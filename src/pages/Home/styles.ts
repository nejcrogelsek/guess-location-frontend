import styled from 'styled-components'
import MapBackground from '../../assets/images/map-background.png'

export const ContentWrap = styled.div`
	${(p) => p.theme.screens.large} {
		background-image: url(${MapBackground});
		background-position: right top;
		background-size: contain;
		background-repeat: no-repeat;
		background-size: 80%;
		min-height: 545px;
		width: 100%;
	}
	${(p) => p.theme.screens.xlarge} {
		min-height: 600px;
		background-size: 76%;
	}
	${(p) => p.theme.screens.xxlarge} {
		min-height: 715px;
	}
	${(p) => p.theme.screens.huge} {
		background-size: 73%;
		min-height: 800px;
	}
`
export const Content = styled.div`
	${(p) => p.theme.screens.large} {
		max-width: 530px;
		padding-top: 80px;
		> h1 {
			max-width: 350px;
		}
	}
`
export const ImageContent = styled.div`
	background-image: url(${MapBackground});
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	min-height: 215px;
	margin: 0 1rem;
	width: auto;
	${(p) => p.theme.screens.large} {
		display: none;
	}
`
