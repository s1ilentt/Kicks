import React, { useEffect, useRef, useState } from 'react';
import styles from './DoItRight.module.scss';
import Container from '../../../container/Container.jsx';
import Image from '../../../Image/Image.jsx';
import NikeImage from '../../../../images/landing/NikeAirMax.jpg';
import SmallNikeImage from '../../../../images/landing/NikeAirMax small.webp';
import PairNikeImage from '../../../../images/landing/pair NikeAirMax.webp';
import DetailNikeImage from '../../../../images/landing/detail NikeAirMax.webp';
import DetailNikeForModal from '../../../../images/landing/datail AirMax for modal.jpg';
import PairNikeForModal from '../../../../images/landing/pair Nike for modal.jpg';
import Button from '../../../UI/button/Button';
import SliderModal from '../../../UI/modals/slider modal/SliderModal';

const DoItRight = () => {
	const imageBlockRef = useRef(null);
	const [borderValue, setBorderValue] = useState('64px');
	const [image, setImage] = useState(window.innerWidth < 451 ? SmallNikeImage : NikeImage);
	const [showIsModal, setShowIsModal] = useState(false);
	const [slideCurrent, setSlideCurrent] = useState(0);

	useEffect(() => {
		const updateBorderValue = () => {
			if (imageBlockRef.current) {
				const imageWidth = imageBlockRef.current.offsetWidth;
				const newBorderValue = `${imageWidth / 100 * 4.848485}px`;
				setBorderValue(newBorderValue);
			}
		};

		// Call the renewal function when mounting the component
		updateBorderValue();

		// Add the window of changing the size of the window to update the value when the width changes
		const handleResize = () => {
			updateBorderValue();

			// Set initial image based on window width
			setImage(window.innerWidth < 451 ? SmallNikeImage : NikeImage);
		};

		window.addEventListener('resize', handleResize);

		// Cleaning the processor when unmounting the component
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section>
			<Container>
				<h1 className={styles.header}>
					Do it <span>right</span>
				</h1>
				<div
					ref={imageBlockRef}
					className={styles.imageBlock}
					style={{ borderRadius: borderValue }}
				>
					<Image
						src={image}
						alt='Image'
						background={true}
					/>
					<div className={styles.text}>
						<h3 className={styles.name}>NIKE AIR MAX</h3>
						<p className={styles.descriptions}>Nike introducing the new air max for everyone's comfort</p>
						<Button className={styles.textButton}>Shop now</Button>
					</div>
					<div className={styles.moreImage}>
						<div
							className={styles.imageWrapper}
							onClick={() => {
								setSlideCurrent(0);
								setShowIsModal(true);
							}}
						>
							<Image
								src={PairNikeImage}
								alt='Image'
							/>
						</div>
						<div
							className={styles.imageWrapper}
							onClick={() => {
								setSlideCurrent(1);
								setShowIsModal(true);
							}}
						>
							<Image
								src={DetailNikeImage}
								alt='Image'
							/>
						</div>
					</div>
				</div>
			</Container>
			<SliderModal
				show={showIsModal}
				onHide={() => setShowIsModal(false)}// Function for close modal window
				srcImages={[[PairNikeForModal, PairNikeForModal], [DetailNikeForModal, DetailNikeForModal]]}
				slideCurrent={slideCurrent}
				setSlideCurrent={setSlideCurrent}
			/>
		</section>
	);
};

export default DoItRight;