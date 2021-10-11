import styled from 'styled-components'
import { FormElementProps } from '../../../interfaces/style.interface'

export const Form = styled.form`
	text-align: left;
	max-width: 420px;
	margin: 1rem auto 0;
	&.relative {
		position: relative;
	}
	&.guess {
		margin-top: 0;
	}
	.row {
		display: flex;
		.col {
			&:first-child {
				padding-right: 7.5px;
			}
			&:last-child {
				padding-left: 7.5px;
			}
		}
	}
`
export const FormValidation = styled.p`
	color: #fff;
	position: relative;
	padding: 1rem 2.5rem 1rem 1rem;
	background: red;
	line-height: 24px;
	border-radius: 2rem;
	margin: 0 0 1rem;
	> svg {
		cursor: pointer;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translate(0, -50%) scale(2);
	}
`

export const FormValidationSuccess = styled.p`
	color: #fff;
	position: relative;
	padding: 1rem 2.5rem 1rem 1rem;
	background: ${(p) => p.theme.colors.green};
	border-radius: 2rem;
	margin: 0 0 1rem;
	line-height: 24px;
	> svg {
		cursor: pointer;
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translate(0, -50%) scale(2);
	}
`

export const FormElement = styled.div<FormElementProps>`
	margin-bottom: 1rem;
	&.hidden {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: -1;
		opacity: 0;
		pointer-events: none;
	}
	.form-text {
		font-size: 0.75rem;
		color: red;
	}
	${(p) =>
		p.image
			? `
        position: relative;
        margin: 0 auto 1rem;
        width: 64px;
        > input[type="file"] {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          opacity: 0;
          width: 64px;
          height: 64px;
          &:hover {
            cursor: pointer;
            + label {
              &::before {
                border-color: #000 !important;
              }
            }
          }
        }
        > label {
          .MuiAvatar-root {
            width: 64px;
            height: 64px;
            box-shadow: 0px 0px 8px ${p.theme.colors.shadow};
          }
        }
      `
			: null}
`
export const FormControl = styled.input`
	border-radius: 2rem;
	border: 2px solid ${(p) => p.theme.colors.green};
	padding: 8px 30px 8px 24px;
	height: 40px;
	width: 100%;
	margin-top: 0.5rem;
	&:focus {
		box-shadow: none;
	}
	&.is-invalid{
		border-color: red;
	}
`
export const FormControlSecondary = styled.input`
	border-radius: 2rem;
	border: none;
	padding: 8px 30px 8px 24px;
	height: 40px;
	width: 100%;
	margin-top: 0.5rem;
	box-shadow: 0px 0px 8px ${(p) => p.theme.colors.shadow};
	&.is-invalid{
		box-shadow: 0px 0px 3px #f00;
	}
`
export const FormTextArea = styled.textarea`
	border-radius: 1rem;
	border: none;
	padding: 8px 30px 8px 24px;
	width: 100%;
	height: 4rem;
	margin-top: 1rem;
	resize: none;
	box-shadow: 0px 0px 8px ${(p) => p.theme.colors.shadow};
	&.is-invalid{
		box-shadow: 0px 0px 3px #f00;
	}
`
export const FormButtonsWrap = styled.div`
	margin-bottom: 1rem;
`
export const FormLabel = styled.label`
	font-size: 0.75rem;
	font-weight: 500;
	display: block;
`
export const FormElementImageUpload = styled.div`
	position: relative;
	margin-bottom: 24px;
	width: 100%;
	> input[type='file'] {
		position: absolute;
		left: 0;
		top: 30px;
		z-index: 10;
		opacity: 0;
		width: 100%;
		height: 215px;
		&:hover {
			cursor: pointer;
			+ label {
				&::before {
					border-color: #000 !important;
				}
			}
		}
	}
	> label {
		&.second {
			margin-top: 1rem;
			height: 215px;
		}
	}
`
export const FormImagePlaceholder = styled.div`
	height: 100%;
	> img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 1rem;
	}
	&.guess {
		height: 148px;
		> img {
			object-fit: cover;
		}
	}
`
export const FormMapWrapper = styled.div`
	height: 255px;
	width: 100%;
	background: grey;
	border-radius: 1rem;
	&.small {
		height: 206px;
		margin-top: 1rem;
	}
`
export const FormErrorText = styled.span`
	font-size: 0.75rem;
	margin: 0.5rem 0;
	font-weight: 500;
	color: red;
	display: block;
`
export const FormGoTo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	> p {
		margin: 0;
		font-size: 0.85rem;
	}
	> a {
		min-width: 65px;
		font-size: 0.85rem;
		margin-left: 0.5rem;
		text-decoration: none;
		text-align: right;
		color: #000;
		transition: 0.25s ease-out;
		&:hover {
			color: ${(p) => p.theme.colors.green};
		}
	}
	${(p) => p.theme.screens.xxsmall} {
		> a,
		> p {
			font-size: 1rem;
		}
	}
`
