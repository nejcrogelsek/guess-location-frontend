import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import Footer from '../../components/Footer'
import AddImageForm from '../../components/Forms/AddImageForm'
import UpdateProfileForm from '../../components/Forms/UpdateProfileForm'
import Header from '../../components/Header'
import Card from '../../components/shared/Card'
import { Container } from '../../components/shared/Common/styles'
import locationStore from '../../stores/location.store'
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
						{locationStore.recentLocations?.slice(0, 3).map((location) => (
							<Card key={location.id} {...location} bottom='24px' />
						))}
					</ProfileBox>
				</ProfileWrap>
			</Container>
			<Footer />
		</>
	)
}

export default observer(Profile)
