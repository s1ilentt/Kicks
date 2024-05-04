import React, { useContext } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
	const { product } = useContext(Context);
	
	return (
		<Row className='d-flex' style={{flexDirection: ''}}>
			{product.brands.map(brand =>
				<Card
					style={{ cursor: 'pointer', flex: '0 1 20%' }}
					className="p-3"
					key={brand.id}
					border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
					onClick={() => product.setSelectedBrand(brand)}
				>
					{brand.name}
				</Card>
			)}
		</Row>
	);
})

export default BrandBar;