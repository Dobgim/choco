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
  return <img className="catart" src={`/images/cats/${file}`} alt={label} loading="lazy" />;
}
