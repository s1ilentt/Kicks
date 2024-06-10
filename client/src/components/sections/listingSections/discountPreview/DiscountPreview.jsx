import React from 'react';
import Container from '../../../container/Container';
import styles from './DiscountPreview.module.scss';
import Image from '../../../Image/Image.jsx';
import DiscountImage from '../../../../images/listing/listing-background-img.png';
import DiscountImageSmall from '../../../../images/listing/listing-background-img-small.png';
import { useMediaQuery } from 'react-responsive';

const DiscountPreview = () => {
	const isMobile = useMediaQuery({ maxWidth: 500 }); // We track the width of the viewport using media query

	return (
		<section>
			<Container>
				<div className={styles.imageBlock}>
					<Image
						src={isMobile ? DiscountImageSmall : DiscountImage}
						background={true}
					/>
					<div className={styles.textBlock}>
						<div className={styles.description}>Limited time only</div>
						<h2 className={styles.title}>Get 30% off</h2>
						<div className={styles.text}>
							Sneakers made with your comfort in mind so you can
							put all of your focus into your next session.
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}

export default DiscountPreview;