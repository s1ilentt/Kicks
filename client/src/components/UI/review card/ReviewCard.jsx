import React from 'react';
import styles from './ReviewCard.module.scss';
import { ReactComponent as StarIcon } from '../../../images/icon/star.svg';
import Image from '../../Image/Image';

const ReviewCard = ({ProfileIcon, CardImage, className = ''}) => {
	return (
		<div className={`${styles.cardWrapper} ${className}`}>
			<div className={styles.cardInfo}>
				<div className={styles.cardProfile}>
					<div className={styles.reviewText}>
						<h4 className={styles.cardHeader}>Good Quality </h4>
						<p className={styles.cardText}>I highly recommend shopping from kicks</p>
					</div>
					<div className={styles.profileImage}>
						<Image
							className={styles.profileWrapperImage}
							src={ProfileIcon}
							alt='image'
						/>
					</div>
				</div>
				<div className={styles.cardRaiting}>
					<ul className={styles.raitingList}>
						<li className={styles.listItem}><StarIcon className={styles.starIcon}/></li>
						<li className={styles.listItem}><StarIcon className={styles.starIcon}/></li>
						<li className={styles.listItem}><StarIcon className={styles.starIcon}/></li>
						<li className={styles.listItem}><StarIcon className={styles.starIcon}/></li>
						<li className={styles.listItem}><StarIcon className={styles.starIcon}/></li>
					</ul>
					<span className={styles.raitingValue}>5.0</span>
				</div>
			</div>
			<div className={styles.cardImage}>
				<div className={styles.cardImageWrapper}>
					<Image
						background={true}
						src={CardImage}
						alt='image'
					/>
				</div>
			</div>
		</div>
	);
}

export default ReviewCard;