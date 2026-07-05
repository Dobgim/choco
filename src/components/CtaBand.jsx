import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CtaBand({
  title = 'Ready to welcome a gentle giant home?',
  text = 'Reserve your Maine Coon kitten today, or reach out with any questions — we love talking about our cats.',
}) {
  return (
    <section className="section" aria-label="Call to action">
      <div className="container">
        <Reveal>
          <div className="cta-band">
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
            <div className="cta-band__actions">
              <Link to="/kittens" className="btn btn--gold">
                View Kittens
              </Link>
              <Link to="/contact" className="btn btn--light">
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
