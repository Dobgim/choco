import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CatArt from '../components/CatArt.jsx';
import KittenCard from '../components/KittenCard.jsx';
import Accordion from '../components/Accordion.jsx';
import Counter from '../components/Counter.jsx';
import { FeatureIcon } from '../components/icons.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { kittens } from '../data/kittens.js';
import { testimonials } from '../data/testimonials.js';
import { faqs } from '../data/faqs.js';

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const steps = [
  { n: '01', t: 'Inquire', d: 'Tell us about your family and the kitten you are dreaming of.' },
  { n: '02', t: 'Reserve', d: 'Place a deposit to hold your kitten while they grow with us.' },
  { n: '03', t: 'Watch & Visit', d: 'Follow your kitten on our live cams and visit by appointment.' },
  { n: '04', t: 'Welcome Home', d: 'At 12 weeks, your fully vetted kitten joins your family.' },
];

const included = [
  { icon: 'health', t: 'Full Health Records', d: 'Vaccinations, deworming, microchip, and a vet health certificate.' },
  { icon: 'scroll', t: 'TICA Papers', d: 'Official registration paperwork and a 3-year genetic health guarantee.' },
  { icon: 'basket', t: 'Go-Home Kit', d: 'Premium food, litter, toys, and a comfort blanket with familiar scents.' },
  { icon: 'paw', t: 'Lifetime Support', d: 'Guidance from our family to yours, for your cat’s entire life.' },
];

