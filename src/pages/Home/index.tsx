import { FC } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Container, TitleH1, TitleH2, TitleH2Small } from '../../components/shared/Common/styles'

const Home: FC = () => {
    return (
        <>
            <Header />
            <Container>
                <TitleH1>Title 1</TitleH1>
                <TitleH2>Title 2 large</TitleH2>
                <TitleH2Small>Title 2 small</TitleH2Small>
            </Container>
            <Footer />
        </>
    )
}

export default Home
