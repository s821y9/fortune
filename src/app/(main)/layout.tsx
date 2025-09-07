// src/app/(main)/layout.tsx
import Link from 'next/link';
import styles from './layout.module.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/home" className={styles.link}>Home</Link>
        <Link href="/fortune" className={styles.link}>Fortune</Link>
        <Link href="/wishlist" className={styles.link}>Wish List</Link>
        <Link href="/profile" className={styles.link}>Profile</Link>
      </nav>
      {children}
    </main>
  );
}