import {makeAutoObservable} from 'mobx';

export default class UserStore {
	// Create property this object
	constructor() {
		this._isAuth = false; // Defaul not is auth
		this._user = {};
		makeAutoObservable(this); // function for tracking component
	}

	// Setters for propertys this class
	setIsAuth(bool) {
		this._isAuth = bool;
	}

	setUser(user) {
		this._user = user;
	}

	// Getters for propertys this class
	get isAuth() {
		return this._isAuth;
	}

	get user() {
		return this._user;
	}
}