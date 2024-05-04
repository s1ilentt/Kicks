export const getQuantityOfProducts = (productTypeId, typesCountInfo) => {
	if (productTypeId in typesCountInfo) {
		const quantityProducts = typesCountInfo[productTypeId];

		return quantityProducts < 10 ? `0${quantityProducts}` : quantityProducts;
	} else {
		return 0;
	}
}