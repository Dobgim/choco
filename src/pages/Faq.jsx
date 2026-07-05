import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import Accordion from '../components/Accordion.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { faqs } from '../data/faqs.js';

export default function Faq() {
  return (
    <Page title="FAQ">
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        text="Everything families usually ask about reserving, health, delivery, and life with a Maine Coon."
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ textAlign: 'center', marginTop: 44, color: 'var(--brown-soft)' }}>
              Still curious about something?{' '}
              <Link to="/contact" style={{ color: 'var(--gold)', fontWeight: 500 }}>
                Ask us directly
              </Link>{' '}
              — we answer every message.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </Page>
  );
}
