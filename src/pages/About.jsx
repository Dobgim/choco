import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CatArt from '../components/CatArt.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Counter from '../components/Counter.jsx';
import { FeatureIcon, PawIcon } from '../components/icons.jsx';
import { adults } from '../data/kittens.js';

const values = [
  { icon: 'heart', t: 'Health Above All', d: 'DNA panels, annual cardiologist echocardiograms, and vet checks at every milestone. We never cut corners on health.' },
  { icon: 'home', t: 'Raised Underfoot', d: 'Our kittens grow up in the middle of family life — vacuum cleaners, doorbells, kids, and cuddles included.' },
  { icon: 'leaf', t: 'Small by Design', d: 'A maximum of four litters per year means every kitten gets individual attention and every queen gets rest.' },
  { icon: 'handshake', t: 'Honest Matchmaking', d: 'We match kittens to families by temperament and lifestyle, not first-come-first-served.' },
];

export default function About() {
  return (
    <Page title="About Us">
      <PageHero
        eyebrow="About Velvet Crown"
        title="Twelve years of gentle giants"
        text="We are a small, family-run, TICA-registered Maine Coon cattery in Chicago, Illinois — and every cat here is family first."
      />

      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="split__art split__art--tall">
              <CatArt img="mitts.jpg" label="Our founding Maine Coon" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow">Our Story</span>
            <h2>It started with one silver queen</h2>
            <p>
              In 2014 we brought home Luna, a silver shaded Maine Coon with paws like snowshoes
              and the personality of a golden retriever. Falling in love with the breed was
              instant; committing to breeding it responsibly took years of mentorship, study,
              and health-testing discipline.
            </p>
            <p>
              Today Velvet Crown pairs carefully selected European champion bloodlines with an
              obsessive focus on temperament. Our kittens are known for their size, their lynx
              tips and river-otter tails — and above all, for being confident, affectionate
              companions.
            </p>
            <div className="hero__badges">
              <div className="hero__badge"><Counter to={12} suffix="+" /><span>Years of Breeding</span></div>
              <div className="hero__badge"><Counter to={86} /><span>Champion Titles in Pedigrees</span></div>
              <div className="hero__badge"><Counter to={4} /><span>Litters Max Per Year</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            center
            eyebrow="What Guides Us"
            title="Our promise to every kitten and family"
          />
          <div className="grid grid--4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.1}>
                <div className="card feature-card">
                  <FeatureIcon name={v.icon} />
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Meet the Royals"
            title="Our kings and queens"
            text="Every parent is DNA tested, cardiologist screened, and adored. Their kittens inherit both their beauty and their famously sweet temperaments."
          />
          <div className="grid grid--3">
            {adults.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.12}>
                <article className="card kitten-card">
                  <div className="kitten-card__media">
                    <CatArt img={a.img} palette={a.palette} label={`${a.name}, ${a.color} Maine Coon`} />
                    <span className="kitten-card__status">{a.role}</span>
                  </div>
                  <div className="kitten-card__body">
                    <h3>{a.name}</h3>
                    <div className="kitten-card__meta">
                      <span><PawIcon width="13" height="13" style={{ color: 'var(--gold)' }} /> {a.color}</span>
                    </div>
                    <p style={{ color: 'var(--brown-soft)', fontSize: '0.93rem' }}>{a.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Come meet the family behind the cattery"
        text="Schedule a visit, hop on a video call, or just say hello — we are always happy to talk Maine Coons."
      />
    </Page>
  );
}
