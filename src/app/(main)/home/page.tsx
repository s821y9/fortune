'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    }

    const today = new Date().toISOString().slice(0, 10);
    const storedDate = localStorage.getItem('fortuneDate');
    if (storedDate === today) {
      setHasFortuneToday(true);
      const savedFortune = localStorage.getItem('fortuneText');
      if (savedFortune) setFortune(savedFortune);
    }
  }, []);

  const handleGetFortune = () => {
    const fortunes = [
      'Today is a lucky day to take a chance!',
      'You will find joy in unexpected places.',
      'Someone is thinking of you right now.',
      'A small act of kindness brings big rewards.',
    ];
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
    setReflection('');
    setSavedReflection('');
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('fortuneDate', today);
    localStorage.setItem('fortuneText', random);
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
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🌟 Welcome, {email}</h1>
      <h2>✨ Your Daily Fortune</h2>
      <button
        onClick={handleGetFortune}
        disabled={hasFortuneToday}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        {hasFortuneToday ? 'Fortune already received today' : 'Get My Fortune'}
      </button>

      {fortune && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '1.2rem' }}>{fortune}</p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
            style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', fontSize: '1rem' }}
          />
          <button onClick={handleSaveReflection} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Save Reflection
          </button>
          {savedReflection && (
            <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'green' }}>
              ✅ Reflection saved: {savedReflection}
            </p>
          )}
        </div>
      )}
    </main>
  );
}