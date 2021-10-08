import { FC } from 'react'
import Card from '../shared/Card'
import locationStore from '../../stores/location.store'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const HomeSlider: FC = () => {
	return (
		<>
			<Swiper
				spaceBetween={16}
				slidesPerView={1.2}
				breakpoints={{
					1200: {
						width: 1200,
						slidesPerView: 3,
					},
					768: {
						width: 768,
						slidesPerView: 2.2,
					},
					600: {
						width: 600,
						slidesPerView: 1.5,
					},
				}}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper: any) => console.log(swiper)}>
				{locationStore.recentLocations?.slice(0, 3).map((location) => (
					<SwiperSlide key={location.id}>
						<Card {...location} bottom='24px' />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default observer(HomeSlider)
