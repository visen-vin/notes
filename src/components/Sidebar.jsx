import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { getAllSubjects, resolveRoute } from '../lib/content';

export default function Sidebar() {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const resolved = resolveRoute(segments);
    const subjects = getAllSubjects();

    // If no subject is active, show list of subjects
    if (!resolved || !resolved.subject) {
        return (
            <nav className="sidebar-nav">
                <div className="nav-group-title">Subjects</div>
                <ul>
                    {subjects.map(subject => (
                        <li key={subject.path}>
                            <Link to={`/${subject.path}`} className="nav-link">
                                {subject.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }

    const { subject } = resolved;

    return (
        <nav className="sidebar-nav">
            <Link to="/" className="nav-link" style={{ marginBottom: '1rem', display: 'block', fontSize: '0.9rem', color: 'var(--color-breadcrumb)' }}>
                ← All Subjects
            </Link>
            <div className="nav-group-title" style={{ color: 'var(--color-primary)', fontSize: '1.1em' }}>{subject.title}</div>
            <ul>
                {subject.children?.map(child => (
                    <SidebarItem
                        key={child.path}
                        node={child}
                        parentPath={`/${subject.path}`}
                        currentPath={location.pathname}
                    />
                ))}
            </ul>
        </nav>
    );
}

function SidebarItem({ node, parentPath, currentPath }) {
    const fullPath = `${parentPath}/${node.path}`;
    const hasChildren = node.children && node.children.length > 0;

    // Auto-expand if the current page is within this node's tree
    const isActive = currentPath === fullPath;
    const isChildActive = currentPath.startsWith(fullPath + '/');

    const [isOpen, setIsOpen] = useState(isChildActive);

    // Sync open state if user navigates via other means (e.g. breadcrumbs)
    useEffect(() => {
        if (isChildActive) {
            setIsOpen(true);
        }
    }, [isChildActive]);

    const toggleOpen = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <li className="sidebar-item">
            <div className={`sidebar-row ${isActive ? 'active' : ''}`}>
                {hasChildren && (
                    <button className="sidebar-toggle" onClick={toggleOpen} aria-label="Toggle Section">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
                <Link to={fullPath} className="sidebar-link">
                    {node.title}
                </Link>
            </div>

            {hasChildren && isOpen && (
                <ul className="sidebar-children">
                    {node.children.map(child => (
                        <SidebarItem
                            key={child.path}
                            node={child}
                            parentPath={fullPath}
                            currentPath={currentPath}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
