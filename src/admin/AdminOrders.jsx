import { useData } from '../context/DataContext.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';

const STATUSES = ['New', 'Contacted', 'Deposit Paid', 'Completed', 'Cancelled'];
const fmt = (n) => `$${Number(n || 0).toLocaleString()}`;
const fmtDate = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });

export default function AdminOrders() {
  const { orders, updateOrder, deleteOrder } = useData();

  return (
    <div>
      <header className="admin-head">
        <div>
          <h1>Orders</h1>
          <p>Reservations placed through the website checkout.</p>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="admin-panel">
          <p className="admin-empty">No orders yet — checkout reservations will appear here.</p>
        </div>
      ) : (
        orders.map((o) => (
          <article className="admin-panel admin-order" key={o.id}>
            <header className="admin-order__head">
              <div>
                <h2>{o.id}</h2>
                <span className="admin-order__date">{fmtDate(o.date)}</span>
              </div>
              <div className="admin-order__controls">
                <label className="admin-order__status">
                  Status
                  <select value={o.status} onChange={(e) => updateOrder(o.id, { status: e.target.value })}>
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <ConfirmDelete onConfirm={() => deleteOrder(o.id)} />
              </div>
            </header>

            <div className="admin-order__grid">
              <div>
                <h3>Customer</h3>
                <p>
                  <b>{o.customer?.name}</b><br />
                  {o.customer?.email}<br />
                  {o.customer?.phone}<br />
                  {o.customer?.address}
                </p>
                {o.notes && (
                  <p className="admin-order__notes">
                    <b>Notes:</b> {o.notes}
                  </p>
                )}
              </div>
              <div>
                <h3>Kittens</h3>
                <ul>
                  {o.items?.map((i) => (
                    <li key={i.id}>
                      {i.name} — {fmt(i.price)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Payment</h3>
                <p>
                  Delivery: {o.deliveryLabel} ({fmt(o.deliveryPrice)})<br />
                  Plan: {o.payMode === 'full' ? 'Paid in full' : 'Deposit'}<br />
                  Due today: <b>{fmt(o.dueToday)}</b><br />
                  Total: <b>{fmt(o.total)}</b>
                </p>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
