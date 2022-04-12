import Link from "next/link";
import styles from "../styles/Home.module.css";

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>404 - Page Not Found</h1>

        <Link href="/" passHref>
          Home page
        </Link>
      </main>
    </div>
  );
};

export default Custom404;
