import axios from './axios'
import { SignInData } from '../interfaces/auth.interface'
import { AxiosResponse } from 'axios'

export const login = async (
	data: SignInData
): Promise<AxiosResponse<any>> => {
	const finalData = {
		username: data.email,
		password: data.password,
	}
	return axios.post('/auth/login', finalData).catch((err) => {
		return err.response.data
	})
}
