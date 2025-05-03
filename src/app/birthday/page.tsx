'use client';

import { useState } from 'react';

export default function BirthdayPage() {
  const [birthday, setBirthday] = useState('');
  const [zodiac, setZodiac] = useState('');

  const getZodiacSign = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;

    const zodiacSigns = [
      { sign: 'Capricorn', from: [12, 22], to: [1, 19] },
      { sign: 'Aquarius', from: [1, 20], to: [2, 18] },
      { sign: 'Pisces', from: [2, 19], to: [3, 20] },
      { sign: 'Aries', from: [3, 21], to: [4, 19] },
      { sign: 'Taurus', from: [4, 20], to: [5, 20] },
      { sign: 'Gemini', from: [5, 21], to: [6, 20] },
      { sign: 'Cancer', from: [6, 21], to: [7, 22] },
      { sign: 'Leo', from: [7, 23], to: [8, 22] },
      { sign: 'Virgo', from: [8, 23], to: [9, 22] },
      { sign: 'Libra', from: [9, 23], to: [10, 22] },
      { sign: 'Scorpio', from: [10, 23], to: [11, 21] },
      { sign: 'Sagittarius', from: [11, 22], to: [12, 21] },
      { sign: 'Capricorn', from: [12, 22], to: [12, 31] },
    ];

    const found = zodiacSigns.find(({ from, to }) => {
      if (from[0] === 12 && to[0] === 1) {
        return (month === 12 && day >= from[1]) || (month === 1 && day <= to[1]);
      }
      return month === from[0] && day >= from[1] || month === to[0] && day <= to[1];
    });

    return found ? found.sign : '';
  };

  const handleSubmit = () => {
    const sign = getZodiacSign(birthday);
    setZodiac(sign);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🔮 Enter your birthday</h1>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '1rem' }}
      />
      <br />
      <button
        onClick={handleSubmit}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
      >
        Show My Zodiac Sign
      </button>
      {zodiac && (
        <p style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>
          🌟 Your zodiac sign is: <strong>{zodiac}</strong>
        </p>
      )}
    </main>
  );
}