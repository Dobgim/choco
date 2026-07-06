import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext.jsx';

const fmt = (n) => `$${n.toLocaleString()}`;
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function AdminDashboard() {
  const { kittens, orders, inquiries } = useData();

  const available = kittens.filter((k) => k.status === 'Available').length;
  const reserved = kittens.filter((k) => k.status !== 'Available').length;
  const activeOrders = orders.filter((o) => o.status !== 'Cancelled');
  const revenue = activeOrders.reduce((s, o) => s + (o.total || 0), 0);
  const openInquiries = inquiries.filter((q) => !q.handled).length;

  const stats = [
    { label: 'Available Kittens', value: available, to: '/admin/kittens' },
    { label: 'Reserved / Sold', value: reserved, to: '/admin/kittens' },
    { label: 'Orders', value: orders.length, to: '/admin/orders' },
    { label: 'Order Value', value: fmt(revenue), to: '/admin/orders' },
    { label: 'Open Inquiries', value: openInquiries, to: '/admin/inquiries' },
  ];

  return (
    <div>
      <header className="admin-head">
        <div>
          <h1>Dashboard</h1>
          <p>Everything happening at Cozy Paws at a glance.</p>
        </div>
        <Link to="/admin/kittens" className="btn btn--gold">
          + Add Kitten
        </Link>
      </header>

      <div className="stat-grid">
        {stats.map((s) => (
          <Link to={s.to} className="stat-card" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </Link>
        ))}
      </div>

      <section className="admin-panel">
        <h2>Recent orders</h2>
        {orders.length === 0 ? (
          <p className="admin-empty">No orders yet — they'll appear here when customers check out.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Kittens</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{fmtDate(o.date)}</td>
                    <td>{o.customer?.name}</td>
                    <td>{o.items?.map((i) => i.name).join(', ')}</td>
                    <td>{fmt(o.total || 0)}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${o.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="admin-panel">
        <h2>Latest inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="admin-empty">No inquiries yet — contact form messages land here.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Interested In</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 6).map((q) => (
                  <tr key={q.id}>
                    <td>{fmtDate(q.date)}</td>
                    <td>{q.name}</td>
                    <td>{q.email}</td>
                    <td>{q.interest}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${q.handled ? 'completed' : 'new'}`}>
                        {q.handled ? 'Handled' : 'Open'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
