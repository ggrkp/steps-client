import styles from './Loader.module.css'

const Loader = ({ size }) => {
  return (
    <svg
      className={styles.loader}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle className={styles.circle} cx="12" cy="12" r="10" />
    </svg>
  );
};

export default Loader