import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Backdrop, CardBackground, CardStyled, ModalWrapper } from './styles'
import { ButtonGuess } from '../Button/styles'
import GuessLocationForm from '../../Forms/GuessLocationForm'
import { motion } from 'framer-motion'
import userStore from '../../../stores/user.store'
import { getDistanceBE } from '../../../api/location.actions'
import LockIcon from '../../icons/LockIcon'

interface Props {
	top?: string
	bottom?: string
	right?: string
	left?: string
	minwidth?: string
	location: {
		id: number
		lat: number
		long: number
		city: string
		location_image: string
		user_id: number
		created_at: Date
		updated_at: Date
	}
	nostyle?: boolean
	mobile?: boolean
	isSlider?: boolean
	setSliderModal?: Dispatch<SetStateAction<boolean>>
}

const Card: FC<Props> = ({
	top,
	bottom,
	right,
	left,
	minwidth,
	nostyle,
	location,
	mobile,
	isSlider,
	setSliderModal
}: Props) => {
	const [modal, setModal] = useState<boolean>(false)
	const [distance, setDistance] = useState<number | null>(null)
	const [error, setError] = useState<any | null>(null)

	const getDistance = async () => {
		const token: string | null = localStorage.getItem('user')
		if (userStore.user && token) {
			const res = await getDistanceBE(userStore.user.id, location.id, token)
			if (res.data) {
				setDistance(res.data.distance)
			}
		} else {
			setDistance(0)
		}
	}

	const openModalSlider = () => {
		document.querySelector('.swiper-container')?.classList.add('modal-open')
		setModal(true)
		if (setSliderModal) {
			setSliderModal(false)
		}
	}
	const closeModalSlider = () => {
		document.querySelector('.swiper-container')?.classList.remove('modal-open')
		setModal(false)
		if (setSliderModal) {
			setSliderModal(true)
		}
	}

	useEffect(() => {
		getDistance()
	}, [])
	return (
		<>
			<CardStyled
				user={userStore.user ? true : false}
				nostyle={nostyle}
				bottom={bottom ? bottom : null}
				top={top ? top : null}
				right={right ? right : null}
				left={left ? left : null}
				minwidth={minwidth ? minwidth : null}
				image={location.location_image}
				onClick={() => nostyle && setModal(true)}>
				<CardBackground
					user={userStore.user ? true : false}
					nostyle={nostyle}
					onClick={() => (mobile && mobile ? setModal(true) : null)}>
					{userStore.user ? (
						<>
							<span className='error-distance'>{distance && `${distance}m`}</span>
							{isSlider ? (
								<ButtonGuess onClick={openModalSlider}>Guess</ButtonGuess>
							) : (
								<ButtonGuess onClick={() => setModal(true)}>Guess</ButtonGuess>
							)}
						</>
					) : (
						<LockIcon />
					)}
				</CardBackground>
			</CardStyled>
			{modal ? (
				<>
					<motion.div
						initial={{
							opacity: 0,
							transform: 'translate(-50%,-70%)',
						}}
						animate={{ opacity: 1, transform: 'translate(-50%,-50%)' }}
						className='motion'>
						<ModalWrapper height={error ? true : false} shadow={true}>
							<GuessLocationForm
								image={location.location_image}
								location_id={location.id}
								lat={location.lat}
								long={location.long}
								setDistance={setDistance}
								setError={setError}
								error={error}
							/>
						</ModalWrapper>
					</motion.div>
					{modal === true && isSlider ? (
						<Backdrop onClick={closeModalSlider}></Backdrop>
					) : (
						<Backdrop onClick={() => setModal(false)}></Backdrop>
					)}
				</>
			) : null}
		</>
	)
}

export default Card
