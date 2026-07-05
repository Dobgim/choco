import { Link } from 'react-router-dom';
import Page from '../components/Page.jsx';

export default function NotFound() {
  return (
    <Page title="Page Not Found">
      <div className="notfound">
        <div>
          <h1>404</h1>
          <p style={{ margin: '6px 0 28px', color: 'var(--brown-soft)' }}>
            This page wandered off like a curious kitten. Let's get you home.
          </p>
          <Link to="/" className="btn btn--gold">Back to Home</Link>
        </div>
      </div>
    </Page>
  );
}
