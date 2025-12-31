import { Link } from 'react-router-dom';
import { getAllSubjects } from '../lib/content';

export default function HomePage() {
    const subjects = getAllSubjects();

    return (
        <div>
            <h1>Documentation</h1>
            <p>Select a subject to start browsing the documentation.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                {subjects.map(subject => (
                    <Link
                        key={subject.path}
                        to={`/${subject.path}`}
                        style={{
                            padding: '1.5rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <h2 style={{ marginTop: 0, color: 'var(--color-primary)' }}>{subject.title}</h2>
                        <p style={{ margin: 0, color: '#666' }}>Explore the {subject.title} documentation.</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
