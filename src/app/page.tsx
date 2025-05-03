import Link from "next/link";
import styles from "./initial_page.module.css";

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>🔮 Your Daily Fortune Awaits</h1>
        <p className={styles.heroSubtitle}>Discover what the stars have in store for you today.</p>
        <Link href="/login">
          <button className={styles.heroButton}>Begin Your Journey</button>
        </Link>
      </div>
    </main>
  );
}
