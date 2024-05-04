import React from 'react';
import styles from './ProductItem.module.scss';
import Image from '../Image/Image';
import Button from '../UI/button/Button';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../utils/constsPath';
import { handleNavLinkClick } from '../../utils/handleNavLinkClick';

const ProductItem = ({ product, labelInfo }) => {
	const router = useNavigate();

	const handleButtonOrImageClick = () => {
		router(PRODUCT_ROUTE + '/' + product.id);
		handleNavLinkClick();
	}

	return (
		<div className={styles.productCard}>
			<div
				onClick={handleButtonOrImageClick}
				className={styles.imageWrapper}
			>
				<div
					className={styles.image}
				>
					<Image
						background={true}
						src={process.env.REACT_APP_API_URL + product.img}
					/>
					<div
						className={`${styles.label} ${labelInfo.backgroundYellow ? styles.labelYellow : ''}`}
					>
						{labelInfo?.text ? labelInfo.text : 'New'}
					</div>
				</div>
			</div>
			<p className={styles.productName}>{product.name}</p>
			<Button
				background={'black'}
				className={styles.cardButton}
				onClick={handleButtonOrImageClick}
			>
				<span className={styles.textIndent}>View Product -</span>
				<span className={labelInfo?.colorYellow ? styles.productPdiceYellow : ''}>
					{product.price}$
				</span>
			</Button>
		</div>
	);
}

export default ProductItem;