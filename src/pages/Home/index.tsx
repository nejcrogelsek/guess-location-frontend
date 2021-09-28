import { FC } from 'react'
import { ButtonStyled, LinkStyled } from '../../components/shared/Button/styles'

const Home: FC = () => {
    return (
        <div style={{ margin: '2rem 0' }}>
            <ButtonStyled size='large' color='green'>This is button</ButtonStyled>
            <ButtonStyled>This is button</ButtonStyled>
            <ButtonStyled color='green'>This is button</ButtonStyled>
            <ButtonStyled size='large'>This is button</ButtonStyled>
            <LinkStyled to='/'>This is link</LinkStyled>
        </div>
    )
}

export default Home
