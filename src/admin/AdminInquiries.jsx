import { useData } from '../context/DataContext.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';

const fmtDate = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });

export default function AdminInquiries() {
  const { inquiries, updateInquiry, deleteInquiry } = useData();

  return (
    <div>
      <header className="admin-head">
        <div>
          <h1>Inquiries</h1>
          <p>Messages sent through the website contact form.</p>
        </div>
      </header>

      {inquiries.length === 0 ? (
        <div className="admin-panel">
          <p className="admin-empty">No inquiries yet — contact form messages will appear here.</p>
        </div>
      ) : (
        inquiries.map((q) => (
          <article className={`admin-panel admin-inquiry${q.handled ? ' admin-inquiry--handled' : ''}`} key={q.id}>
            <header className="admin-order__head">
              <div>
                <h2>{q.name}</h2>
                <span className="admin-order__date">{fmtDate(q.date)}</span>
              </div>
              <div className="admin-order__controls">
                <span className={`admin-badge admin-badge--${q.handled ? 'completed' : 'new'}`}>
                  {q.handled ? 'Handled' : 'Open'}
                </span>
                <button
                  className="admin-link"
                  onClick={() => updateInquiry(q.id, { handled: !q.handled })}
                >
                  Mark {q.handled ? 'Open' : 'Handled'}
                </button>
                <ConfirmDelete onConfirm={() => deleteInquiry(q.id)} />
              </div>
            </header>
            <p className="admin-inquiry__meta">
              <a href={`mailto:${q.email}`}>{q.email}</a>
              {q.phone && <> · <a href={`tel:${q.phone}`}>{q.phone}</a></>}
              {q.interest && <> · Interested in: <b>{q.interest}</b></>}
            </p>
            <p className="admin-inquiry__msg">{q.message}</p>
          </article>
        ))
      )}
    </div>
  );
}
