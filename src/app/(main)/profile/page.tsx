'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [fortunes, setFortunes] = useState<any[]>([]);
  const [expandedCards, setExpandedCards] = useState<boolean[]>([]);

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
          if (data.success) {
            setFortunes(data.fortunes);
            setExpandedCards(new Array(data.fortunes.length).fill(false));
          }
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

  const toggleExpand = (index: number) => {
    const updated = [...expandedCards];
    updated[index] = !updated[index];
    setExpandedCards(updated);
  };

  return (
    <div className={styles.background}>
      <img
        src="/images/image.png"
        alt="Decorative floral background"
        className={styles.backgroundImage}
      />
      <main className={styles.container}>
        
      <h2 className={styles.sectionTitle}>Your Information:</h2>
      <div className={styles.userInfoCard}>
        <p className={styles.userInfoText}>
          <strong>👤 Email:</strong> {email}
        </p>
        <div className={styles.userInfoText}>
          <label>
            <strong>🎂 Birthday:</strong>
            <input
              type="date"
              value={birthday}
              onChange={handleBirthdayChange}
              className={styles.birthdayInput}
              style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
            />
          </label>
        </div>
      </div>


      <h3 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
        Your Saved Fortunes
      </h3>

        <div className={styles.fortuneList} style={{ marginTop: '1rem' }}>
          {fortunes.length === 0 ? (
            <p>No fortunes saved yet.</p>
          ) : (
            fortunes.map((f: any, idx: number) => (
              <div
                key={idx}
                className={styles.fortuneCard}
                onClick={() => toggleExpand(idx)}
                style={{ cursor: 'pointer' }}
              >
                <p><strong>Date:</strong> {f.date}</p>
                <p><strong>Fortune:</strong> {f.fortune}</p>
                {expandedCards[idx] && (
                  <p><strong>Reflection:</strong> {f.reflection}</p>
                )}
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                  {expandedCards[idx] ? '🔽 Click to collapse' : '▶️ Click to expand'}
                </p>
              </div>
            ))
          )}
        </div>


        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          style={{ marginTop: '2.5rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          Logout
        </button>
      </main>
    </div>
  );
}
