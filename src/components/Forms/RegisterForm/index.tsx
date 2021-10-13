import { Avatar } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import { SignUpData } from '../../../interfaces/auth.interface'
import userStore from '../../../stores/user.store'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormElement,
	FormErrorText,
	FormGoTo,
	FormLabel,
	FormValidation,
	FormValidationSuccess,
} from '../../shared/Form/styles'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	generateUploadUrl,
	uploadImage,
	createUser,
} from '../../../api/auth.actions'

const RegisterForm: FC = () => {
	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		first_name: Yup.string().required('First name is required'),
		last_name: Yup.string().required('Last name is required'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
				'Password must have at least 1 upper & lower case letter, 1 number or special character and it must be long more than 5 characters.'
			)
			.min(6, 'Password must be at least 6 characters'),
		confirm_password: Yup.string()
			.required('Password is required')
			.oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
	} = useForm<SignUpData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((data) => {
		signup(data)
	})

	const signup = async (createUserDto: SignUpData) => {
		try {
			if (file !== null) {
				const { data } = await generateUploadUrl()
				uploadImage(data.url, file)
				const imageUrl = data.url.split('?')

				const res = await createUser(createUserDto, imageUrl[0])
				if (res.data) {
					setSuccess('Check your inbox and verify your email.')
					setPreview(null)
					setFile(null)
					reset()
				} else {
					setError('error')
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

	if (userStore.user?.confirmed) {
		return <Redirect to='/me' />
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				{error && (
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
				)}
				{success && (
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
				)}
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
				<FormElement>
					<FormLabel htmlFor='email'>Email</FormLabel>
					<FormControl
						{...register('email')}
						type='email'
						name='email'
						className={errors.email ? 'is-invalid' : ''}
					/>
					{errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
				</FormElement>
				<div className='row'>
					<div className='col'>
						<FormElement>
							<FormLabel htmlFor='first_name'>First Name</FormLabel>
							<FormControl
								{...register('first_name')}
								type='text'
								name='first_name'
								className={errors.first_name ? 'is-invalid' : ''}
							/>
							{errors.first_name && (
								<FormErrorText>{errors.first_name.message}</FormErrorText>
							)}
						</FormElement>
					</div>
					<div className='col'>
						<FormElement>
							<FormLabel htmlFor='last_name'>Last Name</FormLabel>
							<FormControl
								{...register('last_name')}
								type='text'
								name='last_name'
								className={errors.last_name ? 'is-invalid' : ''}
							/>
							{errors.last_name && (
								<FormErrorText>{errors.last_name.message}</FormErrorText>
							)}
						</FormElement>
					</div>
				</div>
				<FormElement>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<FormControl
						{...register('password')}
						type='password'
						name='password'
						className={errors.password ? 'is-invalid' : ''}
					/>
					{errors.password && (
						<FormErrorText>{errors.password.message}</FormErrorText>
					)}
				</FormElement>
				<FormElement>
					<FormLabel htmlFor='confirm_password'>Confirm password</FormLabel>
					<FormControl
						{...register('confirm_password')}
						type='password'
						name='confirm_password'
						className={errors.confirm_password ? 'is-invalid' : ''}
					/>
					{errors.confirm_password && (
						<FormErrorText>{errors.confirm_password.message}</FormErrorText>
					)}
				</FormElement>
				<FormButtonsWrap>
					<ButtonStyled size='full' color='green' type='submit'>
						Sign up
					</ButtonStyled>
				</FormButtonsWrap>
				<FormGoTo>
					<p>Already have an account?</p>
					<Link to='/login'>Sign in</Link>
				</FormGoTo>
			</Form>
		</>
	)
}

export default observer(RegisterForm)
