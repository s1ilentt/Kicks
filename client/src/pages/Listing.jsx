import React from 'react';
import { observer } from 'mobx-react-lite';
import DiscountPreview from '../components/sections/listingSections/discountPreview/DiscountPreview';
import ListingProduct from '../components/sections/listingSections/listingProduct/ListingProduct';

const Listing = observer(() => {

	return (
		<div className='listing-page'>
			<DiscountPreview />
			<ListingProduct />
		</div>
	);
})

export default Listing;