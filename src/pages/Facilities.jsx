import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CatArt from '../components/CatArt.jsx';
import CtaBand from '../components/CtaBand.jsx';

const spaces = [
  {
    img: 'kittens-mixed.jpg',
    t: 'The Nursery Suite',
    d: 'A climate-controlled, quiet room where queens deliver and raise their litters for the first five weeks, monitored 24/7 with cameras and daily weigh-ins.',
  },
  {
    img: 'classic.jpg',
    t: 'The Catio Garden',
    d: 'A fully enclosed 500 sq ft outdoor garden with grass, climbing logs, and sunning shelves — fresh air and enrichment, completely safe.',
  },
  {
    img: 'home.jpg',
    t: 'The Great Room',
    d: 'Floor-to-ceiling cat trees, window hammocks, and running wheels in the heart of our home, where kittens join family life from week six.',
  },
  {
    img: 'fig.jpg',
    t: 'The Grooming Studio',
    d: 'Weekly brushing, nail trims, and bath introductions happen here, so your kitten arrives already comfortable with handling and grooming.',
  },
  {
    img: 'profile.jpg',
    t: 'The Quiet Wing',
    d: 'Our retired cats and expecting queens enjoy their own peaceful space with heated beds and garden views.',
  },
  {
    img: 'garfield.jpg',
    t: 'The Play Loft',
    d: 'Tunnels, puzzle feeders, and rotating toys build confident, clever kittens — enrichment is part of the daily routine.',
  },
];

export default function Facilities() {
  return (
    <Page title="Facilities Tour">
      <PageHero
        eyebrow="Facilities Tour"
        title="A cattery that feels like home — because it is"
        text="No cages. No kennels. Our cats share our home, and every space is designed for their health, comfort, and joy."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {spaces.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.1}>
                <article className="card kitten-card">
                  <div className="kitten-card__media" style={{ aspectRatio: '4 / 3' }}>
                    <CatArt img={s.img} label={s.t} />
                  </div>
                  <div className="kitten-card__body">
                    <h3>{s.t}</h3>
                    <p style={{ color: 'var(--brown-soft)', fontSize: '0.93rem' }}>{s.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead
            center
            eyebrow="Health & Hygiene"
            title="Clean, calm, and cardiologist-approved"
          />
          <div className="grid grid--3">
            {[
              { t: 'Daily Sanitation', d: 'Veterinary-grade cleaning protocols in every room, every day.' },
              { t: 'Closed Cattery', d: 'No outside cats, quarantine protocols for shows and vet visits.' },
              { t: 'Vet Partnership', d: 'Our veterinary clinic is five minutes away, with a feline cardiologist on referral.' },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1}>
                <div className="feature-card" style={{ background: 'rgba(255,253,248,0.06)', borderRadius: 22 }}>
                  <h3>{f.t}</h3>
                  <p style={{ color: '#cfc3ac' }}>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="See it for yourself"
        text="Schedule an in-person visit or a live video tour — we are proud of where our cats live."
      />
    </Page>
  );
}
