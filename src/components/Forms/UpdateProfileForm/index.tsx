import { Avatar } from '@material-ui/core'
import axios from '../../../api/axios'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CurrentUserName } from '../../../pages/Profile/styles'
import userStore from '../../../stores/user.store'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormControlSecondary,
	FormElement,
	FormErrorText,
	FormLabel,
} from '../../shared/Form/styles'
import { UpdateUserDto } from '../../../interfaces/user.interface'

const UpdateProfileForm: FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdateUserDto>()
	const onSubmit = handleSubmit((data) => {
		updateUser(data)
		reset()
	})

	const updateUser = async (updateUserDto: UpdateUserDto) => {
		try {
			let imageUrl: string[] | null = null
			if (file !== null) {
				const { data } = await axios.get('users/upload')

				await axios.put(data.url, file, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				imageUrl = data.url.split('?')
			}
			let finalData
			if (imageUrl) {
				finalData = {
					id: userStore.user!.id,
					email: updateUserDto.email,
					first_name: updateUserDto.first_name,
					last_name: updateUserDto.last_name,
					profile_image: imageUrl[0],
					password: updateUserDto.password,
				}
			} else {
				finalData = {
					id: userStore.user!.id,
					email: updateUserDto.email,
					first_name: updateUserDto.first_name,
					last_name: updateUserDto.last_name,
					password: updateUserDto.password,
				}
			}

			await axios.patch('/users/me/update', finalData).then((res) => {
				userStore.update(res.data)
			})
		} catch (err) {
			console.log(err)
			alert(`Email: ${updateUserDto.email} already exist!`)
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
			<Form onSubmit={onSubmit}>
				<div>
					<FormElement image='true'>
						<FormLabel htmlFor='file'>
							<Avatar src={preview as string} />
						</FormLabel>
						<FormControl
							type='file'
							accept='image/*'
							name='file'
							onChange={fileSelected}
						/>
					</FormElement>
					<CurrentUserName>
						{userStore.user && userStore.user.first_name}{' '}
						{userStore.user && userStore.user.last_name}
					</CurrentUserName>
					<FormElement>
						<FormLabel htmlFor='first_name'>First Name</FormLabel>
						<FormControlSecondary
							{...register('first_name', { required: false })}
							type='text'
							name='first_name'
							placeholder={userStore.user!.first_name}
						/>
						{errors.first_name && (
							<FormErrorText>{errors.first_name.message}</FormErrorText>
						)}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='last_name'>Last Name</FormLabel>
						<FormControlSecondary
							{...register('last_name', { required: false })}
							type='text'
							name='last_name'
							placeholder={userStore.user!.last_name}
						/>
						{errors.last_name && (
							<FormErrorText>{errors.last_name.message}</FormErrorText>
						)}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<FormControlSecondary
							{...register('email', { required: false })}
							type='text'
							name='email'
							placeholder={userStore.user!.email}
						/>
						{errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<FormControlSecondary
							{...register('password', {
								required: false,
								pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
							})}
							type='password'
							name='password'
						/>
						{errors.password && (
							<FormErrorText>{errors.password.message}</FormErrorText>
						)}
					</FormElement>
				</div>
				<FormButtonsWrap>
					<ButtonStyled size='full' color='green' type='submit'>
						Save profile
					</ButtonStyled>
				</FormButtonsWrap>
			</Form>
		</>
	)
}

export default observer(UpdateProfileForm)
