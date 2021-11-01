import { FC, FormEvent, useEffect, useState } from 'react'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormElement,
	FormElementImageUpload,
	FormImagePlaceholder,
	FormLabel,
	FormTextArea,
	FormValidation,
	FormValidationSuccess,
} from '../../shared/Form/styles'
import ImagePlaceholder from '../../../assets/images/image-placeholder.png'
import { generateUploadUrl, uploadImage } from '../../../api/auth.actions'
import { addLocation } from '../../../api/location.actions'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'
import { IMarker } from '../../../interfaces/map.interface'
import { Map } from '../../shared/Map'

const AddImageForm: FC = () => {
	const [marker, setMarker] = useState<IMarker>()
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)

	const uploadLocation = async (e: FormEvent) => {
		try {
			e.preventDefault()
			if (file !== null) {
				if (marker && marker.address && marker.latitude && marker.longitude) {
					const { data } = await generateUploadUrl()
					uploadImage(data.url, file)
					const imageUrl = data.url.split('?')
					const token: string | null = localStorage.getItem('user')
					if (token) {
						const res = await addLocation({ address: marker.address, lat: marker.latitude, long: marker.longitude, location_image: '' }, imageUrl[0], token)
						if (res.data) {
							setSuccess('Location successfully added.')
							setPreview(null)
							setFile(null)
						} else {
							setError('error')
						}
					}
				} else {
					setError('You need to select a location on the map.')
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

	return (
		<>
			<Form className='relative' onSubmit={uploadLocation}>
				{error && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<FormValidation>
							{error}
							<CloseIcon onClick={setError} />
						</FormValidation>
					</motion.div>
				)}
				{success && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<FormValidationSuccess>
							{success}
							<CloseIcon onClick={setSuccess} />
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
					<Map
						mapType={google.maps.MapTypeId.ROADMAP}
						mapTypeControl={true}
						marker={marker}
						setMarker={setMarker}
					/>
				</FormElement>
				<FormElement>
					<FormLabel htmlFor='address'>Location</FormLabel>
					<FormTextArea
						readOnly={true}
						id='address'
						value={marker && marker.address}
						name='address'></FormTextArea>
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
