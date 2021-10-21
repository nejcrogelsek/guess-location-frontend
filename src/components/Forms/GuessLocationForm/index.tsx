import { observer } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormControlSecondary,
	FormElement,
	FormImagePlaceholder,
	FormLabel,
	FormMapWrapper,
} from '../../shared/Form/styles'
import { IGuessLocation } from '../../../interfaces/location.interface'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import userStore from '../../../stores/user.store'
import locationStore from '../../../stores/location.store'
import { createGuess } from '../../../api/location.actions'
import { Map } from '../../shared/Map'
import { IMarker } from '../../../interfaces/map.interface'

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
	const validationSchema = Yup.object().shape({
		lat: Yup.string().required('Latitude is required'),
		lng: Yup.string().required('Longitude is required'),
		address: Yup.string().required('Address is required'),
	})
	const [errorDistance, setErrorDistance] = useState<string | null>(null)
	const [marker, setMarker] = useState<IMarker>()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IGuessLocation>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})
	const onSubmit = handleSubmit((data) => {
		console.log(data)
		addGuess(data)
	})

	const addGuess = async (addGuessDto: IGuessLocation) => {
		try {
			const token: string | null = localStorage.getItem('user')
			if (token) {
				const res = await createGuess(
					addGuessDto.address,
					location_id,
					addGuessDto.lat,
					addGuessDto.lng,
					token
				)
				if (res.data) {
					setErrorDistance(res.data.distance.toString())
					reset()
					// Get personal best
					locationStore.getPersonalBest(userStore.user!.id, token)
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<Form onSubmit={onSubmit} className='relative guess'>
				<FormImagePlaceholder className='guess'>
					<img src={image} alt='' />
				</FormImagePlaceholder>
				<div className='form'>
					<FormElement>
						<Map
							mapType={google.maps.MapTypeId.ROADMAP}
							mapTypeControl={true}
							marker={marker}
							setMarker={setMarker}
						/>
					</FormElement>
					<FormElement className='hidden'>
						<FormControl
							{...register('lat')}
							name='lat'
							id='latitude'
							placeholder='lat'
							readOnly={true}
							value={marker && marker.latitude}
							className={errors.lat ? 'is-invalid' : ''}></FormControl>
						<FormControl
							{...register('lng')}
							name='lng'
							id='longitude'
							readOnly={true}
							value={marker && marker.longitude}
							placeholder='lng'></FormControl>
					</FormElement>
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
								{...register('address')}
								placeholder='Address'
								value={marker && marker.address}
								readOnly={true}
								className={errors.address ? 'is-invalid' : ''}
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
