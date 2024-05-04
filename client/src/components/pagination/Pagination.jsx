import { useContext, useMemo } from 'react';
import styles from './Pagination.module.scss';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { usePagination } from '../../hooks/usePagination';
import { useMediaQuery } from 'react-responsive';
import { handleNavLinkClick } from '../../utils/handleNavLinkClick';

const Pagination = observer(() => {
	const { product } = useContext(Context);
	const isMobile = useMediaQuery({ maxWidth: 767 }); // We track the width of the viewport using media query
	const isHideButtonText = useMediaQuery({ maxWidth: 500 });

	// Calculating the total number of pages
	const quantityPages = useMemo(() => {
		return Math.ceil(product.totalCount / product.limitOnePage);
	}, [product.totalCount, product.limitOnePage]);

	// Get an array with pages with pagination hook
	const pagesArray = usePagination(product.page, quantityPages, isMobile);

	const handlePreviousButton = () => {
		if (product.page !== 1) { // Check that the current page is not the first
			product.setPage(product.page - 1); // Installation of the previous page
			handleNavLinkClick();
		}
	}

	const handleNextButton = () => {
		if (product.page < quantityPages) {  // Check that the current page is not the last
			product.setPage(product.page + 1); // Installation of the next page
			handleNavLinkClick();
		}
	}

	return (
		<ul className={styles.paginationList}>
			<li>
				<button
					onClick={handlePreviousButton}
					className={`${styles.previousButton} ${product.page === 1 ? styles.disabledPreviousButton : ''}`}
				>
					{isHideButtonText ? '' : 'Previous'}
				</button>
			</li>
			{pagesArray.map((number) =>
				<li key={number}>
					<button
						className={`${styles.numberButton} ${product.page === number ? styles.activeNumberButton : ''}`}
						onClick={() => {
							product.setPage(number);
							handleNavLinkClick();
						}}
					>
						{number}
					</button>
				</li>
			)}
			<li>
				<button
					onClick={handleNextButton}
					className={`${styles.nextButton} ${product.page >= quantityPages ? styles.disabledNextButton : ''}`}
				>
					{isHideButtonText ? '' : 'Next'}
				</button>
			</li>
		</ul>
	);
});

export default Pagination;