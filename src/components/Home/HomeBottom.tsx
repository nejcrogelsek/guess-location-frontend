import { FC } from 'react'
import { LinkStyled } from '../shared/Button/styles'
import Card from '../shared/Card'
import { CardContainer } from '../shared/Card/styles'
import { Container, H2, P } from '../shared/Common/styles'

const HomeBottom: FC = () => {
    return (
        <>
            <Container>
                <H2 textCenter='true' top='5rem' bottom='1rem'>Try yourself at Geotagger!</H2>
                <P max='585px' textCenter='true' bottom='72px'>Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</P>
                <CardContainer>
                    <Card bottom='24px' />
                    <Card bottom='24px' />
                    <Card bottom='24px' />
                </CardContainer>
                <LinkStyled to='signup' center='true' bottom='3rem' top='18px'>Sign up</LinkStyled>
            </Container>
        </>
    )
}

export default HomeBottom
