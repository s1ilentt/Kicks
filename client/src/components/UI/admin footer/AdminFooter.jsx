import AdminContainer from '../../adminСontainer/AdminContainer';
import styles from './AdminFooter.module.scss';

const AdminFooter = () => {
	return (
		<footer className={styles.adminFooter}>
			<AdminContainer>
				<hr />
				<div className={styles.text}>© 2024 - kicks Dashboard</div>
			</AdminContainer>
		</footer>
	);
}

export default AdminFooter;