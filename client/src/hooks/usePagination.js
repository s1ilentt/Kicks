import { useMemo } from "react";

export const usePagination = (currentPage, totalQuantityPage, isMobile) => {
	const numbersOfPages = useMemo(() => {
		const pages = [];
		const quantityIterations = Math.min(totalQuantityPage, 5);	// Determine the amount of iterations maximum 5

		//Depending on the screen resolution, we return the pages
		if (isMobile) {
			// Add pages depending on the total number of pages
			if (totalQuantityPage <= 2) {
				for (let i = 1; i <= totalQuantityPage; i++) {
					pages.push(i);
				}
			} else {
				// Add pages depending on the current page and the total number of pages
				if (currentPage > 1 && currentPage < totalQuantityPage) {
					pages.push(1, currentPage, totalQuantityPage);
				} else if (currentPage === 1) {
					pages.push(1, 2, totalQuantityPage);
				} else if (currentPage === totalQuantityPage) {
					pages.push(1, totalQuantityPage - 1, totalQuantityPage);
				}
			}
		} else {
			// If the number of iterations is equal to the number of pages, then add all pages alternately
			if (quantityIterations === totalQuantityPage) {
				for (let i = 0; i < quantityIterations; i++) {
					pages.push(i + 1);
				}
			} else if (currentPage <= 2) { // If the selected page is less or equal to 2, then fill it in order
				pages.push(1, 2, 3, 4, totalQuantityPage); // Add all the necessary pages
			} else if (currentPage >= totalQuantityPage - 1) { // If the selected page is more or equal to the total number of pages -1, fill it in the reverse order
				// Add all the necessary pages
				pages.push(1, totalQuantityPage - 3, totalQuantityPage - 2,
					totalQuantityPage - 1, totalQuantityPage);
			} else {
				// Add all the necessary pages
				pages.push(1, currentPage - 1, currentPage, currentPage + 1, totalQuantityPage);
			}
		}

		return pages;
	}, [currentPage, totalQuantityPage, isMobile]);

	return numbersOfPages;
}