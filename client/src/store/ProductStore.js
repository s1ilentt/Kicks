import { makeAutoObservable } from "mobx";

export default class ProductStore {
	// Create property this object
	constructor() {
		this._types = [];
		this._brands = [];
		this._products = [];
		this._selectedType = {};
		this._selectedBrand = {};
		this._page = 1; // Defaul current page
		this._totalCount = 0; // Defaul total count product
		this._limitOnePage = 9; // Defaul limit product in one page
		makeAutoObservable(this); // function for tracking component
	}

	// Setters for propertys this class
	setSelectedType(type) {
		this.setPage(1); // Return to the first page of the list of products
		this._selectedType = type;
	}
	setSelectedBrand(brand) {
		this.setPage(1); // Return to the first page of the list of products
		this._selectedBrand = brand;
	}
	setTypes(types) {
		this._types = types;
	}
	setBrands(brands) {
		this._brands = brands;
	}
	setProducts(products) {
		this._products = products;
	}
	setPage(page) {
		this._page = page;
	}
	setTotalCount(totalCount) {
		this._totalCount = totalCount;
	}
	setLimitOnePage(limit) {
		this._limitOnePage = limit;
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
	get selectedType() {
		return this._selectedType;
	}
	get selectedBrand() {
		return this._selectedBrand;
	}
	get page() {
		return this._page;
	}
	get totalCount() {
		return this._totalCount;
	}
	get limitOnePage() {
		return this._limitOnePage;
	}
}