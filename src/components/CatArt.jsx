// Real Maine Coon photography (freely licensed, Wikimedia Commons),
// served from /public/images/cats. `img` picks a specific photo;
// `palette` remains as a fallback so older call sites keep working.
const fallbackByPalette = {
  silver: 'silver.jpg',
  brown: 'tabby-cujo.jpg',
  cream: 'white.jpg',
  smoke: 'atticus.jpg',
  blue: 'bluesmoke.jpg',
  red: 'redkitten.jpg',
  sage: 'home.jpg',
};

export default function CatArt({ img, palette = 'brown', label = 'Maine Coon cat' }) {
  const file = img || fallbackByPalette[palette] || fallbackByPalette.brown;
  const src = /^https?:\/\//.test(file) ? file : `/images/cats/${file}`;
  return <img className="catart" src={src} alt={label} loading="lazy" />;
}
