import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ListingProductLists.module.scss';
import ProductItem from '../productItem/ProductItem';
import { Context } from '../..';
import { useMediaQuery } from 'react-responsive';

const ProductList = observer(() => {
	const { product } = useContext(Context);
	const isMobile = useMediaQuery({ maxWidth: 767 }); // We track the width of the viewport using media query


	return (
		<div className={styles.productList}>
			{product.products.map((productItem, index) =>
				<ProductItem
					key={productItem.id}
					product={productItem}
					/* Depending on the screen width, we change the conditions to which 
					the data will be transmitted for the label of products and the color
					of the price of the buttons in these goods */
					labelInfo={{
						text: isMobile
							? (index === 1 || index === 4 ? '10% off' : 'New')
							: (index === 7 ? '20% off' : 'New'),
						backgroundYellow: isMobile
							? (index === 1 || index === 4 ? true : false)
							: (index === 6 || index === 8 ? false : true),
						colorYellow: isMobile
							? (true)
							: (index === 6 ? true : false),
					}}
				/>
			)}
		</div>
	);
});

export default ProductList;