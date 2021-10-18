function initializeSecond() {
	const google = window.google
	let address,
		marker2,
		latEl = document.querySelector('#latitude2'),
		longEl = document.querySelector('#longitude2'),
		addressEl = document.querySelector('#address2'),
		element = document.getElementById('map-canvas2'),
		errorEl = document.getElementById('error-distance2')

	const map2 = new google.maps.Map(element, {
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
		errorEl.value = ''
		var geocoder = new google.maps.Geocoder()
		geocoder.geocode(
			{ latLng: mapsMouseEvent.latLng },
			function (result, status) {
				if ('OK' === status) {
					address = result[0].formatted_address
					marker2.setPosition(mapsMouseEvent.latLng)
					addressEl.value = address
					latEl.value = marker2.getPosition().lat()
					longEl.value = marker2.getPosition().lng()
				} else {
					console.log(
						'Geocode was not successful for the following reason: ' + status
					)
				}
			}
		)
	})
}
