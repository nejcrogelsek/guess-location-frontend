import { FC, useEffect, useRef, useState } from 'react'
import {
	GoogleLatLng,
	GoogleMap,
	GoogleMarker,
	IMap,
} from '../../../interfaces/map.interface'
import { FormMapWrapper } from '../Form/styles'

const Map: FC<IMap> = ({
	mapType,
	mapTypeControl = false,
	marker,
	setMarker,
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const [map, setMap] = useState<GoogleMap>()
	const [googleMarker, setGoogleMarker] = useState<GoogleMarker>()

	const startMap = (): void => {
		if (!map) {
			defaultMapStart()
		}
	}
	useEffect(startMap, [map])

	const defaultMapStart = (): void => {
		const defaultAddress = new google.maps.LatLng(46.056946, 14.505751)
		// init map & send zoom and default address value as params
		initMap(8, defaultAddress)
	}

	// init 'click' event on google maps
	const initEventListener = (): void => {
		if (map) {
			google.maps.event.addListener(map, 'click', function (e: any) {
				coordinateToAddress(e.latLng)
			})
		}
	}
	useEffect(initEventListener, [map])

	// setMarker & get info
	const coordinateToAddress = (coordinate: GoogleLatLng) => {
		const geocoder = new google.maps.Geocoder()
		geocoder.geocode({ location: coordinate }, function (results, status) {
			if (status === 'OK') {
				setMarker({
					address: results[0].formatted_address,
					latitude: coordinate.lat(),
					longitude: coordinate.lng(),
				})
			}
		})
	}

	// when marker changes, the addMarker function is ran
	useEffect(() => {
		if (marker) {
			addMarker(new google.maps.LatLng(marker.latitude, marker.longitude))
		}
	}, [marker])

	const addMarker = (location: GoogleLatLng): void => {
		const marker: GoogleMarker = new google.maps.Marker({
			position: location,
			map: map,
			icon: getIconAttributes('#000000'),
		})

		// remove previous marker
		googleMarker?.setMap(null)

		// add new marker to map
		setGoogleMarker(marker)
	}

	// google maps icon
	const getIconAttributes = (iconColor: string) => {
		return {
			path:
				'M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z',
			fillColor: iconColor,
			fillOpacity: 0.8,
			strokeColor: '#ffffff',
			strokeWeight: 2,
			anchor: new google.maps.Point(30, 50),
		}
	}

	// google maps init function
	const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
		if (ref.current) {
			setMap(
				new google.maps.Map(ref.current, {
					zoom: zoomLevel,
					center: address,
					mapTypeControl: mapTypeControl,
					streetViewControl: false,
					rotateControl: false,
					scaleControl: true,
					fullscreenControl: false,
					panControl: false,
					zoomControl: true,
					gestureHandling: 'cooperative',
					mapTypeId: mapType,
					draggableCursor: 'pointer',
				})
			)
		}
	}

	return <FormMapWrapper ref={ref}></FormMapWrapper>
}

export default Map
