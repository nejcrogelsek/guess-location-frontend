import { Avatar } from '@material-ui/core'
import { FC, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import { SignUpData } from '../../../interfaces/auth.interface'
import { ButtonStyled } from '../../shared/Button/styles'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormElement,
	FormErrorText,
	FormGoTo,
	FormLabel,
} from '../../shared/Form/styles'

const RegisterForm: FC = () => {
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
						{...register('email', { required: 'Email is required' })}
						type='email'
						name='email'
					/>
					{errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
				</FormElement>
				<div className='row'>
					<div className='col'>
						<FormElement>
							<FormLabel htmlFor='first_name'>First Name</FormLabel>
							<FormControl
								{...register('first_name', { required: 'First name is required' })}
								type='text'
								name='first_name'
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
								{...register('last_name', { required: 'Last name is required' })}
								type='text'
								name='last_name'
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
				<FormElement>
					<FormLabel htmlFor='confirm_password'>Confirm password</FormLabel>
					<FormControl
						{...register('confirm_password', {
							required: 'Please confirm password',
							pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
						})}
						type='password'
						name='confirm_password'
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

export default RegisterForm
