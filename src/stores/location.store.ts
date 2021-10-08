import axios from '../api/axios'
import { makeAutoObservable } from 'mobx'
import { IPersonalBest, LocationData } from '../interfaces/location.interface'

class LocationStore {
	recentLocations: LocationData[] | null = null
	personalBest: IPersonalBest[] | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async getRecent() {
		await axios.get('/location', { params: { _limit: 18 } }).then((res) => {
			this.recentLocations = res.data
		})
	}

	async getPersonalBest(user_id: number) {
		await axios
			.get(`/location/best/${user_id.toString()}`, { data: { user_id: user_id }, params: { _limit: 3 } })
			.then((res) => {
				this.personalBest = res.data
			})
	}

	addLocation(location: LocationData) {
		this.recentLocations?.push(location)
	}
}
const locationStore = new LocationStore()
export default locationStore
