import { makeAutoObservable } from "mobx";

export default class AllProductsStore {
	// Create property this object
	constructor() {
		this._types = [];
		this._brands = [];
		this._products = [];// Array all products
		makeAutoObservable(this); // function for tracking component
	}

	// Setters for propertys this class
	setTypes(types) {
		this._types = types;
	}
	setBrands(brands) {
		this._brands = brands;
	}
	setProducts(products) {
		this._products = products;
	}

	// Getters for propertys this class
	get types() {
		return this._types;
	}
	get brands() {
		return this._brands;
	}
	get products() {
		return this._products;
	}
}