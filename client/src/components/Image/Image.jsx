import React from 'react';
import styles from './Image.module.css';

const Image = ({src, alt, className, background, ...attrs}) => {
	if (!src) {
		src = `https://via.placeholder.com/300x300`;
	}

	const classes = [className];
	if (background) {
		classes.push(styles.background);
	}

	return (
		<img
			src = {src}
			alt = {alt}
			className = {classes.join(' ')}
			{...attrs}
		/>
	);
}
Image.defaultProps = {
	src: '',
	alt: 'name image'
}

export default Image;