import React from 'react';
import styles from './AdminContainer.module.scss';

const AdminContainer = ({ className = '', children }) => {
	return (
		<div
			className={`${styles.adminContainer} ${className}`}
		>
			{children}
		</div>
	);
}

export default AdminContainer;