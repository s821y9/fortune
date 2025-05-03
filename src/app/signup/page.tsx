'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📝 Sign Up</h1>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
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
        <button type="submit">Create Account</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}