import axios from '../../../api/axios'
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
	FormErrorText,
	FormImagePlaceholder,
	FormLabel,
	FormMapWrapper,
} from '../../shared/Form/styles'
import { IGuessLocation } from '../../../interfaces/location.interface'

interface Props {
	image: string
	user_id: number
	location_id: number
	lat: number
	long: number
	setDistance: Dispatch<SetStateAction<number | null>>
}

const GuessLocationForm: FC<Props> = ({
	image,
	user_id,
	location_id,
	lat,
	long,
	setDistance,
}: Props) => {
	const [errorDistance, setErrorDistance] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IGuessLocation>()
	const onSubmit = handleSubmit((data) => {
		console.log(data)
		addGuess(data)
	})

	//calculates distance between two points in km's
	const calcDistance = (p1: any, p2: any) => {
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
			const finalData = {
				user_id,
				location_id,
				lat: addGuessDto.lat,
				long: addGuessDto.lng,
				address: addGuessDto.address,
				distance,
			}
			await axios.post(`/location/guess/${location_id}`, finalData).then((res) => {
				reset()
				setErrorDistance(res.data.distance.toString())
				const addressEl = document.getElementById('address')!
				addressEl.setAttribute('value', res.data.address)
			})
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
							{...register('lat', { required: 'Latitude is required' })}
							name='lat'
							id='latitude'
							placeholder='lat'></FormControl>
						<FormControl
							{...register('lng', { required: 'Longitude is required' })}
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
								{...register('address', { required: 'Address is required' })}
								placeholder='Address'
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
