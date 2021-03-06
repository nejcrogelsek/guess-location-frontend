import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonProps } from '../../../interfaces/style.interface'



export const ButtonStyled = styled.button<ButtonProps>`
	background: ${(p) =>
		p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
	max-width: ${(p) =>
		p.size && p.size === 'large'
			? '345px'
			: p.size === 'full'
			? '100%'
			: '137px'};
	color: ${(p) =>
		p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
	border: ${(p) =>
		p.color && p.color === 'green' ? 'none' : '2px solid' + p.theme.colors.green};
	width: 100%;
	padding: 0.5rem 1rem;
	border-radius: 2rem;
	font-size: 1rem;
	display: block;
	text-align: ${(p) => p.center && p.center};
	cursor: pointer;
	height: 40px;
	margin: ${(p) => (p.center && p.center === 'center' ? '0 auto' : '0')};
	margin-top: ${(p) => p.top && p.top};
	margin-bottom: ${(p) => p.bottom && p.bottom};
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background: ${(p) =>
			p.color && p.color === 'green' ? '#fff' : p.theme.colors.greenLinear};
		color: ${(p) =>
			p.color && p.color === 'green' ? p.theme.colors.green : '#fff'};
		border: ${(p) =>
			p.color && p.color === 'green'
				? '2px solid' + p.theme.colors.green
				: 'none'};
		line-height: 20px;
	}
`
export const LinkStyled = styled(Link)<ButtonProps>`
	background: ${(p) =>
		p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
	max-width: ${(p) =>
		p.size && p.size === 'large'
			? '345px'
			: p.size === 'full'
			? '100%'
			: '137px'};
	color: ${(p) =>
		p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
	border: ${(p) =>
		p.color && p.color === 'green' ? 'none' : '2px solid' + p.theme.colors.green};
	width: 100%;
	padding: 0.5rem 1rem;
	border-radius: 2rem;
	font-size: 1rem;
	display: block;
	height: 40px;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	margin: ${(p) => (p.center && p.center === 'center' ? '0 auto' : '0')};
	margin-top: ${(p) => p.top && p.top};
	margin-bottom: ${(p) => p.bottom && p.bottom};
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background: ${(p) =>
			p.color && p.color === 'green' ? '#fff' : p.theme.colors.greenLinear};
		color: ${(p) =>
			p.color && p.color === 'green' ? p.theme.colors.green : '#fff'};
		border: ${(p) =>
			p.color && p.color === 'green'
				? '2px solid' + p.theme.colors.green
				: 'none'};
		line-height: 20px;
	}
`
export const ButtonGuess = styled.button`
	background: ${(p) =>
		p.color && p.color === 'green' ? p.theme.colors.greenLinear : '#fff'};
	color: ${(p) =>
		p.color && p.color === 'green' ? '#fff' : p.theme.colors.green};
	border: ${(p) => '2px solid' + p.theme.colors.green};
	max-width: 137px;
	width: 100%;
	padding: 0.5rem 1rem;
	text-align: center;
	height: 40px;
	border-radius: 2rem;
	font-size: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background: ${(p) => p.theme.colors.dark};
		color: #fff;
		border-color: ${(p) => p.theme.colors.dark};
	}
`
