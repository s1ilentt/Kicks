import React from 'react';
import styles from './Container.module.scss';

const Container = ({ className = '', children }) => {
	return (
		<div
			className={`${styles.container} ${className}`}
		>
			{children}
		</div>
	);
}

export default Container;