import { observer } from 'mobx-react-lite';
import styles from './ProductGroup.module.scss';
import ProductItem from '../productItem/ProductItem';

const ProductGroup = observer(({ loadedProducts }) => {
	return (
		<div
			className={styles.productGroup}
		>
			{loadedProducts.map((product) =>
				<ProductItem
					key={product.id}
					product={product}
					labelInfo={{ colorYellow: true }}
				/>
			)}
		</div>
	);
})

export default ProductGroup;