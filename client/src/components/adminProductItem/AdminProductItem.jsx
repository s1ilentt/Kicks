import React from 'react';
import styles from './AdminProductItem.module.scss';
import { observer } from 'mobx-react-lite';
import Image from '../Image/Image';
import { getProductTypeName } from '../../utils/getProductTypeName';
import { ReactComponent as ArrowIcon } from '../../images/icon/yellow-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, PRODUCT_DETAIL_ROUTE } from '../../utils/constsPath';
import { handleNavLinkClick } from '../../utils/handleNavLinkClick';

const AdminProductItem = observer(({ product, allProducts }) => {
	const router = useNavigate();

	const handleProductCardClick = () => {
		router(ADMIN_ROUTE + PRODUCT_DETAIL_ROUTE + '/' + product.id); // Add to the beginning of the path the path of the admin so that the path relative to the root is correct
		handleNavLinkClick();
	}

	return (
		<div className={styles.productCard} onClick={handleProductCardClick}>
			<div className={styles.prodcutInfo}>
				<div className={styles.productImageWrapper}>
					<Image
						src={process.env.REACT_APP_API_URL + product.img}
						alt='product image'
					/>
				</div>
				<div>
					<h4 className={styles.infoTitle}>
						{product.name}
					</h4>
					<div className={styles.infoType}>
						{getProductTypeName(product.typeId, allProducts)} {/* Get a product type name */}
					</div>
					<div className={styles.infoPrice}>
						${product.price}
					</div>
				</div>
			</div>
			<div className={styles.description}>
				<h4 className={styles.descriptionTitle}>Summary</h4>
				<div className={styles.descriptionText}>
					{product.info?.find(item => item.title === 'description').description}
				</div>
			</div>
			<div className={styles.productStatistics}>
				<div className={styles.salesRow}>
					<div className={styles.salesText}>Sales</div>
					<div className={styles.salesCountBlock}>
						<ArrowIcon />
						<div className={styles.salesCount}>1269</div>
					</div>
				</div>
				<hr />
				<div className={styles.remainingProductsRow}>
					<div className={styles.remainingProductsText}>Remaining Products</div>
					<div className={styles.remainingProductsCountBlock}>
						<div className={styles.remainingProductsProgress}>
							<div className={styles.remainingProductsProgressBar}></div>
						</div>
						<div className={styles.remainingProductsCount}>1269</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default AdminProductItem;