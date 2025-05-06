'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem('userEmail', email);
          router.push('/home');
        } else {
          alert(response.data.message || 'Login failed');
        }
      } catch (error) {
        alert('Incorrect email or password');
        console.error(error);
      }
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>🔐 Welcome Back</h1>
        <div className={styles.loginBox}>
          <form onSubmit={handleLogin} className={styles.loginForm}>
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
            </div>
            <button className={styles.loginButton}>Login</button>
          </form>
          <p className={styles.loginFooter}>
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}