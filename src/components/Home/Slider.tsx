import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Card from '../shared/Card'
import locationStore from '../../stores/location.store'
import { observer } from 'mobx-react-lite'

const HomeSlider: FC = () => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 0,
		autoplay: false,
		centerMode: true,
		autoplaySpeed: 2000,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 9999,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 0,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1.9,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1.5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1.2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 0.9,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 460,
				settings: {
					slidesToShow: 0.8,
					slidesToScroll: 1,
				},
			},
		],
	}
	return (
		<Slider {...settings}>
			{locationStore.recentLocations?.slice(0, 3).map((location) => (
				<Card key={location.id} {...location} bottom='24px' />
			))}
		</Slider>
	)
}

export default observer(HomeSlider)
