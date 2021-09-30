import { FC, useEffect, useState } from 'react'
import { Content, ContentWrap, ImageContent } from '../../pages/Home/styles'
import { LinkStyled } from '../shared/Button/styles'
import { Container, H1, P } from '../shared/Common/styles'
import HomeSlider from './Slider'

const HomeTop: FC = () => {
    const user = true;
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
            {
                user ?
                    <>
                        <Container>
                            <H1 font='2.1875rem' bottom='1rem' top='3.5rem'>Personal best guesses</H1>
                            <P bottom='2rem'>Your personal best guesses appear here. Go on and try to beat your personal records or set new!</P>
                            <HomeSlider />
                        </Container>
                    </> :
                    <>
                        <ContentWrap>
                            <Container>
                                <Content>
                                    <H1 font={isMobile ? '2.1875rem' : '3.8125rem'} textCenter={isMobile ? 'center' : 'left'} top='3rem' bottom={isMobile ? '1rem' : '2rem'}>Explore the world with Geotagger!</H1>
                                    <P max={isMobile ? '510px' : '370px'} textCenter={isMobile ? 'center' : 'left'}>Geotagger is webiste that allowes you to post picture and tag it on the map. Other user than try to locate it via Google Maps. </P>
                                    <LinkStyled to='signup' center={isMobile ? 'center' : 'left'} top={isMobile ? '2rem' : '1rem'} bottom='3rem'>Sign up</LinkStyled>
                                </Content>
                            </Container>
                        </ContentWrap>
                        <ImageContent />
                    </>
            }
        </>
    )
}

export default HomeTop
