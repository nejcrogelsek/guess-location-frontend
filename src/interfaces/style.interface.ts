interface BaseLayer {
	top?: string | null
	right?: string | null
	left?: string | null
	bottom?: string | null
	center?: string | null
}
export interface ProfileBoxProps {
	shadow?: boolean
}
export interface NavButtonsProps {
	reverse?: boolean
}
export interface NavMobileProps {
	toggle: boolean
}
export interface NavbarNavProps {
	isAuth: boolean | null
}
export interface ButtonProps extends BaseLayer {
	size?: string
	color?: string
}
export interface ModalWrapperProps {
	shadow?: boolean
	height: boolean
}
export interface CardProps extends BaseLayer {
	image: string
	user: boolean
	minwidth?: string | null
	nostyle?: boolean
}
export interface CardBackgroundProps extends BaseLayer {
	user: boolean
	nostyle?: boolean
}
export interface TextProps extends BaseLayer {
	textCenter?: string | null
	font?: string | null
	max?: string | null
}
export interface FormElementProps {
	image?: boolean
}
export interface LoginRegisterDesktopBackgroundProps {
	image?: string | null
}
export interface LoginRegisterContentWrapProps {
	isRegister?: boolean
}
