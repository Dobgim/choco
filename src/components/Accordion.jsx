import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div className="accordion__item" key={item.q}>
            <h3>
              <button
                className="accordion__q"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                {item.q}
                <motion.span
                  className="accordion__chev"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="accordion__a">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
