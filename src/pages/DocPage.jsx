import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resolveRoute, getMarkdownContent, getPagination } from '../lib/content';
import { useTextToSpeech } from '../hooks/useTextToSpeech';


// Separate component to handle state for each code block
function CodeBlock({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    // State for code content (editable)
    const [code, setCode] = useState(String(children).replace(/\n$/, ''));
    const [isEditing, setIsEditing] = useState(false);

    // State for execution
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [isConsoleOpen, setIsConsoleOpen] = useState(true);

    // Ref for textarea auto-resize
    const textareaRef = useRef(null);

    // Only enable features for explicit javascript/js blocks
    const isJS = !inline && (language === 'javascript' || language === 'js');

    // Auto-resize textarea to fit content
    useEffect(() => {
        if (textareaRef.current && isEditing) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [code, isEditing]);

    const runCode = () => {
        setOutput([]);
        setError(null);
        setIsConsoleOpen(true); // Auto-open console when code runs

        const logs = [];
        // Mock console.log
        const mockLog = (...args) => {
            logs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
        };

        try {
            const func = new Function('console', code);
            func({ log: mockLog });

            if (logs.length === 0) {
                logs.push("Code executed successfully (no output)");
            }
            setOutput(logs);
        } catch (err) {
            setError(err.toString());
        }
    };

    if (isJS) {
        return (
            <div className="code-block-wrapper has-controls">
                <div className="code-controls">
                    <button
                        className="edit-button"
                        onClick={() => setIsEditing(!isEditing)}
                        aria-label={isEditing ? "Save Code" : "Edit Code"}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button className="run-button" onClick={runCode}>
                        ▶ Run
                    </button>
                </div>

                {isEditing ? (
                    <textarea
                        ref={textareaRef}
                        className="code-textarea"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                    />
                ) : (
                    <code className={className} {...props}>
                        {code}
                    </code>
                )}

                {(output || error) && (
                    <div className="code-console-wrapper">
                        <div
                            className="console-header"
                            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setIsConsoleOpen(!isConsoleOpen)}
                        >
                            <span className="console-title">Console Output</span>
                            <span className={`console-chevron ${isConsoleOpen ? 'open' : ''}`}>▼</span>
                        </div>
                        {isConsoleOpen && (
                            <div className="code-console">
                                {error ? (
                                    <div className="console-error">{error}</div>
                                ) : (
                                    output.map((log, i) => (
                                        <div key={i} className="console-log">
                                            <span className="console-arrow">&gt;</span> {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <code className={className} {...props}>
            {children}
        </code>
    );
}

export default function DocPage() {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);
    const resolved = resolveRoute(segments);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (resolved) {
            const markdown = getMarkdownContent(segments);
            setContent(markdown);
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
    const hasChildren = node.children && node.children.length > 0;

    const { speak, stop, isSpeaking, supported } = useTextToSpeech();

    const handleSpeak = () => {
        if (isSpeaking) {
            stop();
        } else {
            // Strip markdown for cleaner speech
            const cleanText = content
                .replace(/#+\s/g, '') // Remove headers
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Link text only
                .replace(/```[\s\S]*?```/g, '') // Remove code blocks
                .replace(/`([^`]+)`/g, '$1') // Inline code
                .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
                .replace(/\*([^*]+)\*/g, '$1') // Italic
                .trim();
            speak(cleanText);
        }
    };

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

            {supported && content && (
                <div className="tts-controls">
                    <button
                        className={`tts-button ${isSpeaking ? 'stop' : ''}`}
                        onClick={handleSpeak}
                    >
                        {isSpeaking ? '⏹ Stop Listening' : '🔊 Listen Aloud'}
                    </button>
                    {isSpeaking && (
                        <div className="tts-status">
                            <span className="tts-pulse"></span>
                            Speaking...
                        </div>
                    )}
                </div>
            )}

            {content && (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code: CodeBlock,
                        pre({ children }) {
                            return <pre>{children}</pre>;
                        },
                        table({ children }) {
                            return (
                                <div className="table-wrapper">
                                    <table>{children}</table>
                                </div>
                            );
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>
            )}

            {!content && type !== 'page' && (
                <h1>{node.title}</h1>
            )}

            {hasChildren && type !== 'page' && (
                <div className="sub-topics">
                    {!content && <p>Please select a sub-topic from the sidebar or from the list below:</p>}
                    {content && <h2 style={{ marginTop: '3rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Sub-topics</h2>}
                    <ul>
                        {node.children.map(child => (
                            <li key={child.path}>
                                <Link to={`${location.pathname === '/' ? '' : location.pathname}/${child.path}`}>{child.title}</Link>
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
