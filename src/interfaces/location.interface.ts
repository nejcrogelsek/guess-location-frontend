export interface LocationFormData {
	lat: string,
	long: string
	location_image: string
	address: string
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
	lat: string
	lng: string
}
