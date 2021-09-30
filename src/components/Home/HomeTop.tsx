import { FC } from 'react'
import { Content, ImageContent } from '../../pages/Home/styles'
import { LinkStyled } from '../shared/Button/styles'
import { Container, H1, P } from '../shared/Common/styles'

const HomeTop: FC = () => {
    return (
        <>
            <Container>
                <Content>
                    <H1 textCenter='true' top='3rem' bottom='1rem'>Explore the world with Geotagger!</H1>
                    <P max='585px' textCenter='true'>Geotagger is webiste that allowes you to post picture and tag it on the map. Other user than try to locate it via Google Maps. </P>
                    <LinkStyled to='signup' center='true' top='2rem' bottom='3rem'>Sign up</LinkStyled>
                </Content>
            </Container>
            <ImageContent />
        </>
    )
}

export default HomeTop
