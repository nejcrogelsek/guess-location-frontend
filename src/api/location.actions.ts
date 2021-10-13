import { AxiosResponse } from 'axios'
import { LocationFormData } from '../interfaces/location.interface'
import axios from './axios'

export const addLocation = (
	finalData: LocationFormData,
	token: string
): Promise<AxiosResponse<any>> => {
	return axios.post('/location', finalData, {
		headers: { Authorization: `Bearer ${token}` },
	})
}
