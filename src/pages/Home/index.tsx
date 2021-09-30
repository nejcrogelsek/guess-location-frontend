import { FC } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HomeBottom from '../../components/Home/HomeBottom'
import HomeTop from '../../components/Home/HomeTop'

const Home: FC = () => {
    return (
        <>
            <Header />
            <HomeTop />
            <HomeBottom />
            <Footer />
        </>
    )
}

export default Home
