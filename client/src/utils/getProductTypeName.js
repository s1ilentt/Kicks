export const getProductTypeName = (productTypeId, allProducts) => {
	const types = allProducts.types;
	let typeName = '';

	types.forEach(type => {
		if (productTypeId === type.id) {
			typeName = type.name;
		}
	});

	return typeName;
}