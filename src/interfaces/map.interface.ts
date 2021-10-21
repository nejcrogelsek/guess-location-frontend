import { Dispatch, SetStateAction } from 'react'

export interface IMap {
	mapType: google.maps.MapTypeId
	mapTypeControl?: boolean
	marker: IMarker | undefined
	setMarker: Dispatch<SetStateAction<IMarker | undefined>>
}

export interface IMarker {
	address: string
	latitude: number
	longitude: number
}

export type GoogleLatLng = google.maps.LatLng
export type GoogleMap = google.maps.Map
export type GoogleMarker = google.maps.Marker
