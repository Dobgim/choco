import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartIcon, CheckIcon } from '../components/icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import Page from '../components/Page.jsx';
import Reveal from '../components/Reveal.jsx';
import CatArt from '../components/CatArt.jsx';
import KittenCard from '../components/KittenCard.jsx';
import { useData } from '../context/DataContext.jsx';

export default function KittenDetail() {
  const { id } = useParams();
  const { kittens } = useData();
  const kitten = kittens.find((k) => k.id === id);
  const { add, inCart } = useCart();
  const navigate = useNavigate();

  if (!kitten) {
    return (
      <Page title="Kitten Not Found">
        <div className="notfound">
          <div>
            <h1>Oops</h1>
            <p style={{ margin: '10px 0 26px', color: 'var(--brown-soft)' }}>
              We couldn't find that kitten — they may have already found a home.
            </p>
            <Link to="/kittens" className="btn btn--gold">Back to Kittens</Link>
          </div>
        </div>
      </Page>
    );
  }

  const others = kittens.filter((k) => k.id !== kitten.id && k.status === 'Available').slice(0, 3);

  return (
    <Page title={kitten.name}>
      <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 60px)' }}>
        <div className="container">
          <div className="detail">
            <Reveal>
              <div className="detail__media">
                <CatArt img={kitten.img} palette={kitten.palette} label={`${kitten.name}, ${kitten.color} Maine Coon kitten`} />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link> / <Link to="/kittens">Available Kittens</Link> / {kitten.name}
              </nav>
              <span className="eyebrow">{kitten.status}</span>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', margin: '10px 0 8px' }}>
                {kitten.name}
              </h1>
              <p style={{ color: 'var(--brown-soft)' }}>{kitten.temperament}</p>

              <div className="detail__facts">
                <div className="detail__fact"><span>Sex</span><b>{kitten.sex}</b></div>
                <div className="detail__fact"><span>Color</span><b>{kitten.color}</b></div>
                <div className="detail__fact"><span>Age</span><b>{kitten.age}</b></div>
                <div className="detail__fact"><span>Go Home</span><b>{kitten.ready}</b></div>
                <div className="detail__fact" style={{ gridColumn: '1 / -1' }}>
                  <span>Parents</span><b>{kitten.parents}</b>
                </div>
              </div>

              <div className="detail__price">${kitten.price.toLocaleString()}</div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {kitten.status === 'Available' ? (
                  inCart(kitten.id) ? (
                    <button className="btn btn--gold" onClick={() => navigate('/cart')}>
                      <CheckIcon width="16" height="16" /> In Cart — View Cart
                    </button>
                  ) : (
                    <button className="btn btn--gold" onClick={() => add(kitten.id)}>
                      <CartIcon width="16" height="16" /> Add {kitten.name} to Cart
                    </button>
                  )
                ) : (
                  <span className="btn btn--outline" aria-disabled="true" style={{ pointerEvents: 'none', opacity: 0.65 }}>
                    Reserved
                  </span>
                )}
                <Link to="/purchase-process" className="btn btn--outline">How Reserving Works</Link>
              </div>

              <p style={{ marginTop: 26, fontSize: '0.88rem', color: 'var(--taupe)' }}>
                Includes vaccinations, microchip, TICA papers, health guarantee, and full go-home kit.{' '}
                <Link to="/whats-included" style={{ color: 'var(--gold)' }}>See everything included →</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <Reveal>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', marginBottom: 34 }}>
                More kittens you may love
              </h2>
            </Reveal>
            <div className="grid grid--3">
              {others.map((k, i) => (
                <Reveal key={k.id} delay={i * 0.1}>
                  <KittenCard kitten={k} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </Page>
  );
}
