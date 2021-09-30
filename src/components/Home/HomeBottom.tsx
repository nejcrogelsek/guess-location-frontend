import { FC, useEffect, useState } from 'react'
import { LinkStyled } from '../shared/Button/styles'
import Card from '../shared/Card'
import { CardContainer } from '../shared/Card/styles'
import { Container, H2, P } from '../shared/Common/styles'

const HomeBottom: FC = () => {
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
                <H2 font={isMobile ? '1.5rem' : '2.1875rem'} textCenter='center' top='5rem' bottom='1rem'>Try yourself at Geotagger!</H2>
                <P max='510px' textCenter='center' bottom='4rem'>Try to guess the location of image by selecting position on the map. When you guess it, it gives you the error distance.</P>
                <CardContainer>
                    <Card bottom='24px' />
                    <Card bottom='24px' />
                    <Card bottom='24px' />
                </CardContainer>
                <LinkStyled to='signup' center='center' bottom='3rem' top='18px'>Sign up</LinkStyled>
            </Container>
        </>
    )
}

export default HomeBottom
