import { AxiosResponse } from 'axios'
import { LocationFormData } from '../interfaces/location.interface'
import axios from './axios'

export const addLocation = (
	createLocationDto: LocationFormData,
	image_url: string,
	token: string
): Promise<AxiosResponse<any>> => {
	const finalData = {
		...createLocationDto,
		location_image: image_url,
	}
	return axios.post('/location', finalData, {
		headers: { Authorization: `Bearer ${token}` },
	})
}
