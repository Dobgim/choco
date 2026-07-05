import { Link, useNavigate } from 'react-router-dom';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CatArt from '../components/CatArt.jsx';
import { TrashIcon, CartIcon, ShieldIcon } from '../components/icons.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, subtotal, remove } = useCart();
  const navigate = useNavigate();

  return (
    <Page title="Your Cart">
      <PageHero
        eyebrow="Your Cart"
        title="Your reservation cart"
        text="Each kitten is one of a kind — adding them to your cart begins the reservation. Nothing is final until checkout."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          {items.length === 0 ? (
            <Reveal>
              <div className="cart-empty">
                <CartIcon width="52" height="52" />
                <h2>Your cart is empty</h2>
                <p>Meet our available kittens and find the one who belongs with you.</p>
                <Link to="/kittens" className="btn btn--gold">Browse Available Kittens</Link>
              </div>
            </Reveal>
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {items.map((k, i) => (
                  <Reveal key={k.id} delay={i * 0.08}>
                    <article className="cart-row">
                      <Link to={`/kittens/${k.id}`} className="cart-row__media">
                        <CatArt img={k.img} palette={k.palette} label={`${k.name}, ${k.color}`} />
                      </Link>
                      <div className="cart-row__info">
                        <h3><Link to={`/kittens/${k.id}`}>{k.name}</Link></h3>
                        <p>{k.color} · {k.sex} · {k.age}</p>
                        <p className="cart-row__ready">{k.ready}</p>
                      </div>
                      <div className="cart-row__end">
                        <strong>${k.price.toLocaleString()}</strong>
                        <button
                          className="cart-row__remove"
                          onClick={() => remove(k.id)}
                          aria-label={`Remove ${k.name} from cart`}
                        >
                          <TrashIcon width="18" height="18" /> Remove
                        </button>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.12}>
                <aside className="cart-summary" aria-label="Order summary">
                  <h3>Summary</h3>
                  <div className="cart-summary__row">
                    <span>Subtotal ({items.length} kitten{items.length > 1 ? 's' : ''})</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Deposit due today</span>
                    <span>${(items.length * 500).toLocaleString()}</span>
                  </div>
                  <div className="cart-summary__row cart-summary__row--muted">
                    <span>Delivery</span>
                    <span>Chosen at checkout</span>
                  </div>
                  <div className="cart-summary__total">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <button className="btn btn--gold" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </button>
                  <p className="cart-summary__note">
                    <ShieldIcon width="16" height="16" /> $500 per kitten reserves them today — the
                    balance is due before go-home day.
                  </p>
                </aside>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}
