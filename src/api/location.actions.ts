import { AxiosError, AxiosResponse } from 'axios'
import { IGuessLocationData, LocationData, LocationFormData } from '../interfaces/location.interface'
import axios from './axios'

export const addLocation = async (
	createLocationDto: LocationFormData,
	image_url: string,
	token: string
): Promise<AxiosResponse<LocationData> | AxiosError> => {
	const finalData = {
		...createLocationDto,
		location_image: image_url,
	}
	return axios.post('/location', finalData, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const createGuess = async (
	address: string,
	location_id: number,
	lat:number,
	lng: number,
	token: string
): Promise<AxiosResponse<IGuessLocationData> | AxiosError> => {
	const finalData = {
		address,
		lat,
		lng,
		location_id,
	}
	return axios.post(`/location/guess/${location_id}`, finalData, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const getDistanceBE = async (
	user_id: number,
	location_id: number,
	token: string
): Promise<AxiosResponse<IGuessLocationData>> => {
	return axios.get(`/location/${location_id}/user/${user_id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
}