export default function Home() {
  const featured = kittens.filter((k) => k.status === 'Available').slice(0, 3);

  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="container hero__inner">
          <motion.div variants={heroStagger} initial="hidden" animate="show">
            <motion.span className="eyebrow" variants={heroItem}>
              Premium TICA-Registered Cattery
            </motion.span>
            <motion.h1 className="hero__title" variants={heroItem}>
              Majestic Maine Coons, <em>raised with love</em>
            </motion.h1>
            <motion.p className="hero__lead" variants={heroItem}>
              Champion European bloodlines, rigorous health testing, and kittens socialized
              underfoot in our home — so your gentle giant arrives healthy, confident, and
              ready to be family.
            </motion.p>
            <motion.div className="hero__ctas" variants={heroItem}>
              <Link to="/kittens" className="btn btn--gold">View Available Kittens</Link>
              <Link to="/purchase-process" className="btn btn--outline">How It Works</Link>
            </motion.div>
            <motion.div className="hero__badges" variants={heroItem}>
              <div className="hero__badge">
                <Counter to={12} suffix="+" />
                <span>Years Breeding</span>
              </div>
              <div className="hero__badge">
                <Counter to={340} suffix="+" />
                <span>Happy Families</span>
              </div>
              <div className="hero__badge">
                <Counter to={100} suffix="%" />
                <span>Health Tested</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__art"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__frame" style={{ aspectRatio: '4 / 4.6' }}>
              <CatArt img="hero.jpg" label="A majestic Maine Coon portrait" />
            </div>
            <motion.div
              className="hero__floater"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="22" fill="#eef3ea" />
                <path d="M15 24l6 6 12-12" stroke="#51684e" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              HCM, SMA & PKD tested parents
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <div className="trust-strip" role="list" aria-label="Trust highlights">
        {['TICA Registered', '3-Year Health Guarantee', 'Raised Underfoot', 'Flight Nanny Delivery', 'Lifetime Breeder Support'].map((t) => (
          <span role="listitem" key={t}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" fill="currentColor" /></svg>
            {t}
          </span>
        ))}
      </div>

      {/* ===== Featured kittens ===== */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Available Now"
            title="Featured kittens looking for their families"
            text="Each kitten is raised in our living room, handled daily, and matched thoughtfully to the right home."
          />
          <div className="grid grid--3">
            {featured.map((k, i) => (
              <Reveal key={k.id} delay={i * 0.12}>
                <KittenCard kitten={k} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link to="/kittens" className="btn btn--gold">See All Available Kittens</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== About preview ===== */}
      <section className="section section--tint">
        <div className="container split">
          <Reveal>
            <div className="split__art split__art--tall">
              <CatArt img="karin.jpg" label="A silver shaded Maine Coon queen" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow">Our Story</span>
            <h2>A small family cattery with a big heart</h2>
            <p>
              Cozy Paws Cattery began twelve years ago with one extraordinary silver queen and a
              promise: to breed Maine Coons the right way — health first, temperament always,
              and never more litters than our home and hearts can hold.
            </p>
            <ul>
              <li>Champion European and American bloodlines</li>
              <li>Cardiologist-screened parents, DNA tested for HCM, SMA & PKD</li>
              <li>Kittens raised underfoot with children, dogs, and daily handling</li>
            </ul>
            <Link to="/about" className="btn btn--outline">Read Our Story</Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Process preview ===== */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Simple & Transparent"
            title="Bringing your kitten home in four steps"
            text="From first hello to go-home day, we guide you through every moment."
          />
          <div className="grid grid--4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="card step">
                  <div className="step__num">{s.n}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link to="/purchase-process" className="btn btn--outline">Full Purchase Process</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== What's included preview ===== */}
      <section className="section section--dark">
        <div className="container">
          <SectionHead
            center
            eyebrow="Everything Prepared"
            title="What comes home with every kitten"
          />
          <div className="grid grid--4">
            {included.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.1}>
                <div className="feature-card" style={{ background: 'rgba(255,253,248,0.06)', borderRadius: 22 }}>
                  <FeatureIcon name={f.icon} />
                  <h3>{f.t}</h3>
                  <p style={{ color: '#cfc3ac' }}>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link to="/whats-included" className="btn btn--light">See Everything Included</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Facilities preview ===== */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Our Home, Their Home</span>
            <h2>Tour a cattery built around comfort</h2>
            <p>
              No cages, no kennels. Our cats live in sun-drenched rooms with floor-to-ceiling
              cat trees, a secured outdoor catio, and a dedicated nursery where every litter
              is raised beside us.
            </p>
            <ul>
              <li>Dedicated climate-controlled nursery suite</li>
              <li>500 sq ft enclosed outdoor catio garden</li>
              <li>Veterinary partner five minutes away</li>
            </ul>
            <Link to="/facilities" className="btn btn--outline">Take the Facilities Tour</Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="split__art">
              <CatArt img="classic.jpg" label="A Maine Coon enjoying our catio garden" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Live cams preview ===== */}
      <section className="section section--tint">
        <div className="container split">
          <Reveal>
            <div className="split__art">
              <div style={{ position: 'relative', height: '100%' }}>
                <CatArt img="kittens-group.jpg" label="Live nursery camera preview" />
                <span className="cam-card__live" style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span className="cam-card__dot" /> Live
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow">Always Connected</span>
            <h2>Watch your kitten grow on live cams</h2>
            <p>
              From the moment you reserve, you get private access to our nursery cameras.
              Watch first steps, first pounces, and nap piles in real time — every day until
              go-home day.
            </p>
            <Link to="/kitten-cams" className="btn btn--gold">View Live Kitten Cams</Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Testimonials preview ===== */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Loved by Families"
            title="What our kitten families say"
          />
          <div className="grid grid--3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <figure className="card quote-card">
                  <div className="quote-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote>“{t.text}”</blockquote>
                  <figcaption>
                    <span className="quote-card__avatar" aria-hidden="true">{t.name[0]}</span>
                    <span className="quote-card__who">
                      <b>{t.name}</b>
                      <span>{t.kitten}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 44 }}>
              <Link to="/testimonials" className="btn btn--outline">Read All Testimonials</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ preview ===== */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            center
            eyebrow="Good to Know"
            title="Frequently asked questions"
          />
          <Reveal>
            <Accordion items={faqs.slice(0, 4)} />
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/faq" className="btn btn--outline">View All FAQs</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Contact CTA ===== */}
      <CtaBand />
    </Page>
  );
}
