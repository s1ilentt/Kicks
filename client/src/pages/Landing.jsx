import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import DoItRight from '../components/sections/landingSections/doItRight/DoItRight';
import DontMiss from '../components/sections/landingSections/dontMiss/DontMiss';
import Categories from '../components/sections/landingSections/categories/Categories';
import Reviews from '../components/sections/landingSections/reviews/Reviews';
import { GeneralContext } from '../components/contexts/GeneralContextProvider';

const Landing = observer(() => {
	const { product } = useContext(Context);
	const { isBlack, setIsBlack } = useContext(GeneralContext);

	useEffect(() => {
		return () => {
			setIsBlack(false);
		}
	}, []);


	return (
		<div className='landing-page'>
			<DoItRight />
			<DontMiss />
			<Categories />
			<Reviews />
		</div>
	);
})

export default Landing;