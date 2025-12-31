import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resolveRoute, getMarkdownContent, getPagination } from '../lib/content';

export default function DocPage() {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const resolved = resolveRoute(segments);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (resolved && resolved.type === 'page') {
            const markdown = getMarkdownContent(segments);
            setContent(markdown || '# Content not found\nThe markdown file for this page is missing.');
        } else {
            setContent('');
        }
    }, [location.pathname, resolved]);

    if (!resolved) {
        return (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                <h1>404</h1>
                <p>This page doesn't exist in the navigation tree.</p>
                <Link to="/">Go back home</Link>
            </div>
        );
    }

    const { breadcrumbs, node, type } = resolved;
    const { prev, next } = getPagination(segments);

    return (
        <article className="markdown-body">
            {breadcrumbs && (
                <nav className="breadcrumbs" aria-label="Breadcrumb">
                    {breadcrumbs.map((crumb, i) => (
                        <span key={crumb.path}>
                            <Link to={crumb.path}>{crumb.title}</Link>
                        </span>
                    ))}
                </nav>
            )}

            {type === 'page' ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            ) : (
                <div>
                    <h1>{node.title}</h1>
                    <p>Please select a sub-topic from the sidebar or from the list below:</p>
                    <ul>
                        {node.children?.map(child => (
                            <li key={child.path}>
                                <Link to={`${location.pathname}/${child.path}`}>{child.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {(prev || next) && (
                <nav className="pagination" aria-label="Previous and Next">
                    <div className="pagination-link">
                        {prev && (
                            <Link to={prev.path}>
                                <span className="pagination-label">Previous</span>
                                <span className="pagination-title">« {prev.title}</span>
                            </Link>
                        )}
                    </div>
                    <div className="pagination-link">
                        {next && (
                            <Link to={next.path} style={{ alignItems: 'flex-end', textAlign: 'right' }}>
                                <span className="pagination-label">Next</span>
                                <span className="pagination-title">{next.title} »</span>
                            </Link>
                        )}
                    </div>
                </nav>
            )}
        </article>
    );
}
