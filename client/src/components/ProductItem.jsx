import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/constsPath';

const ProductItem = observer(({product})=> {
	const router = useNavigate();

	return (
		<Col onClick={() => router(PRODUCT_ROUTE + '/' + product.id)} md={3} className='mt-3'>
			<Card style={{width: 150, cursor: 'pointer'}} border='light'>
				<Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/>
				<div className='text-black-50 mt-1 d-flex'>
					<div>Samsung...</div>
				</div>
				<div>{product.name}</div>
			</Card>
		</Col>
	);
})

export default ProductItem;