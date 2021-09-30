import axios from '../../../api/axios'
import { FC, useContext } from 'react'
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

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInData>()

	const onSubmit = handleSubmit((data) => {
		console.log(data)
		reset()
	})

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

export default LoginForm
