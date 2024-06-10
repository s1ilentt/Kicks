import React, { useEffect, useState } from 'react';
import styles from './Reviews.module.scss';
import Button from '../../../UI/button/Button';
import Container from '../../../container/Container';
import Profile_1 from '../../../../images/landing/profile 1.jpg';
import Profile_2 from '../../../../images/landing/profile 2.jpg';
import Profile_3 from '../../../../images/landing/profile 3.jpg';
import CardImage_1 from '../../../../images/landing/card image 1.jpg';
import CardImage_2 from '../../../../images/landing/card image 2.jpg';
import CardImage_3 from '../../../../images/landing/card image 3.jpg';
import ReviewCard from '../../../UI/review card/ReviewCard';
import { useInView } from 'react-intersection-observer';
import ModalComments from '../../../UI/modals/modal comments/ModalComments';

const Reviews = () => {
	const [blockInView, setBlockInView] = useState(false);
	const [showIsModal, setShowIsModal] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0,
	});

	// Loading elements when a block appears in the area of visibility
	useEffect(() => {
		if (inView) {
			setBlockInView(true);
		}
	}, [inView]);

	return (
		<section className={styles.reviews}>
			<Container>
				<div className={styles.header}>
					<h2 className={styles.headerText}>Reviews</h2>
					<Button
						className={styles.headerButton}
						onClick={() => {
							setShowIsModal(true);
						}}
					>
						See all
					</Button>
				</div>
				<div
					ref={ref}
					className={`${styles.cards} ${blockInView ? styles.cardsInView : ''}`}
				>
					{blockInView ?
						<>
							<ReviewCard
								ProfileIcon={Profile_1}
								CardImage={CardImage_1}
							/>
							<ReviewCard
								className={styles.centerCardWrapper}
								ProfileIcon={Profile_2}
								CardImage={CardImage_2}
							/>
							<ReviewCard
								ProfileIcon={Profile_3}
								CardImage={CardImage_3}
								className={styles.lastCardWrapper}
							/>
						</>
						:
						null
					}
				</div>
			</Container>
			<ModalComments
				show={showIsModal}
				onHide={() => setShowIsModal(false)}// Function for close modal window
			/>
		</section>
	);
}

export default Reviews;