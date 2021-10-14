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

const LoginForm: FC = () => {
	const [success, setSuccess] = useState<string | null>(null)
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string().required('Password is required'),
	})
	const [error, setError] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((data) => {
		signin(data)
	})

	const signin = async (data: SignInData) => {
		try {
			const res = await login(data)
			if (res.data) {
				userStore.login(res.data.user)
				localStorage.setItem('user', res.data.access_token)
				reset()
			} else {
				setError('error')
			}
		} catch (err) {
			console.log(err)
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
						{error}
						<CloseIcon setError={setError} />
					</FormValidation>
				</motion.div>
			)}
			{success && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<FormValidationSuccess>
						{success}
						<CloseIcon setSuccess={setSuccess} />
					</FormValidationSuccess>
				</motion.div>
			)}
			<FormElement>
				<FormLabel htmlFor='email'>Email</FormLabel>
				<FormControl
					{...register('email')}
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
