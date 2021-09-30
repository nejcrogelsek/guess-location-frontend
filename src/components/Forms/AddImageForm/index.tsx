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
		console.log(data)
		reset()
	})

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
			<Form onSubmit={onSubmit}>
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
					<FormMapWrapper></FormMapWrapper>
				</FormElement>
				<FormElement>
					<FormLabel htmlFor='location'>Location</FormLabel>
					<FormTextArea
						{...register('location', { required: 'Location is required' })}
						name='location'></FormTextArea>
					{errors.location && (
						<FormErrorText>{errors.location.message}</FormErrorText>
					)}
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
