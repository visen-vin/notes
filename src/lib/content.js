
/**
 * Core content library for MDN-style documentation engine.
 * navigation.json is the single source of truth.
 */

// Use import.meta.glob to discover and import content at build time (Vite feature)
const navigations = import.meta.glob("/content/**/navigation.json", { eager: true });
const markdowns = import.meta.glob("/content/**/*.md", { query: "?raw", eager: true });

/**
 * Returns a list of all subjects based on navigation.json files.
 */
export function getAllSubjects() {
    const subjects = [];
    for (const path in navigations) {
        subjects.push(navigations[path].default || navigations[path]);
    }
    return subjects;
}

/**
 * Resolves a navigation entry from the path segments.
 * Match route segments against navigation.json tree.
 */
export function resolveRoute(segments) {
    if (segments.length === 0) return { type: 'home' };

    const subjectPath = segments[0];
    const subjectNav = getAllSubjects().find(s => s.path === subjectPath);

    if (!subjectNav) return null;

    if (segments.length === 1) {
        return { type: 'subject', node: subjectNav, subject: subjectNav };
    }

    // Traverse children for subsequent segments
    let currentNode = subjectNav;
    const breadcrumbs = [{ title: 'Home', path: '/' }, { title: subjectNav.title, path: `/${subjectNav.path}` }];

    for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const nextNode = currentNode.children?.find(child => child.path === segment);

        if (!nextNode) return null;

        currentNode = nextNode;
        breadcrumbs.push({
            title: currentNode.title,
            path: breadcrumbs[breadcrumbs.length - 1].path + '/' + currentNode.path
        });
    }

    const type = currentNode.children ? 'group' : 'page';
    return { type, node: currentNode, subject: subjectNav, breadcrumbs };
}

/**
 * Fetches markdown content for a resolved node.
 */
export function getMarkdownContent(segments) {
    const fullPath = `/content/${segments.join('/')}/index.md`;
    return markdowns[fullPath]?.default || null;
}

/**
 * DFS traversal to find all navigable pages for Prev/Next.
 */
export function getNavigablePages(nodes, prefix = '') {
    let pages = [];
    if (!nodes) return pages;
    for (const node of nodes) {
        const currentPath = prefix + '/' + node.path;
        if (!node.children) {
            pages.push({ title: node.title, path: currentPath });
        } else {
            // Subjects and Groups might have content too if index.md exists
            pages.push({ title: node.title, path: currentPath });
            pages = pages.concat(getNavigablePages(node.children, currentPath));
        }
    }
    return pages;
}

export function getPagination(segments) {
    const subjectPath = segments[0];
    const subjectNav = getAllSubjects().find(s => s.path === subjectPath);
    if (!subjectNav) return { prev: null, next: null };

    const pages = getNavigablePages([subjectNav], '');
    const currentPath = '/' + segments.join('/');
    const currentIndex = pages.findIndex(p => p.path === currentPath);

    return {
        prev: currentIndex > 0 ? pages[currentIndex - 1] : null,
        next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null
    };
}
