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
import locationStore from '../../../stores/location.store'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const AddImageForm: FC = () => {
	const validationSchema = Yup.object().shape({
		lat: Yup.string().required('Latitude is required'),
		long: Yup.string().required('Longitude is required'),
		address: Yup.string().required('Address is required'),
	})
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LocationFormData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((data) => {
		uploadLocation(data)
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
				const token: string | null = localStorage.getItem('user')
				if (token) {
					await axios
						.post('/location', finalData, {
							headers: { Authorization: `Bearer ${token}` },
						})
						.then((res) => {
							console.log('Upload location worked')
							locationStore.addLocation(res.data)
							setPreview(null)
							setFile(null)
							reset()
						})
				}
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
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqcArrh8SQsephYJCy_WuZ8uoiXsWM7dQ&libraries=places,geometry&callback=initialize'
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
						{...register('lat')}
						type='text'
						name='lat'
						id='latitude'
						placeholder='lat'
						className={errors.lat ? 'is-invalid' : ''}></FormControl>
					<FormControl
						{...register('long')}
						type='text'
						name='long'
						id='longitude'
						placeholder='long'
						className={errors.long ? 'is-invalid' : ''}></FormControl>
					<div id='error-distance' className='hidden'></div>
				</FormElement>
				<FormElement>
					<FormLabel htmlFor='address'>Location</FormLabel>
					<FormTextArea
						readOnly={true}
						id='address'
						{...register('address')}
						name='address'
						className={errors.address ? 'is-invalid' : ''}></FormTextArea>
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
