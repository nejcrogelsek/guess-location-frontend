import { FC } from 'react'
import { ButtonGuess, ButtonStyled, LinkStyled } from '../../components/shared/Button/styles'

const Home: FC = () => {
    return (
        <div style={{ margin: '2rem 0' }}>
            <ButtonGuess>Guess</ButtonGuess>
        </div>
    )
}

export default Home
