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
	FormValidation,
	FormValidationSuccess,
} from '../../shared/Form/styles'
import ImagePlaceholder from '../../../assets/images/image-placeholder.png'
import { LocationFormData } from '../../../interfaces/location.interface'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { generateUploadUrl, uploadImage } from '../../../api/auth.actions'
import { addLocation } from '../../../api/location.actions'
import { motion } from 'framer-motion'

const AddImageForm: FC = () => {
	const validationSchema = Yup.object().shape({
		lat: Yup.string().required('Latitude is required'),
		long: Yup.string().required('Longitude is required'),
		address: Yup.string().required('Address is required'),
	})
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
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
				const { data } = await generateUploadUrl()
				uploadImage(data.url, file)
				const imageUrl = data.url.split('?')
				const token: string | null = localStorage.getItem('user')
				if (token) {
					const res = await addLocation(createLocationDto, imageUrl[0], token)
					if (res.data) {
						setSuccess('Location successfully added.')
						setPreview(null)
						setFile(null)
						reset()
					} else {
						setError('error')
					}
				}
			} else {
				setError('You need to upload a profile image.')
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
				{error && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
					</motion.div>
				)}
				{success && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
					</motion.div>
				)}
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
