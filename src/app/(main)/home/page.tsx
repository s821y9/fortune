'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [fortune, setFortune] = useState('');
  const [reflection, setReflection] = useState('');
  const [savedReflection, setSavedReflection] = useState('');
  const [hasFortuneToday, setHasFortuneToday] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);

      fetch('/api/user/getTodayFortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          setHasFortuneToday(data.alreadyDrawn);
          if (data.fortune) {
            setFortune(data.fortune);
          }
        })
        .catch((err) => {
          console.error('Error checking fortune status:', err);
        });
    }
  }, []);

  const handleGetFortune = async () => {
    try {
      const res = await fetch("https://fortune-cookie4.p.rapidapi.com/slack", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "f72d7178f5msh7f2c27f5dbc21a2p1aee1djsn67079619088d",
          "X-RapidAPI-Host": "fortune-cookie4.p.rapidapi.com"
        }
      });

      const data = await res.json();
      const fortune = data?.text;
      const cleanedFortune = fortune.replace(/^.*your fortune reads: '(.+)'$/, '🥠 $1');

      if (fortune) {
        setFortune(cleanedFortune);
        setReflection('');
        setSavedReflection('');
        setHasFortuneToday(true);
        // Record that user has drawn fortune today (even if not saved)
        await fetch('/api/user/recordDraw', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            date: new Date().toISOString().slice(0, 10),
            fortune: cleanedFortune,
          }),
        });
      } else {
        alert("No fortune received from API.");
      }
    } catch (err) {
      console.error("Error fetching fortune:", err);
      alert("Failed to fetch fortune.");
    }
  };

  const handleSaveReflection = async () => {
    if (!reflection.trim()) return;

    try {
      const response = await fetch('/api/user/addFortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fortune,
          reflection,
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSavedReflection(reflection);
      } else {
        alert('Failed to save reflection: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving reflection:', error);
      alert('Error saving reflection');
    }
  };

  return (
    <div>
      <img
        src="/images/image.png"
        alt="Decorative floral background"
        className={styles.backgroundImage}
      />
      <main className={styles.container}>
        <h1 className={styles.welcome}>🌟 Welcome, {email}</h1>
        <h2 className={styles.subtitle}>✨ Your Daily Fortune</h2>
        {fortune && (
          <div className={styles.fortuneDisplayCard} style={{ position: 'relative' }}>
            <p className={styles.fortuneText}>{fortune}</p>
            <span className={styles.star} style={{ top: '3%', left: '2%' }} />
            <span className={styles.star} style={{ top: '-1%', left: '8%' }} />
            <span className={styles.star} style={{ top: '30%', left: '0%' }} />
            <span className={styles.star} style={{ bottom: '8%', right: '2%' }} />
            <span className={styles.star} style={{ bottom: '5%', right: '8%' }} />
            <span className={styles.star} style={{ bottom: '35%', right: '0%' }} />
          </div>
        )}
        <button
          onClick={handleGetFortune}
          disabled={hasFortuneToday}
          className={styles.fortuneButton}
        >
          {hasFortuneToday ? 'Fortune already received today' : 'Get My Fortune Cookie'}
        </button>

        {fortune && (
          <div className={styles.fortuneCard}>
            
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write your thoughts here..."
              rows={4}
              className={styles.reflectionInput}
            />
            <button onClick={handleSaveReflection} className={styles.saveButton}>
              Save Reflection
            </button>
            {savedReflection && (
              <p className={styles.savedReflection}>
                ✅ Reflection saved: {savedReflection}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}