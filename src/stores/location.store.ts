import axios from '../api/axios'
import { makeAutoObservable } from 'mobx'
import { LocationData } from '../interfaces/location.interface'

class LocationStore {
	recentLocations: LocationData[] | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async getRecent() {
		await axios.get('/location', { params: { _limit: 18 } }).then((res) => {
			this.recentLocations = res.data
		})
	}

	addLocation(location:LocationData){
		this.recentLocations?.push(location)
	}
}
const locationStore = new LocationStore()
export default locationStore
