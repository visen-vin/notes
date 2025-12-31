import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar on navigation (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    return (
        <div className="app-container">
            <header className="mobile-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link to="/" style={{ marginLeft: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                        MDN Lite
                    </Link>
                </div>
                <ThemeToggle />
            </header>

            <div className="main-content-wrapper">
                <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <Sidebar />
                </aside>

                <main className="content-area">
                    <div className="content-inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
