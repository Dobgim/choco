// Shared icon set — elegant 24×24 stroke icons replacing emoji throughout the site.
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const HealthIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 3v5a5 5 0 0 0 10 0V3" />
    <path d="M11 13v3a4.5 4.5 0 0 0 9 0v-1.5" />
    <circle cx="20" cy="12" r="2.4" />
  </svg>
);

export const ScrollIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M7 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2h3z" />
    <path d="M10 9h6M10 13h6M10 17h4" />
  </svg>
);

export const BasketIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 10h16l-1.6 9a2 2 0 0 1-2 1.6H7.6a2 2 0 0 1-2-1.6z" />
    <path d="M8 10l3.2-6M16 10l-3.2-6M9.5 14v3M14.5 14v3" />
  </svg>
);

export const PawIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <ellipse cx="12" cy="15.5" rx="4.6" ry="3.8" />
    <ellipse cx="6.2" cy="10.5" rx="1.9" ry="2.4" />
    <ellipse cx="10" cy="7.4" rx="1.9" ry="2.5" />
    <ellipse cx="14" cy="7.4" rx="1.9" ry="2.5" />
    <ellipse cx="17.8" cy="10.5" rx="1.9" ry="2.4" />
  </svg>
);

export const HeartIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 20.5s-7.5-4.7-9.3-9.3C1.5 8 3.6 4.9 6.8 4.9c2 0 3.7 1.1 5.2 3 1.5-1.9 3.2-3 5.2-3 3.2 0 5.3 3.1 4.1 6.3-1.8 4.6-9.3 9.3-9.3 9.3z" />
  </svg>
);

export const HomeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 11l8-7 8 7" />
    <path d="M6 9.5V20h12V9.5" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);

export const LeafIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" />
    <path d="M5 19c3-5 7-8 11-10" />
  </svg>
);

export const HandshakeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 7l4-2 5 2.5L17 5l4 2v7l-4 4-5-2-4 2-5-4z" />
    <path d="M12 7.5L8.5 11a1.8 1.8 0 0 0 2.5 2.5l1.5-1.4" />
  </svg>
);

export const CartIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="9.5" cy="20" r="1.4" />
    <circle cx="17.5" cy="20" r="1.4" />
    <path d="M3 4h2.4l2.2 12h10.5l2-8.5H6.3" />
  </svg>
);

export const TrashIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M9 7V4.8A1 1 0 0 1 10 4h4a1 1 0 0 1 1 1V7M6.5 7l1 13h9l1-13" />
    <path d="M10 11v5.5M14 11v5.5" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const ShieldIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7.5 3v6c0 4.5-3.2 7.7-7.5 9-4.3-1.3-7.5-4.5-7.5-9V6z" />
    <path d="M8.8 12l2.3 2.3 4.2-4.3" />
  </svg>
);

export const iconMap = {
  health: HealthIcon,
  scroll: ScrollIcon,
  basket: BasketIcon,
  paw: PawIcon,
  heart: HeartIcon,
  home: HomeIcon,
  leaf: LeafIcon,
  handshake: HandshakeIcon,
  shield: ShieldIcon,
};

/** Renders a named icon inside the gold feature-card tile. */
export function FeatureIcon({ name }) {
  const I = iconMap[name] || PawIcon;
  return (
    <div className="feature-card__icon">
      <I width="28" height="28" />
    </div>
  );
}
