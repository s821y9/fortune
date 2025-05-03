'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

type Fortune = {
  date: string;
  fortune: string;
  reflection: string;
  fulfilled?: boolean;
};

export default function WishlistPage() {
  const [email, setEmail] = useState('');
  const [fortunes, setFortunes] = useState<Fortune[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetch('/api/user/getFortunes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setFortunes(data.fortunes);
        });
    }
  }, []);

  return (
    <div className={styles.background}>
      <img
        src="/images/image.png"
        alt="Decorative floral background"
        className={styles.backgroundImage}
      />
      <main className={styles.container}>
        <h2>💫 Your Wishlist</h2>
        {fortunes.length === 0 ? (
          <p>No saved fortunes yet.</p>
        ) : (
          fortunes.slice().reverse().map((f: Fortune, idx: number) => (
            <div key={idx} className={`${styles.card} ${f.fulfilled ? styles.fulfilledCard : ''}`}>
              <p><strong>Date:</strong> {f.date}</p>
              <p><strong>Fortune:</strong> {f.fortune}</p>
              <p><strong>Reflection:</strong> {f.reflection}</p>
              <button
                className={styles.actionButton}
                disabled={f.fulfilled}
                onClick={async () => {
                  try {
                    const res = await fetch('/api/user/markFortune', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email,
                        fortune: f.fortune,
                      }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      setFortunes(prev =>
                        prev.map(item =>
                          item.fortune === f.fortune && item.date === f.date ? { ...item, fulfilled: true } : item
                        )
                      );
                    }
                  } catch (err) {
                    console.error('Error marking fortune as fulfilled:', err);
                  }
                }}
              >
                {f.fulfilled ? '✅ Fulfilled' : '✅ Mark as Fulfilled'}
              </button>
              <button
                className={styles.deleteButton}
                onClick={async () => {
                  try {
                    const res = await fetch('/api/user/deleteFortune', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email,
                        fortune: f.fortune,
                      }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      setFortunes(fortunes.filter((item: Fortune) => item.fortune !== f.fortune));
                    }
                  } catch (err) {
                    console.error('Error deleting fortune:', err);
                  }
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}