import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CrownLogo from '../components/CrownLogo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const { authed, login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Login | Cozy Paws Cattery Maine Coon';
    if (authed) navigate('/admin', { replace: true });
  }, [authed, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (login(data.get('username'), data.get('password'))) {
      navigate('/admin', { replace: true });
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="admin-login">
      <motion.form
        className="admin-login__card"
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <CrownLogo className="admin-login__logo" />
        <h1>Admin Login</h1>
        <p>Cozy Paws Cattery management dashboard</p>
        {error && (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        )}
        <label>
          Username
          <input type="text" name="username" required autoComplete="username" autoFocus />
        </label>
        <label>
          Password
          <input type="password" name="password" required autoComplete="current-password" />
        </label>
        <button type="submit" className="btn btn--gold" style={{ width: '100%' }}>
          Sign In
        </button>
      </motion.form>
    </div>
  );
}
