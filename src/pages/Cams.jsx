import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CatArt from '../components/CatArt.jsx';
import CtaBand from '../components/CtaBand.jsx';

const cams = [
  { img: 'kittens-group.jpg', t: 'Nursery Cam', d: 'Watch the newest litter nurse, wobble, and nap with mom around the clock.' },
  { img: 'kitten-blue.jpg', t: 'Play Room Cam', d: 'Zoomies, wrestling matches, and cat-tree conquests from weeks 6–12.' },
  { img: 'meowing.jpg', t: 'Catio Cam', d: 'Sunbathing, bird watching, and garden adventures in the outdoor catio.' },
];

export default function Cams() {
  return (
    <Page title="Live Kitten Cams">
      <PageHero
        eyebrow="Live Kitten Cams"
        title="Watch your kitten grow — live, every day"
        text="Reserved families receive private streaming access to our nursery and play room cameras, from reservation day until homecoming."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {cams.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <article className="card">
                  <div className="cam-card__media">
                    <CatArt img={c.img} label={`${c.t} preview`} />
                    <span className="cam-card__live">
                      <span className="cam-card__dot" /> Live
                    </span>
                  </div>
                  <div className="cam-card__body">
                    <h3>{c.t}</h3>
                    <p>{c.d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div
              className="card"
              style={{ marginTop: 46, padding: 'clamp(28px, 4vw, 44px)', textAlign: 'center' }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: 10 }}>Private access for reserved families</h3>
              <p style={{ color: 'var(--brown-soft)', maxWidth: 560, margin: '0 auto 24px' }}>
                Cam credentials are shared once your deposit is placed. Streams run daily from
                7am to 10pm PT, with recorded highlights posted weekly for night owls.
              </p>
              <Link to="/kittens" className="btn btn--gold">Reserve a Kitten for Access</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            center
            eyebrow="Why We Stream"
            title="Transparency you can watch"
            text="The cams began as a way for far-away families to bond with their kittens. They became our favorite proof of how our cats really live."
          />
        </div>
      </section>

      <CtaBand />
    </Page>
  );
}
