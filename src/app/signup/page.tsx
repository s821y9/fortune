'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password && birthday) {
      try {
        await axios.post('/api/auth/signup', {
          email,
          password,
          birthday,
        });
        localStorage.setItem('userEmail', email);
        router.push('/home');
      } catch (error) {
        alert('Signup failed');
        console.error(error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className={styles.rootWrapper}>
      <main className={styles.signupContainer}>
        <h1 className={styles.signupTitle}>📝 Create Your Account</h1>
        <div className={styles.signupBox}>
          <form onSubmit={handleSignup} className={styles.signupForm}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.signupButton}>Create Account</button>
          </form>
          <p className={styles.signupFooter}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </main>
    </div>
  );
}