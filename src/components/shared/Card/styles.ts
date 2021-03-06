import styled from 'styled-components'
import {
	CardBackgroundProps,
	CardProps,
	ModalWrapperProps,
} from '../../../interfaces/style.interface'

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	${(p) => p.theme.screens.large} {
		flex-direction: row;
		flex-wrap: wrap;
	}
	${(p) => p.theme.screens.xxlarge} {
		justify-content: flex-start;
	}
`
export const CardStyled = styled.div<CardProps>`
	max-width: 420px;
	min-width: ${(p) => p.minwidth && p.minwidth};
	width: 100%;
	height: 236px;
	display: flex;
	background-image: url(${(p) => p.image});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	border-radius: 1rem;
	overflow: hidden;
	margin-top: ${(p) => p.top && p.top};
	margin-bottom: ${(p) => p.bottom && p.bottom};
	margin-right: ${(p) => p.right && p.right};
	margin-left: ${(p) => p.left && p.left};
	${(p) => p.theme.screens.large} {
		transition: 0.25s ease-out;
		&:nth-child(2n + 0) {
			margin: 0 0 24px 1rem;
		}
	}
	${(p) => p.theme.screens.xxlarge} {
		&:nth-child(2n + 0) {
			margin: 0 0 24px;
		}
		&:nth-child(3n + 2) {
			margin: 0 1rem 24px;
		}
		
	}
`
export const CardBackground = styled.div<CardBackgroundProps>`
	background: ${(p) =>
		p.nostyle ? 'none' : p.theme.colors.greenLinearOpacity};
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.25s ease-out;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		background: ${(p) => p.nostyle ? 'none' : p.theme.colors.greenLinear};
		opacity: 0;
		transition: all 0.25s ease-out;
	}
	.bi-lock {
		width: 50px;
		height: 64px;
	}
	.error-distance {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		display: ${(p) => (p.nostyle ? 'none' : 'block')};
	}
	${(p) =>
		p.user
		&& `
		> button{
			opacity: 0;
			pointer-events: none;
			position: absolute;
			z-index: 1;
			transition: 0.25s ease-out;
		}
		&:hover{
			&::after {
				opacity: 1;
			}
			.error-distance{
				display: none;
			}
			> button{
				opacity: ${p.nostyle ? '0' : '1'};
				pointer-events: all;
			}
		}
	`}
`
export const Backdrop = styled.div`
	position: fixed;
	opacity: 0.1;
	background: #000;
	width: 100%;
	display: block;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 5;
`

export const ModalWrapper = styled.div<ModalWrapperProps>`
	padding: ${(p) => (p.shadow ? '1rem' : '0')};
	box-shadow: ${(p) =>
		p.shadow ? `0px 0px 8px ${p.theme.colors.shadow}` : 'none'};
	border-radius: 2rem;
	width: 100%;
	max-width: 378px;
	height: 620px;
	background-color: #fff;
	margin: 0 auto;
	> div {
		margin: 0 0 24px !important;
	}
	${(p) =>
		p.shadow
			? null
			: `
        > div{
            margin-bottom: 24px;
        }
    `}
	${(p) => p.theme.screens.large} {
		height: ${p => p.height ? '443px' : '375px'};
		> form {
			display: flex;
			max-width: 100%;
			justify-content: space-between;
			max-height: 343px;
			.guess {
				height: 342px;
				> img {
					object-fit: contain;
				}
			}
			.form {
				min-width: 425px;
				flex: 1;
				margin-left: 2rem;
				${(p) => p.theme.screens.xlarge} {
					min-width: unset;
				}
				#map-canvas {
					margin-top: 0;
				}
				.results {
					display: flex;
					.error {
						width: 105px;
						${(p) => p.theme.screens.xlarge} {
							width: 212px;
						}
					}
					.location {
						flex: 1;
						margin-left: 2rem;
					}
				}
				.buttons {
					display: flex;
					justify-content: flex-end;
					> button {
						width: 137px;
					}
				}
			}
		}
	}
`
