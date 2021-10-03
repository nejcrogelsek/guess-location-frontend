export interface LocationFormData {
	lat: number,
	long: number
	location_image: string
	city: string
}
export interface LocationData {
	location_image: string
	location: {
		name: string
		lat: number
		long: number
	}
}
export interface IGuessLocation{
	lat: number
	lng: number
}
