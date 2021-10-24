export interface LocationFormData {
	lat: number
	long: number
	location_image: string
	address: string
}
export interface LocationData {
	id: number
	lat: number
	long: number
	city: string
	location_image: string
	user_id: number
	created_at: Date
	updated_at: Date
}
export interface IGuessLocation {
	lat: string
	lng: string
	address: string
}
export interface IGuessLocationData {
	location_id: number
	user_id: number
	distance: number
	address: string
	id: number
	created_at: Date
	updated_at: Date
}
export interface IPersonalBest {
	location: LocationData
	distance: number
}
