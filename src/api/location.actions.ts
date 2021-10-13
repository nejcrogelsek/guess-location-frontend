import { AxiosResponse } from 'axios'
import {
	IGuessLocation,
	LocationFormData,
} from '../interfaces/location.interface'
import axios from './axios'

export const addLocation = async (
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

export const createGuess = async (
	address: string,
	location_id: number,
	distance: string,
	token: string
): Promise<AxiosResponse<any>> => {
	const finalData = {
		address,
		distance,
		location_id,
	}
	return axios.post(`/location/guess/${location_id}`, finalData, {
		headers: { Authorization: `Bearer ${token}` },
	})
}
export const getDistanceBE = async (
	user_id: number,
	location_id: number,
	token:string
): Promise<AxiosResponse<any>> => {
	return axios.get(`/location/${location_id}/user/${user_id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
}
