// Import
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '..';

// Component pagination
const Pages = observer(() => {
	const { product } = useContext(Context);
	// Get quantity all page
	const pageCount = Math.ceil(product.totalCount / product.limitOnePage);
	const pages = [];

	// Fill in numbers of pages variable page
	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1);
	}

	return (
		<Pagination className='mt-5'>
			{pages.map(page =>
				<Pagination.Item
					key={page}
					active={product.page === page}// We make an active page
					onClick={() => product.setPage(page)}// Send in store current page
				>
					{page}
				</Pagination.Item>
			)}
		</Pagination>
	)
})

export default Pages;