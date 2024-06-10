import styles from './ListingContainer.module.scss';

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