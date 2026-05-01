import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import './Contact.css'

const Key = ({ letter, color, style }) => (
  <div
    className="contact-key"
    style={{
      background: color,
      ...style,
    }}
  >
    {letter}
  </div>
)

const Contact = () => {
  const { user } = useAuth()
  const isLoggedIn = Boolean(user?.token || localStorage.getItem('token'))

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="contact-page">
        <div className="contact-background" />

        <nav className="contact-nav">
          <Link to="/" className="contact-logo">★ UNIVERSE</Link>
          <div className="contact-nav-links">
            {isLoggedIn ? (
              <>
                <Link to="/feed" className="contact-nav-link">Feed</Link>
                <Link to="/explore" className="contact-nav-link">Explore</Link>
                <Link to="/messages" className="contact-nav-link">Messages</Link>
                <Link to="/settings" className="contact-nav-link">Settings</Link>
                <Link to="/about" className="contact-nav-link">About</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="contact-nav-button">Log In</Link>
                <Link to="/register" className="contact-nav-outline">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="contact-floating" aria-hidden="true">
          <Key letter="C" color="#f4845f" style={{ left: '1%', top: '20%' }} />
          <Key letter="O" color="#f6c94e" style={{ left: '3%', top: '72%' }} />
          <Key letter="!" color="#5b9af5" style={{ right: '3%', top: '22%' }} />
          <Key letter="?" color="#49c4a0" style={{ right: '1%', top: '68%' }} />
        </div>

        <main className="contact-shell">
          <section className="contact-card">
            <span className="contact-badge">Contact</span>
            <h1>Let us know what you need</h1>
            <p>
              Have feedback or questions about StudentNet? Send a note and we will help.
            </p>

            <div className="contact-details">
              <div>
                <span>Email</span>
                <strong>support@studentnet.edu</strong>
              </div>
              <div>
                <span>Office</span>
                <strong>Student Center, Room 214</strong>
              </div>
              <div>
                <span>Hours</span>
                <strong>Mon-Fri, 9:00 AM - 5:00 PM</strong>
              </div>
            </div>
          </section>

          <aside className="contact-card contact-card-alt">
            <h2>Quick links</h2>
            <p>Need to jump back in quickly? These will help.</p>
            <div className="contact-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/feed" className="contact-btn contact-btn-primary">Open Feed</Link>
                  <Link to="/messages" className="contact-btn contact-btn-outline">Open Messages</Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="contact-btn contact-btn-primary">Create Account</Link>
                  <Link to="/login" className="contact-btn contact-btn-outline">Log In</Link>
                </>
              )}
            </div>
          </aside>
        </main>
      </div>
    </>
  )
}

export default Contact
