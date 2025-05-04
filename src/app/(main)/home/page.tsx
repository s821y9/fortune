'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
          if (data.alreadyDrawn) {
            setHasFortuneToday(true);
            setFortune(data.fortune);
          } else {
            setHasFortuneToday(false);
          }
        })
        .catch((err) => {
          console.error('Error checking fortune status:', err);
        });
    }
  }, []);

  const handleGetFortune = () => {
    const fortunes = [
      'Today is a lucky day to take a chance!',
      'You will find joy in unexpected places.',
      'Someone is thinking of you right now.',
      'A small act of kindness brings big rewards.',
      'Challenges are opportunities in disguise.',
      'You are capable of more than you know.',
      'Unexpected wealth may find its way to you.',
      'A meaningful conversation will brighten your day.',
      'You will soon receive good news.',
      'Don’t be afraid to take that first step.',
      'Your smile is a source of happiness for others.',
      'Trust your intuition; it’s stronger than you think.',
      'Adventure awaits just around the corner.',
      'A surprise encounter will lead to something beautiful.',
      'Success is built on small, daily improvements.',
      'The universe is aligning in your favor.',
      'Your efforts are being noticed by the right people.',
      'Patience will reward you soon.',
      'You will discover a hidden talent.',
      'A dream you have will start to become real.',
      'Let go of doubt—something amazing is coming.',
      'A quiet moment today will bring clarity.',
      'The next decision you make will be the right one.',
      'Kindness you show today will come back to you multiplied.',
      'You’re about to take a big step forward.',
      'Let yourself be proud of how far you’ve come.'
    ];
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
    setReflection('');
    setSavedReflection('');
    setHasFortuneToday(true);
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
          {hasFortuneToday ? 'Fortune already received today' : 'Get My Fortune'}
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