import axios from './axios'
import { SignInData, SignUpData } from '../interfaces/auth.interface'
import { AxiosResponse } from 'axios'
import { UpdateUserDto } from '../interfaces/user.interface'

export const login = async (data: SignInData): Promise<AxiosResponse<any>> => {
	const finalData = {
		username: data.email,
		password: data.password,
	}
	return axios.post('/auth/login', finalData).catch((err) => {
		return err.response.data
	})
}

export const generateUploadUrl = async (): Promise<AxiosResponse<any>> => {
	return axios.get('users/upload')
}
export const uploadImage = async (url: string, file: File) => {
	axios.put(url, file, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}

export const createUser = async (
	createUserDto: SignUpData,
	image_url: string
): Promise<AxiosResponse<any>> => {
	const finalData = {
		profile_image: image_url,
		email: createUserDto.email,
		first_name: createUserDto.first_name,
		last_name: createUserDto.last_name,
		password: createUserDto.password,
		confirm_password: createUserDto.confirm_password,
	}
	return axios.post('/auth/register', finalData)
}

export const update = async (
	updateUserDto: UpdateUserDto,
	user_id: number,
	token: string
): Promise<AxiosResponse<any>> => {
	return axios.patch(
		'/users/me/update',
		{ ...updateUserDto, id: user_id },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	)
}
