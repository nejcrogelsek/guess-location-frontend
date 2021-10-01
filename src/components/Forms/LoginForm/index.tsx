import axios from '../../../api/axios'
import { FC } from 'react'
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
} from '../../shared/Form/styles'
import { ButtonStyled } from '../../shared/Button/styles'
import userStore from '../../../stores/user.store'
import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInData>()

	const onSubmit = handleSubmit((data) => {
		signin(data)
		reset()
	})

	const signin = async (data: SignInData) => {
		try {
			const repairedData = {
				username: data.email,
				password: data.password,
			}
			await axios.post('/auth/login', repairedData).then((res) => {
				userStore.login(res.data.user)
				localStorage.setItem('user', res.data.access_token)
			})
		} catch (err) {
			console.log('Error message:', err)
		}
	}

	if (userStore) {
		return <Redirect to='/me' />
	}

	return (
		<Form onSubmit={onSubmit}>
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
					{...register('password', { required: 'Password is required' })}
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
