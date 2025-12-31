import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>Return Home</Link>
        </div>
    );
}
