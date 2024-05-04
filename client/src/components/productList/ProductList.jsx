import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ProductList.module.scss';
import { Context } from '../..';
import AdminProductItem from '../adminProductItem/AdminProductItem';

const ProductList = observer(() => {
	const { allProducts } = useContext(Context);
	const { product } = useContext(Context);

	return (
		<div className={styles.productList}>
			{product.products.map(product =>
				<AdminProductItem key={product.id} product={product} allProducts={allProducts} />
			)}
		</div>
	);
});

export default ProductList;