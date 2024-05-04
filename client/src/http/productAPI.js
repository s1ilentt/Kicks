import { $host, $authHost } from "./index";

/* Functions for requests for the server using the created axios requests */

export const createType = async (type) => {
	const { data } = await $authHost.post('api/type', type);
	return data;
}

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type');
	return data;
}

export const deleteType = async (id) => {
	const { data } = await $authHost.delete('api/type/' + id);
	return data;
}

export const createBrand = async (brand) => {
	const { data } = await $authHost.post('api/brand', brand);
	return data;
}

export const deleteBrand = async (id) => {
	const { data } = await $authHost.delete('api/brand/' + id);
	return data;
}

export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand');
	return data;
}

export const createProduct = async (product) => {
	const { data } = await $authHost.post('api/product', product);
	return data;
}

export const updateProduct = async (id, product) => {
	const { data } = await $authHost.put('api/product/' + id, product);
	return data;
}

export const deleteProduct = async (id) => {
	const { data } = await $authHost.delete('api/product/' + id);
	return data;
}

// Get all products with params 
export const fetchProducts = async (brandId, typeId, page, limit) => {
	const { data } = await $host.get('api/product', {
		params: {
			brandId, typeId, page, limit // The parameters attached to the line of the query for sorting products
		}
	});
	return data;
}

export const fetchOneProduct = async (id) => {
	const { data } = await $host.get('api/product/' + id);
	return data;
}
