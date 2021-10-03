import { FC, useState } from 'react'
import { Backdrop, CardStyled, ModalWrapper } from './styles'
import NewYork from '../../../assets/images/new-york.jpg'
import { ButtonGuess } from '../Button/styles'
import GuessLocationForm from '../../Forms/GuessLocationForm'
import { motion } from 'framer-motion'

interface Props {
	top?: string
	bottom?: string
	right?: string
	left?: string
	minwidth?: string
}

const Card: FC<Props> = ({ top, bottom, right, left, minwidth }: Props) => {
	const [modal, setModal] = useState(false)
	const user = true
	return (
		<>
			<CardStyled
				user='true'
				bottom={bottom ? bottom : null}
				top={top ? top : null}
				right={right ? right : null}
				left={left ? left : null}
				minwidth={minwidth ? minwidth : null}
				image={NewYork}>
				<div className='background'>
					{user ? (
						<>
							<span className='error-distance'>544 m</span>
							<ButtonGuess onClick={() => setModal(true)}>Guess</ButtonGuess>
						</>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='#fff'
							className='bi bi-lock'
							viewBox='0 0 16 16'>
							<path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z' />
						</svg>
					)}
				</div>
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
						<ModalWrapper shadow='true'>
							<GuessLocationForm />
						</ModalWrapper>
					</motion.div>
					<Backdrop onClick={() => setModal(false)}></Backdrop>
				</>
			) : null}
		</>
	)
}

export default Card
