import { $host, $authHost } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (email, password) => {
	const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });// We send a request with information about the user the role admin
	localStorage.setItem('token', data.token);// We place token in the storage
	return ({user: jwt_decode(data.token), message: data.message}); // Return parsing token with info of user
}

export const login = async (email, password) => {
	const { data } = await $host.post('api/user/login', { email, password });// We send a request with information about the user
	localStorage.setItem('token', data.token);// We place token in the storage
	return jwt_decode(data.token);// Return parsing token with info of user
}

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth');// We send query for validation token
	localStorage.setItem('token', data.token);// We place token in the storage
	return jwt_decode(data.token);// Return parsing token with info of user

}