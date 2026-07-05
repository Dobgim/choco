import { Link } from 'react-router-dom';
import CatArt from './CatArt.jsx';
import { PawIcon, CartIcon, CheckIcon } from './icons.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function KittenCard({ kitten }) {
  const reserved = kitten.status !== 'Available';
  const { add, inCart } = useCart();
  const added = inCart(kitten.id);

  return (
    <article className="card kitten-card">
      <div className="kitten-card__media">
        <CatArt img={kitten.img} palette={kitten.palette} label={`${kitten.name}, a ${kitten.color} Maine Coon kitten`} />
        <span className={`kitten-card__status${reserved ? ' kitten-card__status--reserved' : ''}`}>
          {kitten.status}
        </span>
      </div>
      <div className="kitten-card__body">
        <h3>{kitten.name}</h3>
        <div className="kitten-card__meta">
          <span><PawIcon width="13" height="13" style={{ color: 'var(--gold)' }} /> {kitten.sex}</span>
          <span><PawIcon width="13" height="13" style={{ color: 'var(--gold)' }} /> {kitten.color}</span>
          <span><PawIcon width="13" height="13" style={{ color: 'var(--gold)' }} /> {kitten.age}</span>
        </div>
        <div className="kitten-card__price">${kitten.price.toLocaleString()}</div>
        <div className="kitten-card__actions">
          <Link to={`/kittens/${kitten.id}`} className="btn btn--outline kitten-card__link">
            Meet {kitten.name}
          </Link>
          {!reserved && (
            <button
              className={`btn ${added ? 'btn--outline' : 'btn--gold'} kitten-card__link`}
              onClick={() => add(kitten.id)}
              disabled={added}
            >
              {added ? (
                <><CheckIcon width="15" height="15" /> In Cart</>
              ) : (
                <><CartIcon width="15" height="15" /> Add to Cart</>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
