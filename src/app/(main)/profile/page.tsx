'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type Fortune = {
  date: string;
  fortune: string;
  reflection?: string;
};

function getZodiacInfo(dateString: string): { sign: string; emoji: string } {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', emoji: '♒️' };
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { sign: 'Pisces', emoji: '♓️' };
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', emoji: '♈️' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', emoji: '♉️' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', emoji: '♊️' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', emoji: '♋️' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', emoji: '♌️' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', emoji: '♍️' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', emoji: '♎️' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', emoji: '♏️' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', emoji: '♐️' };
  return { sign: 'Capricorn', emoji: '♑️' };
}

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [expandedCards, setExpandedCards] = useState<boolean[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
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

      fetch('/api/user/getProfileInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setEmail(data.email);
            setBirthday(data.birthday);
          }
        });
    }
  }, []);

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthday = e.target.value;
    setBirthday(newBirthday);
    fetch('/api/user/updateBirthday', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, birthday: newBirthday }),
    });
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
        {birthday && (
          <p className={styles.userInfoText}>
            <strong>🔮 Zodiac Sign:</strong> {getZodiacInfo(birthday).emoji} {getZodiacInfo(birthday).sign}
          </p>
        )}
      </div>


      <h3 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
        Your Saved Fortunes
      </h3>

        <div className={styles.fortuneList} style={{ marginTop: '1rem' }}>
          {fortunes.length === 0 ? (
            <p>No fortunes saved yet.</p>
          ) : (
            fortunes.map((f, idx: number) => (
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
