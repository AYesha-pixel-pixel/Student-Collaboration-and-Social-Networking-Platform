import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import './About.css'

const Key = ({ letter, color, style }) => (
  <div
    className="about-key"
    style={{
      background: color,
      ...style,
    }}
  >
    {letter}
  </div>
)

const About = () => {
  const { user } = useAuth()
  const isLoggedIn = Boolean(user?.token || localStorage.getItem('token'))

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="about-page">
        <div className="about-background" />

        <nav className="about-nav">
          <Link to="/" className="about-logo">★ UNIVERSE</Link>
          <div className="about-nav-links">
            {isLoggedIn ? (
              <>
                <Link to="/feed" className="about-nav-link">Feed</Link>
                <Link to="/explore" className="about-nav-link">Explore</Link>
                <Link to="/messages" className="about-nav-link">Messages</Link>
                <Link to="/settings" className="about-nav-link">Settings</Link>
                <Link to="/contact" className="about-nav-link">Contact</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="about-nav-button">Log In</Link>
                <Link to="/register" className="about-nav-outline">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="about-floating" aria-hidden="true">
          <Key letter="A" color="#f4845f" style={{ left: '1%', top: '22%' }} />
          <Key letter="B" color="#f6c94e" style={{ left: '3%', top: '68%' }} />
          <Key letter="T" color="#5b9af5" style={{ right: '3%', top: '18%' }} />
          <Key letter="!" color="#49c4a0" style={{ right: '1%', top: '70%' }} />
        </div>

        <main className="about-shell">
          <section className="about-card">
            <span className="about-badge">About</span>
            <h1>Built for campus collaboration</h1>
            <p>
              StudentNet is a shared space for posts, profiles, societies, and real-time messages.
              It keeps classwork, group discussions, and announcements in one vibrant feed.
            </p>
            <p>
              The platform is designed to feel friendly and fast, so classmates can connect without
              losing the flow of their day.
            </p>
            <div className="about-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/feed" className="about-btn about-btn-primary">Open Feed</Link>
                  <Link to="/societies" className="about-btn about-btn-outline">Browse Societies</Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="about-btn about-btn-primary">Create Account</Link>
                  <Link to="/login" className="about-btn about-btn-outline">Log In</Link>
                </>
              )}
            </div>
          </section>

          <aside className="about-card about-card-alt">
            <h2>What you can do</h2>
            <ul>
              <li>Share updates, projects, and campus wins.</li>
              <li>Discover societies and upcoming events.</li>
              <li>Message classmates instantly with live chat.</li>
              <li>Manage your profile and privacy settings.</li>
            </ul>
          </aside>
        </main>
      </div>
    </>
  )
}

export default About
