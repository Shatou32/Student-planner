import About from './About.jsx'
import Features from './Features.jsx'
import Planner from './Planner.jsx'

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="/" aria-label="StudyMate home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>study<span className="brand-emphasis">mate</span></span>
    </a>
  )
}

function LandingPage() {
  return (
    <div className="site-shell" id="home">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#preview">Planner preview</a>
            <a href="#about">About</a>
          </nav>
          <div className="header-actions">
            <a className="button button-small button-primary" href="/dashboard">Dashboard preview</a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A little more focus, a lot less stress</div>
            <h1>Make room for<br />your <span>big ideas.</span></h1>
            <p className="hero-description">
              Your studies, plans, and goals — all in one thoughtful space.
              Build a routine that works for you, one study session at a time.
            </p>
            <div className="hero-note">
              <span>Made for students finding their own rhythm</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Study planner preview illustration">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="planner-card">
              <div className="planner-card-top">
                <div>
                  <span className="small-overline">SAMPLE PLANNER PREVIEW</span>
                  <h2>Your study day</h2>
                </div>
                <span className="sun-icon" aria-hidden="true">☼</span>
              </div>
              <div className="preview-progress">
                <div className="progress-label"><span>Daily focus</span><strong>2 of 4 sessions</strong></div>
                <div className="progress-track"><span /></div>
              </div>
              <div className="schedule-label">UP NEXT</div>
              <div className="schedule-item">
                <div className="schedule-time">10:00<small>AM</small></div>
                <span className="schedule-marker marker-purple" />
                <div className="schedule-detail"><strong>Biology review</strong><small>Chapter 04 · 45 min</small></div>
                <span className="schedule-more">···</span>
              </div>
              <div className="schedule-item schedule-item-done">
                <div className="schedule-time">08:30<small>AM</small></div>
                <span className="schedule-marker marker-green" />
                <div className="schedule-detail"><strong>Read literature</strong><small>Finished · 30 min</small></div>
                <span className="done-check" aria-label="Completed">✓</span>
              </div>
              <div className="today-task">
                <span className="task-checkbox" aria-hidden="true" />
                <span><strong>Submit history essay</strong><small>Due tomorrow</small></span>
                <span className="priority-tag">Priority</span>
              </div>
            </div>
            <div className="art-sparkle sparkle-one" aria-hidden="true">✳</div>
            <div className="art-sparkle sparkle-two" aria-hidden="true">✦</div>
          </div>
        </section>

        <Features />
        <Planner />
        <About />
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand light />
            <p>A little more focus.<br />A lot more room to grow.</p>
          </div>
          <div className="footer-links">
            <div><strong>Explore</strong><a href="#features">Features</a><a href="#preview">Planner preview</a></div>
            <div><strong>Preview mode</strong><span>The planner screens are visual previews. Tasks and schedules are not saved.</span></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 StudyMate</span><span>Made for your next big idea.</span></div>
      </footer>
    </div>
  )
}

export default LandingPage
