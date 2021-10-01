import styled from 'styled-components'

export const ProfileWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	${(p) => p.theme.screens.large} {
		flex-direction: row;
		align-items: flex-start;
		margin: 1rem 0 4rem;
	}
`
interface ProfileBoxProps {
	shadow?: string | null
}
export const ProfileBox = styled.div<ProfileBoxProps>`
	margin-top: 2rem;
	padding: ${(p) => (p.shadow ? '24px' : '0')};
	box-shadow: ${(p) =>
		p.shadow ? `0px 0px 8px ${p.theme.colors.shadow}` : 'none'};
	border-radius: 2rem;
	width: 100%;
	max-width: 420px;
	> div{
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
		margin: 0 10px;
		min-height: 772px;
		max-height: 772px;
		> form {
			display: flex;
			flex-direction: column;
			min-height: 709px;
			justify-content: space-between;
		}
	}
`
export const CurrentUserName = styled.div`
	margin: 24px;
	font-size: 2.1875rem;
	text-align: center;
`
export const ProfileWrap3 = styled.div`
	margin-top: 2rem;
`
export const ProfileWrap4 = styled.div`
	margin-top: 2rem;
`
export const ProfileWrap5 = styled.div`
	margin-top: 2rem;
`
export const ProfileWrap6 = styled.div`
	margin-top: 2rem;
`
