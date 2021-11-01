import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInData } from '../../../interfaces/auth.interface'
import { Link, Redirect, useLocation } from 'react-router-dom'
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
import { ButtonStyled } from '../../shared/Button/styles'
import userStore from '../../../stores/user.store'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { login } from '../../../api/auth.actions'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'
import { AxiosError } from 'axios'
import { IError } from '../../../interfaces/app.interface'

const LoginForm: FC = () => {
	const [success, setSuccess] = useState<string | null>(null)
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string().required('Password is required'),
	})
	const [error, setError] = useState<any | null>(null)
	const [onErrorEmail, setOnErrorEmail] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((dataset) => {
		signin(dataset)
	})

	const signin = async (dataset: SignInData) => {
		const res = await login(dataset)
		console.log(res)
		if (res.request) {
			const data = JSON.parse(res.request.response)
			userStore.login(data.user)
			localStorage.setItem('user', data.access_token)
			reset()
		} else {
			console.log(res)
			setError(res)
			setOnErrorEmail(dataset.email)
		}
	}

	const location = useLocation()
	useEffect(() => {
		const name = new URLSearchParams(location.search).get('message')
		if (name) {
			setSuccess(name?.slice(1, name.length - 1))
		}
	}, [])

	if (userStore.user?.confirmed) {
		return <Redirect to='/me' />
	}

	return (
		<Form onSubmit={onSubmit}>
			{error && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<FormValidation>
						{error.statusCode === 401 ? `User with email: ${onErrorEmail} does not exist.` : error.message}
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
			<FormElement>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<FormControl
					{...register('email')}
					id='email'
					type='text'
					name='email'
					className={errors.email ? 'is-invalid' : ''}
				/>
				{errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
			</FormElement>
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
