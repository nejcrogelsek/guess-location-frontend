import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import locationStore from '../../stores/location.store'
import userStore from '../../stores/user.store'
import { ButtonStyled, LinkStyled } from '../shared/Button/styles'
import Card from '../shared/Card'
import { CardContainer } from '../shared/Card/styles'
import { Container, H2, P } from '../shared/Common/styles'

const HomeBottom: FC = () => {
	const [isMobile, setIsMobile] = useState(true)
	const [limit, setLimit] = useState<number>(0)
	const checkIfMobile = () => {
		if (window.innerWidth < 992) {
			setIsMobile(true)
			setLimit(3)
		} else {
			setIsMobile(false)
			setLimit(9)
		}
	}

	const showMoreLocations = () => {
		if (isMobile) {
			setLimit(limit + 3)
		} else {
			setLimit(limit + 9)
		}
	}

	useEffect(() => {
		checkIfMobile()
		showMoreLocations()
		window.addEventListener('resize', checkIfMobile)
		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])
	return (
		<>
			<Container>
				{userStore.user ? (
					<>
						<H2 font='2.1875rem' top='4rem' bottom='1rem'>
							New uploads
						</H2>
						<P bottom='4rem'>
							New uploads from users. Try to guess all the locations by pressing on a
							picture.
						</P>
						<CardContainer>
							{locationStore.recentLocations?.slice(0, limit).map((location) => (
								<motion.div
									className='motion-card'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									key={location.id}>
									<Card location={location} bottom='24px' nostyle='true' />
								</motion.div>
							))}
						</CardContainer>
						<ButtonStyled
							color='white'
							center='center'
							top='1.6875rem'
							bottom='3.1875rem'
							onClick={showMoreLocations}>
							Load more
						</ButtonStyled>
					</>
				) : (
					<>
						<H2
							font={isMobile ? '1.5rem' : '2.1875rem'}
							textCenter='center'
							top='5rem'
							bottom='1rem'>
							Try yourself at Geotagger!
						</H2>
						<P max='510px' textCenter='center' bottom='4rem'>
							Try to guess the location of image by selecting position on the map. When
							you guess it, it gives you the error distance.
						</P>
						<CardContainer>
							{locationStore.defaultLocations?.slice(0, 3).map((location) => (
								<Card key={location.id} location={location} bottom='24px' />
							))}
						</CardContainer>
						<LinkStyled to='signup' center='center' bottom='3rem' top='18px'>
							Sign up
						</LinkStyled>
					</>
				)}
			</Container>
		</>
	)
}

export default observer(HomeBottom)
