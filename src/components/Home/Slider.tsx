import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Card from '../shared/Card'

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
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}
	return (
		<Slider {...settings}>
			<Card />
			<Card />
			<Card />
		</Slider>
	)
}

export default HomeSlider
