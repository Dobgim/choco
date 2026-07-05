import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CrownLogo from './CrownLogo.jsx';
import { CartIcon } from './icons.jsx';
import { useCart } from '../context/CartContext.jsx';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/kittens', label: 'Available Kittens' },
  { to: '/purchase-process', label: 'Purchase Process' },
  { to: '/whats-included', label: "What's Included" },
  { to: '/facilities', label: 'Facilities' },
  { to: '/kitten-cams', label: 'Kitten Cams' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className={`nav${scrolled || open ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label="Cozy Paws Cattery Maine Coon — home">
            <CrownLogo />
            <span>
              Cozy Paws Cattery
              <small>Maine Coons</small>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {links.slice(0, 7).map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={linkClass}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Link to="/cart" className="nav__cart" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <CartIcon width="22" height="22" />
            {count > 0 && <span className="nav__cart-badge">{count}</span>}
          </Link>

          <Link to="/contact" className="btn btn--gold nav__cta">
            Contact Us
          </Link>

          <button
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__drawer"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {[...links, { to: '/cart', label: 'Cart' }, { to: '/contact', label: 'Contact Us' }].map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={linkClass}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
