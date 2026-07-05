import { Link } from 'react-router-dom';
import CrownLogo from './CrownLogo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <CrownLogo className="" />
              Velvet Crown
            </div>
            <p>
              A small, family-run TICA-registered cattery devoted to raising healthy,
              champion-line Maine Coon kittens with unmatched love and care.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/kittens">Available Kittens</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/kitten-cams">Live Kitten Cams</Link></li>
            </ul>
          </div>

          <div>
            <h4>Adopting</h4>
            <ul>
              <li><Link to="/purchase-process">Purchase Process</Link></li>
              <li><Link to="/whats-included">What's Included</Link></li>
              <li><Link to="/facilities">Facilities Tour</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="tel:+15550137264">(555) 013-7264</a></li>
              <li><a href="mailto:hello@velvetcrowncoons.com">hello@velvetcrowncoons.com</a></li>
              <li>Willow Creek Lane, Portland, OR</li>
              <li>Mon–Sat · 9am–6pm PT</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Velvet Crown Maine Coons. All rights reserved.</span>
          <span>TICA Registered Cattery · Raised with love in Portland, Oregon</span>
        </div>
      </div>
    </footer>
  );
}
