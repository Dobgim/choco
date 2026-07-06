import { useEffect } from 'react';
import { Navigate, NavLink, Outlet, Link } from 'react-router-dom';
import CrownLogo from '../components/CrownLogo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

export default function AdminLayout() {
  const { authed, logout } = useAuth();
  const { orders, inquiries } = useData();

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
        <Outlet />
      </main>
    </div>
  );
}
