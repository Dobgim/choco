import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CatArt from '../components/CatArt.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { FeatureIcon } from '../components/icons.jsx';

const groups = [
  {
    title: 'Health & Veterinary',
    icon: 'health',
    items: [
      'Age-appropriate vaccinations (FVRCP series)',
      'Multiple rounds of deworming',
      'Microchip with registration transferred to you',
      'Veterinary health certificate issued at final exam',
      '3-year written genetic health guarantee (HCM, SMA, PKD)',
      '72-hour general health window for your own vet check',
    ],
  },
  {
    title: 'Paperwork & Pedigree',
    icon: 'scroll',
    items: [
      'TICA registration paperwork',
      'Five-generation pedigree on request',
      'Copies of both parents’ DNA and cardiac screening results',
      'Complete vaccination and deworming records',
      'Signed purchase agreement and health guarantee',
    ],
  },
  {
    title: 'Go-Home Kit',
    icon: 'basket',
    items: [
      'Premium travel carrier (yours to keep)',
      'Two-week supply of the food your kitten was raised on',
      'Starter litter matched to nursery training',
      'Comfort blanket carrying mom and littermates’ scent',
      'Favorite toy from the nursery',
      'Detailed care guide written by us',
    ],
  },
  {
    title: 'Lifetime Support',
    icon: 'paw',
    items: [
      'Direct line to us for your cat’s entire life',
      'Nutrition, grooming, and introduction guidance',
      'Private alumni community of Velvet Crown families',
      'Rehoming-back promise: your cat always has a home with us',
    ],
  },
];

export default function Included() {
  return (
    <Page title="What's Included">
      <PageHero
        eyebrow="What's Included"
        title="Everything your kitten needs, from day one"
        text="Your kitten's price includes far more than the kitten — it includes our standards, our paperwork, and our lifetime commitment."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.12}>
                <div className="card feature-card">
                  <FeatureIcon name={g.icon} />
                  <h3>{g.title}</h3>
                  <ul style={{ listStyle: 'none', marginTop: 12, display: 'grid', gap: 10 }}>
                    {g.items.map((it) => (
                      <li key={it} style={{ display: 'flex', gap: 10, fontSize: '0.94rem', color: 'var(--brown-soft)' }}>
                        <span style={{ color: 'var(--gold)', flex: 'none' }}>✦</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split">
          <Reveal>
            <div className="split__art">
              <CatArt img="kitten-blue.jpg" label="A kitten with its go-home kit" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHead
              eyebrow="Why It Matters"
              title="A smooth first week, by design"
              text=""
            />
            <p style={{ color: 'var(--brown-soft)', marginBottom: 14 }}>
              Moving to a new home is a big moment for a kitten. Familiar food prevents tummy
              upsets, a scented blanket eases the first nights, and consistent litter keeps
              habits solid. Every item in the kit exists to make the transition seamless —
              for your kitten and for you.
            </p>
            <p style={{ color: 'var(--brown-soft)' }}>
              And when questions come up at 11pm on a Tuesday? You have our number. That is
              what lifetime support means.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </Page>
  );
}
