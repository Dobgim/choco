import { useState } from 'react';
import Page from '../components/Page.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { useData } from '../context/DataContext.jsx';

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 5c0 8.3 6.7 15 15 15l2-4-4.5-2-2 2A11.7 11.7 0 0 1 8 9.5l2-2L8 3z" strokeLinejoin="round" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.5l3.5 2" strokeLinecap="round" />
  </svg>
);

export default function Contact() {
  const { kittens, addInquiry } = useData();
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const interestId = data.get('interest');
    const kitten = kittens.find((k) => k.id === interestId);
    addInquiry({
      name: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      phone: data.get('phone'),
      interest: kitten ? `${kitten.name} (${kitten.color} ${kitten.sex})` : interestId || 'General',
      message: data.get('message'),
    });
    setSent(true);
    e.target.reset();
  };

  return (
    <Page title="Contact Us">
      <PageHero
        eyebrow="Contact Us"
        title="Let's find your gentle giant"
        text="Send an inquiry, ask a question, or schedule a visit — we personally answer every message within 24 hours."
      />

      <section className="section">
        <div className="container contact-layout">
          <Reveal>
            <div className="contact-info">
              <div className="contact-info__row">
                <PhoneIcon />
                <div>
                  <b>Call or Text</b>
                  <span><a href="tel:+17168020416">+1 (716) 802-0416</a></span>
                </div>
              </div>
              <div className="contact-info__row">
                <MailIcon />
                <div>
                  <b>Email</b>
                  <span><a href="mailto:cozypawscatterymainecoon23@gmail.com">cozypawscatterymainecoon23@gmail.com</a></span>
                </div>
              </div>
              <div className="contact-info__row">
                <ClockIcon />
                <div>
                  <b>Hours</b>
                  <span>Monday – Saturday · 9am – 6pm CT<br />Visits by appointment only</span>
                </div>
              </div>
              <div className="contact-info__row">
                <PinIcon />
                <div>
                  <b>Location</b>
                  <span>1234 W Madison St, Chicago, IL 60607, USA<br />Visits by appointment</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <form className="form" onSubmit={onSubmit} aria-label="Inquiry form">
              {sent && (
                <p className="form__success" role="status">
                  Thank you! Your inquiry is on its way — we'll reply within 24 hours.
                </p>
              )}
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
                  Phone (optional)
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
              </div>
              <label>
                I'm interested in
                <select name="interest" defaultValue="">
                  <option value="" disabled>Select an option…</option>
                  {kittens.filter((k) => k.status === 'Available').map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.name} — {k.color} {k.sex}
                    </option>
                  ))}
                  <option value="waitlist">Joining the waitlist</option>
                  <option value="visit">Scheduling a visit</option>
                  <option value="question">A general question</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your family, your home, and the companion you're hoping for…"
                />
              </label>
              <button type="submit" className="btn btn--gold" style={{ justifySelf: 'start' }}>
                Send Inquiry
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
