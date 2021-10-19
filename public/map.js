function initialize() {
	const google = window.google
	let address,
		marker,
		map,
		latEl = document.querySelector('#latitude'),
		longEl = document.querySelector('#longitude'),
		addressEl = document.querySelector('#address'),
		element = document.getElementById('map-canvas'),
		errorEl = document.getElementById('error-distance')

	map = new google.maps.Map(element, {
		zoom: 8,
		center: { lat: 46.056946, lng: 14.505751 },
		draggable: true,
		disableDefaultUI: true,
	})

	marker = new google.maps.Marker({
		position: { lat: 46.056946, lng: 14.505751 },
		map: map,
		draggable: false,
	})

	map.addListener('click', (mapsMouseEvent) => {
		errorEl.value = ''
		var geocoder = new google.maps.Geocoder()
		geocoder.geocode(
			{ latLng: mapsMouseEvent.latLng },
			function (result, status) {
				if ('OK' === status) {
					address = result[0].formatted_address
					marker.setPosition(mapsMouseEvent.latLng)
					addressEl.value = address
					latEl.value = marker.getPosition().lat()
					longEl.value = marker.getPosition().lng()
				} else {
					console.log(
						'Geocode was not successful for the following reason: ' + status
					)
				}
			}
		)
	})
}
function initializeSecond() {
	const google = window.google
	let address,
		marker2,
		latEl2 = document.querySelector('#latitude2'),
		longEl2 = document.querySelector('#longitude2'),
		addressEl2 = document.querySelector('#address2'),
		element2 = document.getElementById('map-canvas2'),
		errorEl2 = document.getElementById('error-distance2')

	const map2 = new google.maps.Map(element2, {
		zoom: 8,
		center: { lat: 46.056946, lng: 14.505751 },
		draggable: true,
		disableDefaultUI: true,
	})

	marker2 = new google.maps.Marker({
		position: { lat: 46.056946, lng: 14.505751 },
		map: map2,
		draggable: false,
	})
	map2.addListener('click', (mapsMouseEvent) => {
		errorEl2.value = ''
		var geocoder = new google.maps.Geocoder()
		geocoder.geocode(
			{ latLng: mapsMouseEvent.latLng },
			function (result, status) {
				if ('OK' === status) {
					address = result[0].formatted_address
					marker2.setPosition(mapsMouseEvent.latLng)
					addressEl2.value = address
					latEl2.value = marker2.getPosition().lat()
					longEl2.value = marker2.getPosition().lng()
				} else {
					console.log(
						'Geocode was not successful for the following reason: ' + status
					)
				}
			}
		)
	})
}
