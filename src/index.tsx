import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Loading } from './pages'
import reportWebVitals from './reportWebVitals'
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'development') {
	config()
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
