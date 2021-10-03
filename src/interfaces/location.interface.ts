export interface LocationFormData {
	lat: string
	long: string
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
}
