import { observer } from 'mobx-react-lite'
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControlSecondary,
	FormElement,
	FormImagePlaceholder,
	FormLabel,
	FormValidation,
	FormMapWrapper
} from '../../shared/Form/styles'
import userStore from '../../../stores/user.store'
import locationStore from '../../../stores/location.store'
import { createGuess } from '../../../api/location.actions'
import { Map } from '../../shared/Map'
import { IMarker } from '../../../interfaces/map.interface'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'

interface Props {
	image: string
	location_id: number
	lat: number
	long: number
	setDistance: Dispatch<SetStateAction<number | null>>
}

const GuessLocationForm: FC<Props> = ({
	image,
	location_id,
}: Props) => {
	const [errorDistance, setErrorDistance] = useState<string | null>(null)
	const [marker, setMarker] = useState<IMarker>()
	const [error, setError] = useState<string | null>(null)

	const addGuess = async (e: FormEvent) => {
		try {
			e.preventDefault()
			if (marker && marker.address && marker.latitude && marker.longitude) {
				const token: string | null = localStorage.getItem('user')
				if (token) {
					const res = await createGuess(
						marker.address,
						location_id,
						marker.latitude,
						marker.longitude,
						token
					)
					if (res.data) {
						setErrorDistance(res.data.distance.toString())
						// Get personal best
						locationStore.getPersonalBest(userStore.user!.id, token)
					}
				}
			} else {
				setError('You need to select a location on the map.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<Form onSubmit={addGuess} className='relative guess'>
				<FormImagePlaceholder className='guess'>
					<img src={image} alt='' />
				</FormImagePlaceholder>
				<div className='form'>
					<FormElement>
						<FormMapWrapper className='small'>
							<Map
								mapType={google.maps.MapTypeId.ROADMAP}
								mapTypeControl={true}
								marker={marker}
								setMarker={setMarker}
							/>
						</FormMapWrapper>
					</FormElement>
					{error && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
							<FormValidation>
								{error}
								<CloseIcon onClick={setError} />
							</FormValidation>
						</motion.div>
					)}
					<div className='results'>
						<FormElement className='error'>
							<FormLabel htmlFor='error-distance'>Error distance</FormLabel>
							<FormControlSecondary
								type='text'
								name='error-distance'
								id='error-distance'
								value={errorDistance ? errorDistance + 'm' : ''}
								readOnly={true}
								onChange={(e) => setErrorDistance(e.target.value)}
							/>
						</FormElement>
						<FormElement className='location'>
							<FormLabel htmlFor='address'>Location</FormLabel>
							<FormControlSecondary
								type='text'
								id='address'
								placeholder='Address'
								value={marker && marker.address}
								readOnly={true}
							/>
						</FormElement>
					</div>
					<FormButtonsWrap className='buttons'>
						<ButtonStyled size='full' color='green' type='submit'>
							Guess
						</ButtonStyled>
					</FormButtonsWrap>
				</div>
			</Form>
		</>
	)
}

export default observer(GuessLocationForm)
