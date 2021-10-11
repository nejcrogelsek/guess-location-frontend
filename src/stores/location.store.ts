import axios from '../api/axios'
import { makeAutoObservable } from 'mobx'
import { IPersonalBest, LocationData } from '../interfaces/location.interface'
import DefaultImage_one from '../assets/images/default_image1.png'
import DefaultImage_two from '../assets/images/default_image2.png'
import DefaultImage_three from '../assets/images/default_image3.png'
import userStore from './user.store'

class LocationStore {
	defaultLocations: LocationData[] = [
		{
			id: 0,
			lat: 100,
			long: 100,
			city: 'Unknown',
			location_image: DefaultImage_one,
			user_id: 0,
			created_at: new Date(Date.now()),
			updated_at: new Date(Date.now()),
		},
		{
			id: 1,
			lat: 100,
			long: 100,
			city: 'Unknown',
			location_image: DefaultImage_two,
			user_id: 0,
			created_at: new Date(Date.now()),
			updated_at: new Date(Date.now()),
		},
		{
			id: 2,
			lat: 100,
			long: 100,
			city: 'Unknown',
			location_image: DefaultImage_three,
			user_id: 0,
			created_at: new Date(Date.now()),
			updated_at: new Date(Date.now()),
		},
	]
	recentLocations: LocationData[] | null = null
	personalBest: IPersonalBest[] | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async getRecent(user_id: number, token: string) {
		await axios
			.get(`/location/${user_id}`, {
				params: { _limit: 18 },
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				this.recentLocations = res.data
			})
	}

	async getPersonalBest(user_id: number, token: string) {
		await axios
			.get(`/location/best/${user_id.toString()}`, {
				data: { user_id: user_id },
				params: { _limit: 3 },
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				this.personalBest = res.data
			})
	}

	addLocation(location: LocationData) {
		this.recentLocations?.push(location)
	}

	logout() {
		this.recentLocations = null
		this.personalBest = null
	}
}
const locationStore = new LocationStore()
export default locationStore
