import { Avatar } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpData } from '../../../interfaces/auth.interface'
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

const UpdateProfileForm: FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpData>()
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
							{...register('first_name', { required: 'First name is required' })}
							type='text'
							name='first_name'
						/>
						{errors.first_name && (
							<FormErrorText>{errors.first_name.message}</FormErrorText>
						)}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='last_name'>Last Name</FormLabel>
						<FormControlSecondary
							{...register('last_name', { required: 'Last name is required' })}
							type='text'
							name='last_name'
						/>
						{errors.last_name && (
							<FormErrorText>{errors.last_name.message}</FormErrorText>
						)}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<FormControlSecondary
							{...register('email', { required: 'Email is required' })}
							type='email'
							name='email'
						/>
						{errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
					</FormElement>
					<FormElement>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<FormControlSecondary
							{...register('password', {
								required: 'Password is required',
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
