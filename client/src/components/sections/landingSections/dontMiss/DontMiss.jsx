import React, { useContext, useEffect, useState } from 'react';
import styles from './DontMiss.module.scss';
import Button from '../../../UI/button/Button';
import Container from '../../../container/Container';
import ProductItem from '../../../productItem/ProductItem.jsx';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../..';
import { useNavigate } from 'react-router-dom';
import { LISTING_ROUTE } from '../../../../utils/constsPath';
import { useInView } from 'react-intersection-observer';

const DontMiss = observer(() => {
	const { allProducts } = useContext(Context);
	const arrayProducts = allProducts.products.slice(0, 4); // Choosing the first 4 elements
	const router = useNavigate();
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0,
	});

	const [loadedProducts, setLoadedProducts] = useState([]);

	// Loading elements when a block appears in the area of visibility
	useEffect(() => {
		if (inView) {
			setLoadedProducts(arrayProducts);
		}
	}, [inView]);

	return (
		<section className={styles.dontMiss}>
			<Container>
				<div className={styles.header}>
					<h2 className={styles.title}>
						Don’t miss out new drops
					</h2>
					<Button
						onClick={() => { router(LISTING_ROUTE) }}
						className={styles.button}
					>
						Shop New Drops
					</Button>
				</div>
				<div
					ref={ref}
					className={`${styles.content} ${inView ? styles.contentInView : ''}`}
				>
					{loadedProducts.map((product) =>
						<ProductItem
							key={product.id}
							product={product}
							labelInfo={{ colorYellow: true }}
						/>
					)}
				</div>
			</Container>
		</section>
	);
})

export default DontMiss;