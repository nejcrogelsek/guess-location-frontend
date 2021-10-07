import { FC } from 'react'
import Card from '../shared/Card'
import locationStore from '../../stores/location.store'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

const HomeSlider: FC = () => {
	return (
		<>
			<Swiper
				spaceBetween={50}
				slidesPerView={3}
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
