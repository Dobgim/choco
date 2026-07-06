import { useState } from 'react';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import KittenCard from '../components/KittenCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { useData } from '../context/DataContext.jsx';

const filters = ['All', 'Available', 'Reserved'];

export default function Kittens() {
  const { kittens } = useData();
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? kittens : kittens.filter((k) => k.status === filter);

  return (
    <Page title="Available Kittens">
      <PageHero
        eyebrow="Available Kittens & Cats"
        title="Meet our current kittens"
        text="Every kitten below is health checked, vaccinated on schedule, and being lovingly socialized for go-home day at 12 weeks."
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 46 }}>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`btn ${filter === f ? 'btn--gold' : 'btn--outline'}`}
                  style={{ padding: '10px 24px', fontSize: '0.78rem' }}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid--3">
            {shown.map((k, i) => (
              <Reveal key={k.id} delay={(i % 3) * 0.1}>
                <KittenCard kitten={k} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p style={{ textAlign: 'center', marginTop: 48, color: 'var(--brown-soft)' }}>
              Don't see your perfect match? New litters arrive throughout the year —{' '}
              <a href="/contact" style={{ color: 'var(--gold)', fontWeight: 500 }}>join our waitlist</a>{' '}
              to be first in line.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Found the one? Let's talk."
        text="Send an inquiry about any kitten and we'll respond within 24 hours with next steps, more photos, and video."
      />
    </Page>
  );
}
