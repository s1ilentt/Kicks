import axios from 'axios';

// Create pablic host
const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL,// Add to the beginning of the line of the request of url server Host
})

// Create private host
const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL, // Add to the beginning of the line of the request of url server host
})

// Returns a new config before request to API
const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;// Add token to the request header
	return config;
}

// Use interceptor for authHost before request
$authHost.interceptors.request.use(authInterceptor);

// $authHost.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		if (axios.isAxiosError(error)) {
// 			console.log(error, 'error');
// 			console.log(error.response?.data.message, 'error');
// 		} else if (error instanceof Error) {
// 			console.log(error.message);
// 		}
// 	}
// )

// Export
export {
	$host,
	$authHost
}