// src/app/(main)/layout.tsx
import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ccc' }}>
        <Link href="/home">Home</Link>
        <Link href="/wishlist">Wish List</Link>
        <Link href="/profile">Profile</Link>
      </nav>
      {children}
    </main>
  );
}