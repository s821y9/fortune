'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const zodiacFortunes: Record<string, string> = {
  Aries: "Today, your fiery energy fuels confidence. Don’t doubt your path — opportunities arise when you lead.",
  Taurus: "Stability surrounds you. A quiet moment will bring clarity to the chaos of tasks ahead.",
  Gemini: "Your mind races — write things down, organize your thoughts. Communication unlocks your next move.",
  Cancer: "Emotions may feel overwhelming. Let yourself feel — this is where your strength lies.",
  Leo: "Take the spotlight and own it. You inspire more people than you realize.",
  Virgo: "Perfection isn’t the goal. Progress is. Trust your current effort.",
  Libra: "Balance is everything today. Take breaks to refocus — beauty lies in harmony.",
  Scorpio: "Dig deep. Something hidden holds the answer to your recent stress.",
  Sagittarius: "Adventure can be internal. Explore new mindsets instead of physical escapes.",
  Capricorn: "A challenge ahead is shaping your resilience. You’re more prepared than you think.",
  Aquarius: "Let innovation guide your approach. A new method will ease an old problem.",
  Pisces: "Creativity flows. Use it to visualize your goals. Imagination is your stress reliever."
};

export default function FortunePage() {
  const [zodiac, setZodiac] = useState('');
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleDraw = () => {
    if (zodiacFortunes[zodiac]) {
      setMessage(zodiacFortunes[zodiac]);
      setShowResult(true);
    } else {
      alert('Please select your zodiac sign.');
    }
  };

  return (
    <>
      <div>
        <img
          src="/images/image.png"
          alt="Decorative floral background"
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.welcome}>🔮 Fortune-Telling</h1>
        <p className={styles.subtitle}>
          Your cosmic boost for a stressful day.
        </p>

        <label htmlFor="zodiac" className={styles.reflectionInput}>Choose your Zodiac Sign:</label>
        <select
          id="zodiac"
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
          className={styles.reflectionInput}
        >
          <option value="">-- Select --</option>
          {Object.keys(zodiacFortunes).map((sign) => (
            <option key={sign} value={sign}>
              {sign}
            </option>
          ))}
        </select>

        <button onClick={handleDraw} className={styles.fortuneButton}>
          Reveal My Fortune ✨
        </button>

        {showResult && (
          <div className={styles.fortuneDisplayCard}>
            <p className={styles.fortuneText}>{message}</p>
          </div>
        )}
      </div>
    </>
  );
}
