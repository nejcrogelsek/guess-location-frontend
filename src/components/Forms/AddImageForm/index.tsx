import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormElement,
	FormElementImageUpload,
	FormErrorText,
	FormImagePlaceholder,
	FormLabel,
	FormMapWrapper,
	FormTextArea,
} from '../../shared/Form/styles'
import ImagePlaceholder from '../../../assets/images/image-placeholder.png'
import { LocationFormData } from '../../../interfaces/location.interface'
import axios from '../../../api/axios'
import userStore from '../../../stores/user.store'

const AddImageForm: FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LocationFormData>()

	const onSubmit = handleSubmit((data) => {
		uploadLocation(data)
		reset()
	})

	const uploadLocation = async (createLocationDto: LocationFormData) => {
		try {
			if (file !== null) {
				const { data } = await axios.get('users/upload')

				await axios.put(data.url, file, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				const imageUrl = data.url.split('?')

				const finalData = {
					location_image: imageUrl[0],
					user_id: userStore.user!.id,
					lat: createLocationDto.lat,
					long: createLocationDto.long,
					address: createLocationDto.address,
				}
				await axios.post('/location', finalData).then((res) => {
					console.log('Upload location worked')
				})
			} else {
				alert('You need to upload a location image.')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const fileSelected = async (e: any) => {
		const file = e.target.files[0]
		if (file && file.type.substr(0, 5) === 'image') {
			setFile(file)
		} else {
			setFile(null)
		}
	}

	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setPreview(null)
		}
	}, [file])

	useEffect(() => {
		const script = document.createElement('script')

		script.src =
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqcArrh8SQsephYJCy_WuZ8uoiXsWM7dQ&libraries=places&callback=initialize'
		script.async = true

		document.body.appendChild(script)
	}, [])

	return (
		<>
			<Form className='relative' onSubmit={onSubmit}>
				<FormElementImageUpload>
					<FormLabel htmlFor='file'>Upload image:</FormLabel>
					<FormLabel htmlFor='file' className='second'>
						<FormImagePlaceholder>
							<img src={preview ? (preview as string) : ImagePlaceholder} alt='' />
						</FormImagePlaceholder>
					</FormLabel>
					<FormControl
						type='file'
						accept='image/*'
						name='file'
						onChange={fileSelected}
					/>
				</FormElementImageUpload>
				<FormElement>
					<FormMapWrapper id='map-canvas'></FormMapWrapper>
				</FormElement>
				<FormElement className='hidden'>
					<FormControl
						{...register('lat', { required: 'Latitude is required' })}
						type='text'
						name='lat'
						id='latitude'
						placeholder='lat'></FormControl>
					<FormControl
						{...register('long', { required: 'Longitude is required' })}
						type='text'
						name='long'
						id='longitude'
						placeholder='long'></FormControl>
				</FormElement>
				<FormElement>
					<FormLabel htmlFor='address'>Location</FormLabel>
					<FormTextArea
						readOnly={true}
						id='address'
						{...register('address', { required: 'Address is required' })}
						name='address'></FormTextArea>
					{errors.address && <FormErrorText>{errors.address.message}</FormErrorText>}
				</FormElement>
				<FormButtonsWrap>
					<ButtonStyled size='full' color='green' type='submit'>
						Add place
					</ButtonStyled>
				</FormButtonsWrap>
			</Form>
		</>
	)
}

export default AddImageForm
