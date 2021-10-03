import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormControlSecondary,
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
			console.log(createLocationDto)
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
						name='lat'
						id='latitude'
						placeholder='lat'></FormControl>
					<FormControl
						{...register('long', { required: 'Longitude is required' })}
						name='long'
						id='longitude'
						placeholder='long'></FormControl>
				</FormElement>
				<FormElement>
					<FormLabel htmlFor='location'>Location</FormLabel>
					<FormTextArea
						className='reg-input-city'
						{...register('city', { required: 'City is required' })}
						name='location'></FormTextArea>
					{errors.city && <FormErrorText>{errors.city.message}</FormErrorText>}
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
