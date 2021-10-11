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
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const UpdateProfileForm: FC = () => {
	const validationSchema = Yup.object().shape(
		{
			first_name: Yup.string().notRequired(),
			last_name: Yup.string().notRequired(),
			password: Yup.string()
				.matches(
					/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
					'Password must have at least 1 upper & lower case letter, 1 number or special character and it must be long more than 5 characters.'
				)
				.min(6, 'Password must be at least 6 characters')
				.nullable()
				.notRequired(),
		},
		[['password', 'password']]
	)

	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdateUserDto>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})
	const onSubmit = handleSubmit((data) => {
		updateUser(data)
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
					first_name: updateUserDto.first_name,
					last_name: updateUserDto.last_name,
					profile_image: imageUrl[0],
					password: updateUserDto.password,
				}
			} else {
				finalData = {
					id: userStore.user!.id,
					first_name: updateUserDto.first_name,
					last_name: updateUserDto.last_name,
					password: updateUserDto.password,
				}
			}

			await axios.patch('/users/me/update', finalData).then((res) => {
				userStore.update(res.data)
				setPreview(null)
				setFile(null)
				reset()
			})
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
							{...register('first_name')}
							type='text'
							name='first_name'
							placeholder={userStore.user!.first_name}
							className={errors.first_name ? 'is-invalid' : ''}
						/>
						{errors.first_name && (
							<FormErrorText>{errors.first_name.message}</FormErrorText>
						)}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='last_name'>Last Name</FormLabel>
						<FormControlSecondary
							{...register('last_name')}
							type='text'
							name='last_name'
							placeholder={userStore.user!.last_name}
							className={errors.last_name ? 'is-invalid' : ''}
						/>
						{errors.last_name && (
							<FormErrorText>{errors.last_name.message}</FormErrorText>
						)}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<FormControlSecondary
							type='text'
							name='email'
							readOnly={true}
							value={userStore.user!.email}
						/>
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<FormControlSecondary
							{...register('password')}
							type='password'
							name='password'
							className={errors.password ? 'is-invalid' : ''}
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
