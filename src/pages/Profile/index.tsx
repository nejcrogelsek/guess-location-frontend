import { FC } from 'react'
import Footer from '../../components/Footer'
import AddImageForm from '../../components/Forms/AddImageForm'
import UpdateProfileForm from '../../components/Forms/UpdateProfileForm'
import Header from '../../components/Header'
import { Container } from '../../components/shared/Container/styles'
import { ProfileBox, ProfileWrap } from './styles'

const Profile: FC = () => {
    return (
        <>
            <Header />
            <Container>
                <ProfileWrap>
                    <ProfileBox>
                        <UpdateProfileForm />
                    </ProfileBox>
                    <ProfileBox>
                        <AddImageForm />
                    </ProfileBox>
                </ProfileWrap>
            </Container>
            <Footer />
        </>
    )
}

export default Profile
