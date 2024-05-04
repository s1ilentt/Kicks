import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Categories.module.scss';
import { Navigation, A11y } from 'swiper/modules';// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';// Import Swiper styles
import { useMediaQuery } from 'react-responsive';
import Image from '../../../Image/Image';
import LifeStyleShoes from '../../../../images/landing/lifestyle shoes.webp';
import BasketballShoes from '../../../../images/landing/basketball shoes.webp';
import HikingShoes from '../../../../images/landing/hiking shoes.webp';
import OutdoorShoes from '../../../../images/landing/outdoor shoes.webp';
import RunnersShoes from '../../../../images/landing/runners shoes.webp';
import SneakerShoes from '../../../../images/landing/sneaker shoes.webp';
import Container from '../../../container/Container';
import { ReactComponent as Arrow } from '../../../../images/icon/arrow right.svg';
import { ReactComponent as DiagonalArrow } from '../../../../images/icon/diagonal arrow.svg';
import { GeneralContext } from '../../../contexts/GeneralContextProvider';

const Categories = () => {
	const [isSliderStart, setIsSliderStart] = useState(true);
	const [isSliderEnd, setIsSliderEnd] = useState(false);
	const [swiper, setSwiper] = useState(null); // We get a swiper from a state for the correct operation of its functions
	const isMobile = useMediaQuery({ maxWidth: 767 }); // We track the width of the viewport using media query
	const categoryRef = useRef(null);
	const { isBlack, setIsBlack } = useContext(GeneralContext);

	// Scroll processor to change the condition of isBlack
	const handleScroll = () => {
		if (categoryRef.current) {
			const element = categoryRef.current;
			const elementRect = element.getBoundingClientRect();

			/* We carry out the check so that during the upper boundary
				of the viewport to be in the isBlack is true */
			if (elementRect.top <= 7 && elementRect.top >= -element.clientHeight + 7) {
				if (!isBlack) {
					setIsBlack(true);
				}
			} else {
				if (isBlack) {
					setIsBlack(false);
				}
			}
		}
	};

	// Adding and removing the scroll processor when mounting and defining the component
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isBlack]); // Adding isBlack depending on the correct operation of useEffect

	// Switching to the next slide
	const goNext = () => {
		if (swiper) {
			swiper.slideNext();
		}
	};

	// Switching to the previous slide
	const goPrev = () => {
		if (swiper) {
			swiper.slidePrev();
		}
	};

	// Updating the state of the slider
	const updateSliderState = (isStart, isEnd) => {
		setIsSliderStart(isStart);
		setIsSliderEnd(isEnd);
	}

	return (
		<section ref={categoryRef} className={styles.categories}>
			<Container>
				<div className={styles.header}>
					<h2 className={styles.headerText}>Categories</h2>
					<div className={styles.slidePaginationBlock}>
						<button
							className={`${styles.slideButtonPrev} ${isSliderStart ? styles.slideButtonPrevDisabled : ''}`}
							onClick={goPrev}
						>
							<Arrow className={styles.arrowButtonPrev} />
						</button>
						<button
							className={`${styles.slideButtonNext} ${isSliderEnd ? styles.slideButtonNextDisabled : ''}`}
							onClick={goNext}
						>
							<Arrow className={styles.arrowButtonNext} />
						</button>
					</div>
				</div>
				<div className={styles.slider}>
					{/* Change the structure of the slider depending on the device*/}
					{!isMobile ?
						<Swiper
							className={styles.swiper}
							modules={[Navigation, A11y]} // install Swiper modules
							slidesPerView={2}
							navigation={{
								nextEl: styles.slideButtonNext,
								prevEl: styles.slideButtonPrev,
							}}
							// We set the swiper to the state
							onSwiper={(swiperInstance) => {
								setSwiper(swiperInstance);
							}}
							// When scrolling a swiper, check his status with his setting in a state
							onSlideChange={() => {
								if (swiper) {
									updateSliderState(swiper.isBeginning, swiper.isEnd);
								}
							}}
							slidesPerGroup={2}
							touchRatio={1.1}
							speed={500}
						>
							<SwiperSlide>
								<div className={styles.slideWrapper}>
									<div className={styles.slideImage}>
										<Image
											className={styles.slideImageHover}
											src={LifeStyleShoes}
											alt='Image'
											background={true}
										/>
									</div>
									<div className={styles.slideText}>Lifestyle Shoes</div>
									<button className={styles.slideButton}>
										<DiagonalArrow
											className={styles.diagonalArrow}
										/>
									</button>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${styles.slideWrapper} ${styles.slideWrapperRight}`}>
									<div className={styles.slideImage}>
										<Image
											className={styles.slideImageHover}
											src={BasketballShoes}
											alt='Image'
											background={true}
										/>
									</div>
									<div className={styles.slideText}>Basketball Shoes</div>
									<button className={styles.slideButton}>
										<DiagonalArrow
											className={styles.diagonalArrow}
										/>
									</button>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={styles.slideWrapper}>
									<div className={styles.slideImage}>
										<Image
											className={styles.flipHorizontal}
											src={HikingShoes}
											alt='Image'
											background={true}
										/>
									</div>
									<div className={styles.slideText}>Hiking Shoes</div>
									<button className={styles.slideButton}>
										<DiagonalArrow
											className={styles.diagonalArrow}
										/>
									</button>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${styles.slideWrapper} ${styles.slideWrapperRight}`}>
									<div className={styles.slideImage}>
										<Image
											className={styles.outdoorImage}
											src={OutdoorShoes}
											alt='Image'
											background={true}
										/>
									</div>
									<div className={styles.slideText}>Outdoor Shoes</div>
									<button className={styles.slideButton}>
										<DiagonalArrow
											className={styles.diagonalArrow}
										/>
									</button>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${styles.slideWrapper} ${styles.slideWrapperLeftLast}`}>
									<div className={styles.slideImage}>
										<Image
											className={styles.flipHorizontal}
											src={SneakerShoes}
											alt='Image'
											background={true}
										/>
									</div>
									<div className={styles.slideText}>Sneaker Shoes</div>
									<button className={styles.slideButton}>
										<DiagonalArrow
											className={styles.diagonalArrow}
										/>
									</button>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${styles.slideWrapper} ${styles.slideWrapperRightLast}`}>
									<div className={styles.slideImage}>
										<Image
											className={styles.flipHorizontal}
											src={RunnersShoes}
											alt='Image'
											background={true}
										/>
									</div>
									<div className={styles.slideText}>Runners Shoes</div>
									<button className={styles.slideButton}>
										<DiagonalArrow
											className={styles.diagonalArrow}
										/>
									</button>
								</div>
							</SwiperSlide>
						</Swiper>
						:
						<Swiper
							className={styles.swiper}
							modules={[Navigation, A11y]} // install Swiper modules
							slidesPerView={1}
							navigation={{
								nextEl: styles.slideButtonPrev,
								prevEl: styles.slideButtonNext,
							}}
							onSwiper={(swiperInstance) => {
								setSwiper(swiperInstance);
							}}
							onSlideChange={() => {
								if (swiper) {
									updateSliderState(swiper.isBeginning, swiper.isEnd);
								}
							}}
							slidesPerGroup={1}
							touchRatio={0.75}
							speed={500}
							touchAngle={30}
						>
							<SwiperSlide>
								<div className={styles.twoSlideWrapper}>
									<div className={styles.slideWrapper}>
										<div className={styles.slideImage}>
											<Image
												className={styles.slideImageHover}
												src={LifeStyleShoes}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.slideText}>Lifestyle Shoes</div>
										<button className={styles.slideButton}>
											<DiagonalArrow
												className={styles.diagonalArrow}
											/>
										</button>
									</div>
									<div className={`${styles.slideWrapper} ${styles.slideWrapperRight}`}>
										<div className={styles.slideImage}>
											<Image
												className={styles.slideImageHover}
												src={BasketballShoes}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.slideText}>Basketball Shoes</div>
										<button className={styles.slideButton}>
											<DiagonalArrow
												className={styles.diagonalArrow}
											/>
										</button>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={styles.twoSlideWrapper}>
									<div className={styles.slideWrapper}>
										<div className={styles.slideImage}>
											<Image
												className={styles.flipHorizontal}
												src={HikingShoes}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.slideText}>Hiking Shoes</div>
										<button className={styles.slideButton}>
											<DiagonalArrow
												className={styles.diagonalArrow}
											/>
										</button>
									</div>
									<div className={`${styles.slideWrapper} ${styles.slideWrapperRight}`}>
										<div className={styles.slideImage}>
											<Image
												className={styles.outdoorImage}
												src={OutdoorShoes}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.slideText}>Outdoor Shoes</div>
										<button className={styles.slideButton}>
											<DiagonalArrow
												className={styles.diagonalArrow}
											/>
										</button>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={styles.twoSlideWrapper}>
									<div className={`${styles.slideWrapper} ${styles.slideWrapperLeftLast}`}>
										<div className={styles.slideImage}>
											<Image
												className={styles.flipHorizontal}
												src={SneakerShoes}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.slideText}>Sneaker Shoes</div>
										<button className={styles.slideButton}>
											<DiagonalArrow
												className={styles.diagonalArrow}
											/>
										</button>
									</div>
									<div className={`${styles.slideWrapper} ${styles.slideWrapperRightLast}`}>
										<div className={styles.slideImage}>
											<Image
												className={styles.flipHorizontal}
												src={RunnersShoes}
												alt='Image'
												background={true}
											/>
										</div>
										<div className={styles.slideText}>Runners Shoes</div>
										<button className={styles.slideButton}>
											<DiagonalArrow
												className={styles.diagonalArrow}
											/>
										</button>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					}
				</div>
			</Container>
		</section>
	);
}

export default Categories;