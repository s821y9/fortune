'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [fortunes, setFortunes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedBirthday = localStorage.getItem('userBirthday');
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
    if (storedBirthday) setBirthday(storedBirthday);
  }, []);

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthday = e.target.value;
    setBirthday(newBirthday);
    localStorage.setItem('userBirthday', newBirthday);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userBirthday');
    router.push('/login');
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <img
        src="https://via.placeholder.com/100"
        alt="User avatar"
        style={{ borderRadius: '50%', marginBottom: '1rem' }}
      />
      <h2>👤 User profile info will appear here once connected to database.</h2>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Birthday:
          <input
            type="date"
            value={birthday}
            onChange={handleBirthdayChange}
            style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
          />
        </label>
      </div>
      <button
        onClick={handleLogout}
        style={{ marginTop: '2rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
      >
        Logout
      </button>
      <div style={{ marginTop: '2rem', textAlign: 'left' }}>
        <h3>Your Saved Fortunes:</h3>
        {fortunes.length === 0 ? (
          <p>No fortunes saved yet.</p>
        ) : (
          fortunes.map((f: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <p><strong>Date:</strong> {f.date}</p>
              <p><strong>Fortune:</strong> {f.fortune}</p>
              <p><strong>Reflection:</strong> {f.reflection}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
