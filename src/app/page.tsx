import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🌟 Welcome to Fortune Horoscope App 🌟</h1>
      <p>Discover your daily fortune based on your zodiac sign.</p>
      <Link href="/login">
        <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Get Started
        </button>
      </Link>
    </main>
  );
}
