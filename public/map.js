function initialize() {
	const google = window.google
	let address,
		marker,
		latEl = document.querySelector('#latitude'),
		longEl = document.querySelector('#longitude'),
		addressEl = document.querySelector('#address'),
		element = document.getElementById('map-canvas')
	const map = new google.maps.Map(element, {
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
