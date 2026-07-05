import { motion } from 'framer-motion';

const WHATSAPP_URL =
  'https://wa.me/17168020416?text=' +
  encodeURIComponent("Hello! I'm interested in one of your Maine Coon kittens.");

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.16 1.62 5.97L4 27l6.24-1.62a12.1 12.1 0 0 0 5.79 1.47h.01c6.63 0 12.03-5.36 12.03-11.97C28.07 8.36 22.67 3 16.04 3zm0 21.85h-.01a10.1 10.1 0 0 1-5.12-1.4l-.37-.22-3.7.96.99-3.6-.24-.37a9.85 9.85 0 0 1-1.53-5.25c0-5.5 4.5-9.97 10-9.97 2.67 0 5.18 1.04 7.07 2.92a9.83 9.83 0 0 1 2.93 7.06c0 5.5-4.51 9.87-10.02 9.87zm5.5-7.4c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5a9.05 9.05 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </motion.a>
  );
}
