import { Avatar, } from '@material-ui/core';
import { FC, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import axios from '../../../api/axios';
import { SignUpData } from '../../../interfaces/auth.interface';
import { ButtonStyled } from '../../shared/Button/styles';
import { LoginRegisterForm } from '../../shared/LoginRegister/styles';

const RegisterForm: FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpData>();
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        reset()
    })

    const fileSelected = async (e: any) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === 'image') {
            setFile(file);
        } else {
            setFile(null);
        }
    }

    return (
        <>
            <LoginRegisterForm onSubmit={onSubmit}>
                <div className='form-element image'>
                    <label htmlFor='file' className='form-label'><Avatar src={preview as string} /></label>
                    <input type='file' accept='image/*' name='file' className='file-control' onChange={fileSelected} />
                </div>
                <div className='form-element'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input {...register('email', { required: 'Email is required' })} type='email' name='email' className='form-control' />
                    {errors.email && <span className='form-text required'>{errors.email.message}</span>}
                </div>
                <div className="row">
                    <div className="col">
                        <div className='form-element'>
                            <label htmlFor='first_name' className='form-label'>First Name</label>
                            <input {...register('first_name', { required: 'First name is required' })} type='text' name='first_name' className='form-control' />
                            {errors.first_name && <span className='form-text required'>{errors.first_name.message}</span>}
                        </div>
                    </div>
                    <div className="col">
                        <div className='form-element'>
                            <label htmlFor='last_name' className='form-label'>Last Name</label>
                            <input {...register('last_name', { required: 'Last name is required' })} type='text' name='last_name' className='form-control' />
                            {errors.last_name && <span className='form-text required'>{errors.last_name.message}</span>}
                        </div>
                    </div>
                </div>
                <div className='form-element'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input {...register('password', { required: 'Password is required', pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ })} type='password' name='password' className='form-control' />
                    {errors.password && <span className='form-text required'>{errors.password.message}</span>}
                </div>
                <div className='form-element'>
                    <label htmlFor='confirm_password' className='form-label'>Confirm password</label>
                    <input {...register('confirm_password', { required: 'Please confirm password', pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ })} type='password' name='confirm_password' className='form-control' />
                    {errors.confirm_password && <span className='form-text required'>{errors.confirm_password.message}</span>}
                </div>
                <div className='buttons'>
                    <ButtonStyled size='full' color='green' type='submit'>Sign up</ButtonStyled>
                </div>
                <div className="goto">
                    <p>Already have an account?</p>
                    <Link to="/login" className="orange">Sign in</Link>
                </div>
            </LoginRegisterForm>
        </>
    )
}

export default RegisterForm
