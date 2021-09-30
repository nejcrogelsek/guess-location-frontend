import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.colors.greenLinear};
`

export const PictureWrap = styled.div`
	width: 100%;
	max-width: 100px;
	margin-bottom: 2rem;
`
