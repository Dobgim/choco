import Reveal from './Reveal.jsx';

export default function SectionHead({ eyebrow, title, text, center = false }) {
  return (
    <Reveal className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
