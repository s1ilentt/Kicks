export const useTypesCountInfo = (allProducts) => {
	const typesCountInfo = {};

	// Initialize counters for each type
	allProducts.types.forEach((type) => {
		typesCountInfo[`${type.id}`] = 0;
	});

	// We count products for each type
	allProducts.products.forEach((product) => {
		// We increase the counter for the corresponding Typeid
		typesCountInfo[`${product.typeId}`]++;
	});

	return typesCountInfo;
}