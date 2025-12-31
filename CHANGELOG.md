# Changelog

All notable changes to this project will be documented in this file.

## v1.0.0

### Core System
- **Source of Truth**: Implemented `src/lib/content.js` to resolve routes using `navigation.json` files.
- **Hierarchical Routing**: Established `/content` directory structure where hierarchy is strictly defined by JSON.
- **Content Discovery**: Added build-time logic to index content and navigation nodes.

### Navigation & UI
- **Context-Aware Sidebar**: Implemented a recursive sidebar that highlights active nodes and auto-expands parent groups.
- **Breadcrumbs**: Added navigable breadcrumb trails for deep linking context.
- **DFS Pagination**: Implemented "Previous" and "Next" navigation based on depth-first search traversal of the content tree.
- **Responsive Design**: Built a mobile-first layout with a drawer menu for small screens and sticky sidebar for desktops.

### Dark Mode
- **Theme Support**: Added support for Light and Dark themes via CSS variables.
- **Persistence**: Implemented `ThemeToggle` component that saves user preference to `localStorage`.
- **Global Header**: Moved theme toggle to a global header for consistent access on desktop and mobile.

### Visual Polish
- **Modern Typography**: Updated font stack to use Inter and System fonts with refined heading hierarchy.
- **Interactive Sidebar**: Added collapsible nodes with chevron animations and indentation for better hierarchy visibility.
- **Card-Based Pagination**: Styled pagination links as large, clickable cards with hover effects.
- **Enhanced Markdown**: Improved styling for code blocks (rounded corners, contrast) and blockquotes.

### Content
- **JavaScript Section**: Added sample content including Foundations (Variables, Data Types), Functions (Arrow Functions, Closures), and Objects (Prototypes, Classes).
- **Web APIs Section**: Added sample content for Attribution Reporting API.
