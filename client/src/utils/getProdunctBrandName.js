export const getProductBrandName = (productBrandId, allProducts) => {
	const brands = allProducts.brands;
	let brandName = '';

	brands.forEach(brand => {
		if (productBrandId === brand.id) {
			brandName = brand.name;
		}
	});

	return brandName;
}