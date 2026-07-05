import { useState } from 'react';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CatArt from '../components/CatArt.jsx';
import CtaBand from '../components/CtaBand.jsx';

const shots = [
  { img: 'meowing.jpg', cap: 'Maximus surveying his kingdom', cat: 'Kittens' },
  { img: 'karin.jpg', cap: 'Luna in the morning sun', cat: 'Queens & Sires' },
  { img: 'white.jpg', cap: 'Seraphina’s first grooming session', cat: 'Kittens' },
  { img: 'young.jpg', cap: 'Atlas mid-pounce', cat: 'Kittens' },
  { img: 'home.jpg', cap: 'Catio afternoons', cat: 'Our Home' },
  { img: 'redkitten.jpg', cap: 'Leo and his lion mane', cat: 'Kittens' },
  { img: 'bluesmoke.jpg', cap: 'Willa solving her puzzle feeder', cat: 'Kittens' },
  { img: 'balder.jpg', cap: 'Ragnar, all 24 pounds of him', cat: 'Queens & Sires' },
  { img: 'kittens-mixed.jpg', cap: 'Nap pile in the nursery', cat: 'Our Home' },
];

const cats = ['All', 'Kittens', 'Queens & Sires', 'Our Home'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? shots : shots.filter((s) => s.cat === filter);

  return (
    <Page title="Gallery">
      <PageHero
        eyebrow="Gallery"
        title="A portrait of life at Velvet Crown"
        text="Lynx tips, river-otter tails, and everyday moments from the cattery."
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 46 }}>
              {cats.map((c) => (
                <button
                  key={c}
                  className={`btn ${filter === c ? 'btn--gold' : 'btn--outline'}`}
                  style={{ padding: '10px 24px', fontSize: '0.78rem' }}
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="gallery-grid">
            {shown.map((s, i) => (
              <Reveal key={s.cap} delay={(i % 3) * 0.08}>
                <figure>
                  <CatArt img={s.img} label={s.cap} />
                  <figcaption>{s.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want more photos and videos?"
        text="Follow along on our socials, or inquire about a kitten to receive weekly photo and video updates."
      />
    </Page>
  );
}
