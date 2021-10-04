import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AddImageForm from '../../components/Forms/AddImageForm'
import UpdateProfileForm from '../../components/Forms/UpdateProfileForm'
import Header from '../../components/Header'
import Card from '../../components/shared/Card'
import { Container } from '../../components/shared/Common/styles'
import locationStore from '../../stores/location.store'
import { ProfileBox, ProfileWrap } from './styles'

const Profile: FC = () => {
	const [isMobile, setIsMobile] = useState(true)
	const checkIfMobile = () => {
		if (window.innerWidth < 992) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	useEffect(() => {
		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)
		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])
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
							<Card key={location.id} {...location} bottom='24px' mobile={isMobile ? 'true' : 'false'} />
						))}
					</ProfileBox>
				</ProfileWrap>
			</Container>
			<Footer />
		</>
	)
}

export default observer(Profile)
