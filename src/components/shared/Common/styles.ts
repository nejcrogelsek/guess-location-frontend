import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	max-width: 1320px;
	margin: 0 auto;
	padding: 0 2rem;
`

interface TextProps {
	textCenter?: string | null
	font?: string | null
	top?: string | null
	bottom?: string | null
	max?: string | null
}
export const H1 = styled.h1<TextProps>`
	font-size: ${(p) => p.font && p.font};
	color: ${(p) => p.theme.colors.green};
	letter-spacing: 0.25px;
	text-align: ${(p) => p.textCenter && p.textCenter};
	font-weight: 400;
	max-width: ${(p) => p.max && p.max};
	margin: ${(p) => (p.textCenter && p.textCenter === 'center' ? '0 auto' : '0')};
	margin-top: ${(p) => p.top && p.top};
	margin-bottom: ${(p) => p.bottom && p.bottom};
`
export const H2 = styled.h2<TextProps>`
	font-size: ${(p) => p.font && p.font};
	color: ${(p) => p.theme.colors.green};
	letter-spacing: 0.25px;
	text-align: ${(p) => p.textCenter && p.textCenter};
	font-weight: 400;
	max-width: ${(p) => p.max && p.max};
	margin: ${(p) => (p.textCenter && p.textCenter === 'center' ? '0 auto' : '0')};
	margin-top: ${(p) => p.top && p.top};
	margin-bottom: ${(p) => p.bottom && p.bottom};
`
export const P = styled.p<TextProps>`
	font-size: 1rem;
	color: ${(p) => p.theme.colors.dark};
	text-align: ${(p) => p.textCenter && p.textCenter};
	max-width: ${(p) => p.max && p.max};
	margin: ${(p) => (p.textCenter && p.textCenter === 'center' ? '0 auto' : '0')};
	margin-top: ${(p) => p.top && p.top};
	margin-bottom: ${(p) => p.bottom && p.bottom};
	line-height: 24px;
`
