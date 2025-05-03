'use client';

import { useEffect, useState } from 'react';

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
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>💫 Your Wishlist</h2>
      {fortunes.length === 0 ? (
        <p>No saved fortunes yet.</p>
      ) : (
        fortunes.slice().reverse().map((f: Fortune, idx: number) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>Date:</strong> {f.date}</p>
            <p><strong>Fortune:</strong> {f.fortune}</p>
            <p><strong>Reflection:</strong> {f.reflection}</p>
            <button
              style={{ marginRight: '1rem' }}
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
  );
}