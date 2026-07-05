import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Counter from '../components/Counter.jsx';
import { testimonials } from '../data/testimonials.js';

export default function Testimonials() {
  return (
    <Page title="Testimonials">
      <PageHero
        eyebrow="Testimonials"
        title="340+ families, one shared story"
        text="The truest measure of a cattery is the life its kittens go on to live. Here is what our families tell us."
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="hero__badges" style={{ justifyContent: 'center', marginTop: 0, marginBottom: 56 }}>
              <div className="hero__badge"><Counter to={340} suffix="+" /><span>Kittens Placed</span></div>
              <div className="hero__badge"><Counter to={5} suffix=".0" /><span>Average Rating</span></div>
              <div className="hero__badge"><Counter to={98} suffix="%" /><span>Referral & Repeat Families</span></div>
            </div>
          </Reveal>

          <div className="grid grid--3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.1}>
                <figure className="card quote-card">
                  <div className="quote-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote>“{t.text}”</blockquote>
                  <figcaption>
                    <span className="quote-card__avatar" aria-hidden="true">{t.name[0]}</span>
                    <span className="quote-card__who">
                      <b>{t.name}</b>
                      <span>{t.location} · {t.kitten}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to write your own story?"
        text="Join hundreds of families who found their gentle giant at Cozy Paws Cattery."
      />
    </Page>
  );
}
