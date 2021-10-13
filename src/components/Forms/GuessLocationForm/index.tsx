import { observer } from 'mobx-react-lite'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
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
	FormValidation,
	FormValidationSuccess,
} from '../../shared/Form/styles'
import { IGuessLocation } from '../../../interfaces/location.interface'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import userStore from '../../../stores/user.store'
import locationStore from '../../../stores/location.store'
import { createGuess } from '../../../api/location.actions'

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
	lat,
	long,
	setDistance,
}: Props) => {
	const [success, setSuccess] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const validationSchema = Yup.object().shape({
		lat: Yup.string().required('Latitude is required'),
		lng: Yup.string().required('Longitude is required'),
		address: Yup.string().required('Address is required'),
	})
	const [errorDistance, setErrorDistance] = useState<string | null>(null)
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

	//calculates distance between two points in km's
	const calcDistance = (p1: google.maps.LatLng, p2: google.maps.LatLng) => {
		return (
			google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
		).toFixed(4)
	}

	const addGuess = async (addGuessDto: IGuessLocation) => {
		try {
			const p1 = new google.maps.LatLng(Number(lat), Number(long))
			const p2 = new google.maps.LatLng(
				Number(addGuessDto.lat),
				Number(addGuessDto.lng)
			)

			const distance: string = (+calcDistance(p1, p2) * 1000).toFixed(0)
			setDistance(Number(distance))
			const token: string | null = localStorage.getItem('user')
			if (token) {
				const res = await createGuess(
					addGuessDto.address,
					location_id,
					distance,
					token
				)
				if (res.data) {
					setErrorDistance(res.data.distance.toString())
					const addressEl = document.getElementById('address')!
					addressEl.setAttribute('value', res.data.address)
					reset()
					setSuccess('Guess successfully added.')
					// Get personal best
					locationStore.getPersonalBest(userStore.user!.id, token)
				} else {
					setError('error')
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		const script = document.createElement('script')

		script.src =
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqcArrh8SQsephYJCy_WuZ8uoiXsWM7dQ&libraries=places,geometry&callback=initialize'
		script.async = true
		document.body.appendChild(script)
	}, [])

	return (
		<>
			<Form onSubmit={onSubmit} className='relative guess'>
				<FormImagePlaceholder className='guess'>
					<img src={image} alt='' />
				</FormImagePlaceholder>
				<div className='form'>
					<FormElement>
						<FormMapWrapper
							id='map-canvas'
							className='small'
							onClick={() => setErrorDistance(null)}></FormMapWrapper>
					</FormElement>
					<FormElement className='hidden'>
						<FormControl
							{...register('lat')}
							name='lat'
							id='latitude'
							placeholder='lat'
							className={errors.lat ? 'is-invalid' : ''}></FormControl>
						<FormControl
							{...register('lng')}
							name='lng'
							id='longitude'
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
								readOnly={true}
								className={errors.address ? 'is-invalid' : ''}
							/>
						</FormElement>
					</div>
					{error && (
						<FormValidation>
							{error}
							<svg
								onClick={() => setError(null)}
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-x'
								viewBox='0 0 16 16'>
								<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
							</svg>
						</FormValidation>
					)}
					{success && (
						<FormValidationSuccess>
							{success}
							<svg
								onClick={() => setSuccess(null)}
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-x'
								viewBox='0 0 16 16'>
								<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
							</svg>
						</FormValidationSuccess>
					)}
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
