import { FC, useEffect, useState } from 'react'
import { Content, ImageContent } from '../../pages/Home/styles'
import { LinkStyled } from '../shared/Button/styles'
import { Container, H1, P } from '../shared/Common/styles'

const HomeTop: FC = () => {
    const [isMobile, setIsMobile] = useState(true);
    const checkIfMobile = () => {
        if (window.innerWidth < 992) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);
    return (
        <>
            <Container>
                <Content>
                    <H1 font={isMobile ? '2.1875rem' : '3.8125rem'} textCenter={isMobile ? 'center' : 'left'} top='3rem' bottom={isMobile ? '1rem' : '2rem'}>Explore the world with Geotagger!</H1>
                    <P max={isMobile ? '510px' : '420px'} textCenter={isMobile ? 'center' : 'left'}>Geotagger is webiste that allowes you to post picture and tag it on the map. Other user than try to locate it via Google Maps. </P>
                    <LinkStyled to='signup' center={isMobile ? 'center' : 'left'} top={isMobile ? '2rem' : '1rem'} bottom='3rem'>Sign up</LinkStyled>
                </Content>
            </Container>
            <ImageContent />
        </>
    )
}

export default HomeTop
