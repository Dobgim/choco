export default function CrownLogo({ className = 'nav__crown' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="#3f2f20" />
      <path
        d="M12 30l2-12 6 6 4-9 4 9 6-6 2 12z"
        fill="#caa04a"
        stroke="#ecd9ae"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect x="13" y="31" width="22" height="3.4" rx="1.7" fill="#caa04a" />
    </svg>
  );
}
