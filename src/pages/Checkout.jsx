import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CatArt from '../components/CatArt.jsx';
import { CheckIcon, ShieldIcon } from '../components/icons.jsx';
import { useCart } from '../context/CartContext.jsx';

const deliveryOptions = [
  { id: 'pickup', label: 'Cattery Pickup — Portland, OR', price: 0 },
  { id: 'ground', label: 'Ground Delivery (within 500 miles)', price: 250 },
  { id: 'nanny', label: 'Flight Nanny (in-cabin, to your airport)', price: 550 },
];

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [delivery, setDelivery] = useState('pickup');
  const [payMode, setPayMode] = useState('deposit');
  const [placed, setPlaced] = useState(null);

  if (items.length === 0 && !placed) return <Navigate to="/cart" replace />;

  const deliveryPrice = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const depositTotal = items.length * 500;
  const dueToday = payMode === 'deposit' ? depositTotal + deliveryPrice : subtotal + deliveryPrice;
  const total = subtotal + deliveryPrice;

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setPlaced({
      name: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      kittens: items.map((k) => k.name).join(', '),
      dueToday,
      orderId: `VC-${Date.now().toString().slice(-6)}`,
    });
    clear();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (placed) {
    return (
      <Page title="Order Confirmed">
        <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 70px)' }}>
          <div className="container">
            <Reveal>
              <div className="checkout-success">
                <span className="checkout-success__icon"><CheckIcon width="34" height="34" /></span>
                <h1>Reservation received!</h1>
                <p>
                  Thank you, {placed.name}. Your reservation for <b>{placed.kittens}</b> is
                  confirmed under order <b>{placed.orderId}</b>. A confirmation email is on its
                  way to {placed.email}, and we'll call you within 24 hours to arrange your
                  deposit of <b>${placed.dueToday.toLocaleString()}</b> and share your private
                  kitten-cam access.
                </p>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/kitten-cams" className="btn btn--gold">Preview the Kitten Cams</Link>
                  <Link to="/" className="btn btn--outline">Back to Home</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </Page>
    );
  }

  return (
    <Page title="Checkout">
      <PageHero
        eyebrow="Checkout"
        title="Complete your reservation"
        text="Review your kittens, choose delivery, and tell us where to send the paperwork."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container checkout-layout">
          <Reveal>
            <form className="form" onSubmit={onSubmit} aria-label="Checkout form">
              <h3 className="form__section-title">Contact details</h3>
              <div className="form__row">
                <label>
                  First Name
                  <input type="text" name="firstName" required autoComplete="given-name" />
                </label>
                <label>
                  Last Name
                  <input type="text" name="lastName" required autoComplete="family-name" />
                </label>
              </div>
              <div className="form__row">
                <label>
                  Email
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" required autoComplete="tel" />
                </label>
              </div>
              <label>
                Home Address
                <input type="text" name="address" required autoComplete="street-address" />
              </label>

              <h3 className="form__section-title">Delivery</h3>
              <div className="choice-list" role="radiogroup" aria-label="Delivery method">
                {deliveryOptions.map((d) => (
                  <label key={d.id} className={`choice${delivery === d.id ? ' choice--active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      value={d.id}
                      checked={delivery === d.id}
                      onChange={() => setDelivery(d.id)}
                    />
                    <span>{d.label}</span>
                    <b>{d.price === 0 ? 'Free' : `$${d.price}`}</b>
                  </label>
                ))}
              </div>

              <h3 className="form__section-title">Payment</h3>
              <div className="choice-list" role="radiogroup" aria-label="Payment option">
                <label className={`choice${payMode === 'deposit' ? ' choice--active' : ''}`}>
                  <input
                    type="radio"
                    name="payMode"
                    value="deposit"
                    checked={payMode === 'deposit'}
                    onChange={() => setPayMode('deposit')}
                  />
                  <span>Reserve with deposit — balance due before go-home day</span>
                  <b>${(depositTotal + deliveryPrice).toLocaleString()} today</b>
                </label>
                <label className={`choice${payMode === 'full' ? ' choice--active' : ''}`}>
                  <input
                    type="radio"
                    name="payMode"
                    value="full"
                    checked={payMode === 'full'}
                    onChange={() => setPayMode('full')}
                  />
                  <span>Pay in full today</span>
                  <b>${(subtotal + deliveryPrice).toLocaleString()} today</b>
                </label>
              </div>

              <label>
                Notes for us (optional)
                <textarea name="notes" placeholder="Anything we should know — other pets, kids, questions…" style={{ minHeight: 90 }} />
              </label>

              <p className="checkout-secure">
                <ShieldIcon width="16" height="16" /> No card is charged online — we confirm every
                reservation personally and send a secure payment link.
              </p>

              <button type="submit" className="btn btn--gold" style={{ justifySelf: 'start' }}>
                Place Reservation — ${dueToday.toLocaleString()} due today
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="cart-summary" aria-label="Order summary">
              <h3>Your kittens</h3>
              {items.map((k) => (
                <div className="checkout-item" key={k.id}>
                  <div className="checkout-item__media">
                    <CatArt img={k.img} palette={k.palette} label={k.name} />
                  </div>
                  <div>
                    <b>{k.name}</b>
                    <span>{k.color} · {k.sex}</span>
                  </div>
                  <strong>${k.price.toLocaleString()}</strong>
                </div>
              ))}
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary__row">
                <span>Delivery</span>
                <span>{deliveryPrice === 0 ? 'Free' : `$${deliveryPrice}`}</span>
              </div>
              <div className="cart-summary__total">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="cart-summary__row cart-summary__row--due">
                <span>Due today</span>
                <span>${dueToday.toLocaleString()}</span>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
