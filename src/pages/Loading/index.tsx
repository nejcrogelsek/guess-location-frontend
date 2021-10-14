import { FC } from 'react'
import { PictureWrap, Wrapper } from './styles'
import LogoCharIcon from '../../components/icons/LogoCharIcon'
import LogoIcon from '../../components/icons/LogoIcon'

const Loading: FC = () => {
	return (
		<Wrapper>
			<PictureWrap>
				<LogoCharIcon />
			</PictureWrap>
			<LogoIcon />
		</Wrapper>
	)
}

export default Loading
