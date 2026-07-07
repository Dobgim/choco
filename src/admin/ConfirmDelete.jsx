import { useEffect, useState } from 'react';

/**
 * Inline two-step delete confirmation. Replaces window.confirm(),
 * which many mobile and in-app browsers silently block — making
 * delete buttons appear dead. Arms on first click, auto-disarms
 * after a few seconds if not confirmed.
 */
export default function ConfirmDelete({ onConfirm, label = 'Delete' }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return undefined;
    const t = setTimeout(() => setArmed(false), 5000);
    return () => clearTimeout(t);
  }, [armed]);

  if (!armed) {
    return (
      <button type="button" className="admin-link admin-link--danger" onClick={() => setArmed(true)}>
        {label}
      </button>
    );
  }

  return (
    <span className="confirm-delete">
      <button type="button" className="confirm-delete__yes" onClick={onConfirm}>
        Yes, delete
      </button>
      <button type="button" className="admin-link" onClick={() => setArmed(false)}>
        Cancel
      </button>
    </span>
  );
}
