import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';

const steps = [
  {
    n: '01',
    t: 'Send an Inquiry',
    d: 'Fill out our contact form or call us. Tell us about your home, your family, other pets, and what you are looking for in a companion. We respond within 24 hours.',
  },
  {
    n: '02',
    t: 'Get Matched',
    d: 'We will chat by phone or video, answer every question, and recommend the kittens whose temperaments best fit your lifestyle. You are welcome to visit by appointment.',
  },
  {
    n: '03',
    t: 'Place Your Deposit',
    d: 'A $500 deposit reserves your kitten and applies toward the final price. You will receive a written reservation agreement and your private kitten-cam access.',
  },
  {
    n: '04',
    t: 'Watch Them Grow',
    d: 'Weekly photo and video updates, live nursery cams, and milestone reports — vaccinations, weigh-ins, vet checks — until your kitten is ready.',
  },
  {
    n: '05',
    t: 'Final Vet Check & Paperwork',
    d: 'Before go-home day your kitten receives a full veterinary exam, health certificate, microchip registration, and TICA paperwork — all prepared for you.',
  },
  {
    n: '06',
    t: 'Welcome Home Day',
    d: 'At 12 weeks, pick up in person, meet our ground courier, or have a flight nanny hand-deliver your kitten in-cabin. The adventure begins!',
  },
];

const delivery = [
  { t: 'Cattery Pickup', d: 'Visit us in Chicago, meet the parents, and drive home with your kitten.', tag: 'Free' },
  { t: 'Ground Delivery', d: 'Personal climate-controlled car delivery within 500 miles of Chicago.', tag: 'From $250' },
  { t: 'Flight Nanny', d: 'A professional courier flies with your kitten in-cabin to your nearest major airport.', tag: 'From $550' },
];

export default function Process() {
  return (
    <Page title="Purchase Process">
      <PageHero
        eyebrow="Purchase Process"
        title="A clear path from inquiry to homecoming"
        text="No surprises, no pressure — just a transparent process designed around the wellbeing of the kitten and the confidence of your family."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 0.1}>
                <div className="card step" style={{ height: '100%' }}>
                  <div className="step__num">{s.n}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            center
            eyebrow="Getting Your Kitten to You"
            title="Three safe delivery options"
            text="However your kitten travels, comfort and safety come first. We never ship kittens in cargo."
          />
          <div className="grid grid--3">
            {delivery.map((d, i) => (
              <Reveal key={d.t} delay={i * 0.1}>
                <div className="card feature-card">
                  <span className="eyebrow" style={{ marginBottom: 12 }}>{d.tag}</span>
                  <h3>{d.t}</h3>
                  <p>{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p style={{ textAlign: 'center', marginTop: 40, color: 'var(--brown-soft)' }}>
              Questions about deposits, pricing, or delivery?{' '}
              <Link to="/faq" style={{ color: 'var(--gold)', fontWeight: 500 }}>Read the FAQ</Link> or{' '}
              <Link to="/contact" style={{ color: 'var(--gold)', fontWeight: 500 }}>contact us</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start your inquiry today"
        text="Tell us about your family and we'll help you find the kitten who belongs in it."
      />
    </Page>
  );
}
