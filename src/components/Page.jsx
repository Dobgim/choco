import { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Route wrapper: smooth page transition + per-page document title.
 */
export default function Page({ title, children }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Velvet Crown Maine Coons`
      : 'Velvet Crown Maine Coons | Premium Maine Coon Cattery';
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
