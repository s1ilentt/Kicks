import { observer } from 'mobx-react-lite';
import Container from '../../../container/Container';
import ProductGroup from '../../../productGroup/ProductGroup';
import styles from './AlsoLike.module.scss';
import { useContext, useState } from 'react';
import { Context } from '../../../..';
import { Navigation, A11y, Pagination } from 'swiper/modules'; // import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { ReactComponent as Arrow } from '../../../../images/icon/arrow-right-white.svg';
import { useMediaQuery } from 'react-responsive';
import { useInView } from 'react-intersection-observer';
import { GeneralContext } from '../../../contexts/GeneralContextProvider';

const AlsoLike = observer(() => {
	const { allProducts } = useContext(Context);
	const { isProductInfoBlockLoaded } = useContext(GeneralContext);
	const [isSliderStart, setIsSliderStart] = useState(true);
	const [isSliderEnd, setIsSliderEnd] = useState(false);
	const [swiper, setSwiper] = useState(null); // We get a swiper from a state for the correct operation of its functions

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0,
	});

	const isMobile = useMediaQuery({ maxWidth: 500 }); // We track the width of the viewport using media query

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

	if (!isProductInfoBlockLoaded) {
		return null;
	}

	return (
		<section ref={ref} className={`${styles.alsoLikeSection} ${
			inView ? styles.alsoLikeSectionInView : ''}`}
		>
			<Container>
				<div className={styles.header}>
					<h2 className={styles.title}>You may also like</h2>
					<div className={styles.slideNavigationBlock}>
						<button
							className={`${styles.slideButtonPrev} ${
								isSliderStart ? styles.slideButtonPrevDisabled : ''}`}
							onClick={goPrev}
						>
							<Arrow className={styles.arrowButtonPrev} />
						</button>
						<button
							className={`${styles.slideButtonNext} ${
								isSliderEnd ? styles.slideButtonNextDisabled : ''}`}
							onClick={goNext}
						>
							<Arrow className={styles.arrowButtonNext} />
						</button>
					</div>
				</div>
				<Swiper
					className={styles.swiper}
					style={{ padding: isMobile ? '0 0 28px 0' : '0 0 38px 0' }}
					modules={[Navigation, A11y, Pagination]} // install Swiper modules
					pagination={{
						el: styles.swiperPagination,
						clickable: true,
					}}
					slidesPerView={1}
					navigation={{
						nextEl: styles.slideButtonNext,
						prevEl: styles.slideButtonPrev,
					}}
					autoHeight={true}
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
					slidesPerGroup={1}
					touchRatio={isMobile ? 0.65 : 0.75}
					speed={isMobile ? 500 : 600}
					touchAngle={30}
					spaceBetween={isMobile ? 50 : 100}
				>
					<SwiperSlide>
						<ProductGroup loadedProducts={allProducts.products.slice(0, 4)} />
					</SwiperSlide>
					<SwiperSlide>
						<ProductGroup loadedProducts={allProducts.products.slice(4, 8)} />
					</SwiperSlide>
					<SwiperSlide>
						<ProductGroup loadedProducts={allProducts.products.slice(8, 12)} />
					</SwiperSlide>
					<SwiperSlide>
						<ProductGroup loadedProducts={allProducts.products.slice(12, 16)} />
					</SwiperSlide>
				</Swiper>
			</Container>
		</section>
	);
})

export default AlsoLike;