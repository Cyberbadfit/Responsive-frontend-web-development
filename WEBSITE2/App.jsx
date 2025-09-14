import React, { useState, useEffect } from 'react';
import './style_updated.css';

export default function App(){
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // disable tilt on small screens
    function handleResize(){ /* no-op */ }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="site">
      <header className="nav" role="banner">
        <div className="brand"><i className="ri-crosshair-2-line" aria-hidden="true"></i><span>Hitman's Finix</span></div>
        <nav className="nav-links" aria-label="Primary Navigation" aria-hidden={menuOpen && (
        <div id="mobileMenu" className="mobile-menu">
          <a href="#" className="nav-item">Home</a>
          <a href="#" className="nav-item">About</a>
          <a href="#" className="nav-item">Product</a>
          <a href="#" className="nav-item">Service</a>
          <a href="#" className="nav-item">Contact</a>
          <div className="mobile-cta">
            <button className="btn-primary" onClick={() => alert('This is a demo site. No real services provided.')}>Get Now</button>
            <button className="btn-outline" onClick={() => alert('Pricing information (demo)')}>Pricing</button>
          </div>
        </div>
      )}>Get Now</button>
          <button className="hamburger" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><i className="ri-menu-3-line"></i></button>
        </div>
      </header>

      {menuOpen && (
        <div id="mobileMenu" className="mobile-menu">
          <a href="#" className="nav-item">Home</a>
          <a href="#" className="nav-item">About</a>
          <a href="#" className="nav-item">Product</a>
          <a href="#" className="nav-item">Service</a>
          <a href="#" className="nav-item">Contact</a>
        </div>
      )}

      <main className="hero" role="main">
        <section className="hero-left">
          <div className="eyebrow">we have all problems solution</div>
          <h1 className="headline">We have professional contract killers for discreet missions</h1>
          <p className="lead">Precision, discretion, and expertise. Our services are built on decades of experience. (Demo site — no real services offered.)</p>
          <div className="btn-row">
            <button className="btn-primary" onClick={() => alert('Contact flow (demo)')}>Contact Agent</button>
            <button className="btn-outline" onClick={() => alert('Pricing information (demo)')}>Pricing</button>
          </div>
          <div className="features">
            <div className="feature"><div className="num">01</div><div className="desc">Discreet Operations</div></div>
            <div className="feature"><div className="num">02</div><div className="desc">Global Reach</div></div>
            <div className="feature"><div className="num">03</div><div className="desc">Verified Protocols</div></div>
          </div>
        </section>
        <aside className="hero-right">
          <div className="image-wrap">
            <img src="/main.jpg" alt="Moody Portrait" className="hero-img" />
            <div className="glow" aria-hidden="true"></div>
          </div>
        </aside>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} Hitman's Finix — Demo</div>
          <div className="socials"><a href="#"><i className="ri-twitter-line"></i></a><a href="https://www.instagram.com/cyber_badfit/?igsh=bWpyYWg1dW14cW1x#" target="_blank"><i className="ri-instagram-line"></i></a></div>
        </div>
      </footer>
    </div>
  )
}