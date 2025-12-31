# MDN Lite - Documentation Engine

A responsive, deterministic, and easy-to-evolve documentation website engine inspired by MDN Web Docs. Built with React and Vite.

## 🚀 Key Features

- **Single Source of Truth**: Hierarchy, ordering, and routing are strictly driven by `navigation.json`.
- **MDN-Style Navigation**:
  - Context-aware **Sidebar** with auto-expansion and highlighting.
  - **Breadcrumbs** for easy path navigation.
  - **Previous/Next** pagination based on DFS tree traversal.
- **Modern UI**:
  - Clean, **Mobile-First** responsive design.
  - **Dark Mode** support with persistence.
  - **Premium Typography** using Inter and System fonts.
  - Card-based pagination and refined markdown styling.
- **Markdown Support**: 
  - GitHub Flavored Markdown (GFM) rendering.
  - Code syntax highlighting.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/visen-vin/notes.git
   cd notes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production
```bash
npm run build
```

## 📂 Project Structure

```
/content
  ├── subject-name/
  │    ├── navigation.json    # Defines hierarchy for this subject
  │    ├── group-name/
  │         ├── topic/
  │              ├── index.md # Content file
```

## 📝 How to Add Content

1. **Create a Folder**: Inside `content/`, create a folder for your subject or topic.
2. **Add `navigation.json`**: Define the structure.
   ```json
   {
     "title": "Subject Title",
     "path": "subject-slug",
     "children": [
       {
         "title": "Group Name",
         "path": "group-slug",
         "children": [
           { "title": "Topic", "path": "topic-slug" }
         ]
       }
     ]
   }
   ```
3. **Add Markdown**: Create `index.md` files corresponding to the paths defined in your JSON.

## 🎨 Customization

- **Styles**: Edit `src/index.css` to change CSS variables for colors, fonts, and spacing.
- **Components**: Modify React components in `src/components/` to alter the layout or logic.

## 📄 License
MIT
