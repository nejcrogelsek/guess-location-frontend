import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Loading } from './pages'
import reportWebVitals from './reportWebVitals'
import * as dotenv from 'dotenv'
import 'core-js/es/promise'
import 'core-js/es/set'
import 'core-js/es/map'

if (process.env.NODE_ENV === 'development') {
	dotenv.config()
}

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<Loading />}>
			<App />
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
