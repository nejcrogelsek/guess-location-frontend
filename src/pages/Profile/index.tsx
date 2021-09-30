import { FC } from 'react'
import Footer from '../../components/Footer'
import AddImageForm from '../../components/Forms/AddImageForm'
import UpdateProfileForm from '../../components/Forms/UpdateProfileForm'
import Header from '../../components/Header'
import Card from '../../components/shared/Card'
import { Container } from '../../components/shared/Container/styles'
import { ProfileBox, ProfileWrap } from './styles'

const Profile: FC = () => {
    return (
        <>
            <Header />
            <Container>
                <ProfileWrap>
                    <ProfileBox shadow='true'>
                        <UpdateProfileForm />
                    </ProfileBox>
                    <ProfileBox shadow='true'>
                        <AddImageForm />
                    </ProfileBox>
                    <ProfileBox>
                        <Card />
                        <Card />
                        <Card />
                    </ProfileBox>
                </ProfileWrap>
            </Container>
            <Footer />
        </>
    )
}

export default Profile
