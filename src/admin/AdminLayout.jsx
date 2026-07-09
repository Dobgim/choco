import { useEffect } from 'react';
import { Navigate, NavLink, Outlet, Link } from 'react-router-dom';
import CrownLogo from '../components/CrownLogo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

export default function AdminLayout() {
  const { authed, logout } = useAuth();
  const { orders, inquiries, backend, dbError } = useData();

  useEffect(() => {
    document.title = 'Admin Dashboard | Cozy Paws Cattery Maine Coon';
  }, []);

  if (!authed) return <Navigate to="/admin/login" replace />;

  const newOrders = orders.filter((o) => o.status === 'New').length;
  const openInquiries = inquiries.filter((q) => !q.handled).length;

  const linkClass = ({ isActive }) => `admin-nav__link${isActive ? ' admin-nav__link--active' : ''}`;

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <Link to="/admin" className="admin__brand">
          <CrownLogo className="admin__brand-logo" />
          <span>
            Cozy Paws
            <small>Admin</small>
          </span>
        </Link>
        <nav className="admin-nav" aria-label="Admin">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/kittens" className={linkClass}>
            Kittens
          </NavLink>
          <NavLink to="/admin/orders" className={linkClass}>
            Orders {newOrders > 0 && <span className="admin-nav__badge">{newOrders}</span>}
          </NavLink>
          <NavLink to="/admin/inquiries" className={linkClass}>
            Inquiries {openInquiries > 0 && <span className="admin-nav__badge">{openInquiries}</span>}
          </NavLink>
          <NavLink to="/admin/videos" className={linkClass}>
            Videos
          </NavLink>
        </nav>
        <div className="admin__sidebar-footer">
          <Link to="/" className="admin-nav__link">
            ← View Website
          </Link>
          <button className="btn btn--outline admin__logout" onClick={logout}>
            Log Out
          </button>
        </div>
      </aside>
      <main className="admin__main">
        {backend === 'local' && (
          <div className="admin-banner admin-banner--warning" role="alert">
            <h3>⚠️ Running in Offline (Local Storage) Mode</h3>
            <p>
              Supabase environment variables are missing from this build environment. Any listings, orders, or inquiries you add will only be stored in this browser's <code>localStorage</code>. They <strong>will not</strong> be saved to Supabase and will not be visible on other devices.
            </p>
            <p><strong>To fix this on your live website:</strong></p>
            <ul>
              <li>Log in to your <strong>Vercel Dashboard</strong>.</li>
              <li>Go to <strong>Settings &rarr; Environment Variables</strong> in your project.</li>
              <li>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>.</li>
              <li>Trigger a new deployment/rebuild for the changes to take effect.</li>
            </ul>
          </div>
        )}

        {backend === 'supabase' && dbError && (
          <div className="admin-banner admin-banner--error" role="alert">
            <h3>❌ Database Connection Error</h3>
            <p>
              The application is configured to connect to Supabase, but encountered an error:
            </p>
            <p>
              <code>{dbError}</code>
            </p>
            <p>
              Please check your Supabase dashboard status, database schema, and credentials.
            </p>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
}
