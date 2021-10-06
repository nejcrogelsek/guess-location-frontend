import axios from '../../../api/axios'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInData } from '../../../interfaces/auth.interface'
import { Link, Redirect } from 'react-router-dom'
import {
	Form,
	FormButtonsWrap,
	FormControl,
	FormElement,
	FormErrorText,
	FormGoTo,
	FormLabel,
	FormValidation,
} from '../../shared/Form/styles'
import { ButtonStyled } from '../../shared/Button/styles'
import userStore from '../../../stores/user.store'
import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
	const [error, setError] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInData>()

	const onSubmit = handleSubmit((data) => {
		signin(data)
	})

	const signin = async (data: SignInData) => {
		try {
			const finalData = {
				username: data.email,
				password: data.password,
			}
			await axios.post('/auth/login', finalData).then((res) => {
				userStore.login(res.data.user)
				localStorage.setItem('user', res.data.access_token)
				reset()
			})
		} catch (err) {
			console.log(err)
			if (err instanceof Error) {
				setError(err.message)
			} else {
				console.log(err)
				err
			}
		}
	}

	if (userStore.user?.confirmed) {
		return <Redirect to='/me' />
	}

	return (
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
			<FormElement>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<FormControl
					{...register('email', { required: 'Email is required' })}
					type='text'
					name='email'
				/>
				{errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
			</FormElement>
			<FormElement>
				<FormLabel htmlFor='password'>Password</FormLabel>
				<FormControl
					{...register('password', {
						required: 'Password is required',
						min: 6,
						pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
					})}
					type='password'
					name='password'
				/>
				{errors.password && (
					<FormErrorText>{errors.password.message}</FormErrorText>
				)}
			</FormElement>
			<FormButtonsWrap>
				<ButtonStyled size='full' type='submit'>
					Sign in
				</ButtonStyled>
			</FormButtonsWrap>
			<FormGoTo>
				<p>Do you want to create an account?</p>
				<Link to='/signup'>Sign up</Link>
			</FormGoTo>
		</Form>
	)
}

export default observer(LoginForm)
