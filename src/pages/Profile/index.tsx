import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AddImageForm from '../../components/Forms/AddImageForm'
import UpdateProfileForm from '../../components/Forms/UpdateProfileForm'
import Header from '../../components/Header'
import Card from '../../components/shared/Card'
import { Container } from '../../components/shared/Common/styles'
import locationStore from '../../stores/location.store'
import userStore from '../../stores/user.store'
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

	useEffect(() => {
		if (userStore.user) {
			const token: string | null = localStorage.getItem('user')
			if (token) {
				locationStore.getPersonalBest(userStore.user.id, token)
			}
		}
	}, [userStore.user])
	return (
		<>
			<Header />
			<Container>
				<ProfileWrap>
					<ProfileBox shadow={true}>
						<UpdateProfileForm />
					</ProfileBox>
					<ProfileBox shadow={true}>
						<AddImageForm />
					</ProfileBox>
					<ProfileBox>
						{locationStore.personalBest?.slice(0, 3).map((item) => (
							<Card key={item.location.id} {...item} bottom='24px' mobile={isMobile} />
						))}
					</ProfileBox>
				</ProfileWrap>
			</Container>
			<Footer />
		</>
	)
}

export default observer(Profile)
