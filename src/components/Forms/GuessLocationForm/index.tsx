import axios from '../../../api/axios'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
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
}

const GuessLocationForm: FC<Props> = ({
	image,
	user_id,
	location_id,
}: Props) => {
	const [errorDistance, setErrorDistance] = useState<string>('')
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IGuessLocation>()
	const onSubmit = handleSubmit((data) => {
		console.log(data)
		addGuess(data)
		reset()
	})

	const addGuess = async (addGuessDto: IGuessLocation) => {
		try {
			const finalData = {
				user_id,
				location_id,
				lat: addGuessDto.lat,
				long: addGuessDto.lng,
				address: addGuessDto.address,
			}
			await axios.post(`/location/guess/${location_id}`, finalData).then((res) => {
				console.log(res.data.address)
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
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqcArrh8SQsephYJCy_WuZ8uoiXsWM7dQ&libraries=places&callback=initialize'
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
						<FormMapWrapper id='map-canvas' className='small'></FormMapWrapper>
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
								value={errorDistance}
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
