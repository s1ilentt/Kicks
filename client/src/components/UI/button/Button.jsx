import React from 'react';
import styles from './Button.module.scss';

const Button = ({ background, className = '', children, ...props }) => {
	return (
		<button
			{...props}
			className={`${styles.button} ${className} ${background === 'black' ? styles.buttonBlack : ''}`}
		>
			{children}
		</button>
	);
}

export default Button;