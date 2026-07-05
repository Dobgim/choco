import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}
