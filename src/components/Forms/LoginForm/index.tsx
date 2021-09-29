import axios from '../../../api/axios';
import { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { SignInData } from '../../../interfaces/auth.interface';
import { Link, Redirect } from 'react-router-dom';
import { LoginRegisterForm } from '../../shared/LoginRegister/styles';
import { ButtonStyled } from '../../shared/Button/styles';

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        reset()
    })

    return (
        <LoginRegisterForm onSubmit={onSubmit}>
            <div className='form-element'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input {...register('email', { required: 'Email is required' })} type='text' name='email' className='form-control' />
                {errors.email && <span className='form-text required'>{errors.email.message}</span>}
            </div>
            <div className='form-element'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input {...register('password', { required: 'Password is required' })} type='password' name='password' className='form-control' />
                {errors.password && <span className='form-text required'>{errors.password.message}</span>}
            </div>
            <div className='buttons'>
                <ButtonStyled size='full' type='submit'>Sign in</ButtonStyled>
            </div>
            <div className="goto-login">
                <p>Do you want to create an account?</p>
                <Link to="/signup">Sign up</Link>
            </div>
        </LoginRegisterForm>
    )
}

export default LoginForm
