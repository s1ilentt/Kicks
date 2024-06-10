import AlsoLike from "../components/sections/productSections/alsoLike/AlsoLike";
import ProductDescription from "../components/sections/productSections/productDescription/ProductDescription";

const Product = () => {
	return (
		<div className='product-page'>
			<ProductDescription />
			<AlsoLike />
		</div>
	);
}

export default Product;