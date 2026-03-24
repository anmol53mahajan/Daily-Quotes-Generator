# DailyQuotes

DailyQuotes is a React app that fetches motivational quotes from an external API and lets users save their favorite quotes locally.

The app is built with Vite and Tailwind CSS v4, and it includes a clean two-panel layout:

- Left panel: current quote card with actions
- Right panel: liked quotes list with author search and delete actions

## Features

- Fetch a random quote from Quotable API
- Show loading state while fetching
- Handle API errors with a user-friendly message
- Like/unlike the current quote
- Persist liked quotes in browser local storage
- Search liked quotes by author name
- Delete liked quotes individually
- Display a live count of total liked quotes

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Axios for API requests
- Lucide React icons
- ESLint 9 for linting

## Project Structure

```
reactproject_1/
|- public/
|- src/
|  |- assets/
|  |- components/
|  |  |- LikedList.jsx
|  |  |- QuoteCard.jsx
|  |- hooks/
|  |  |- useLocalStorage.js
|  |- App.jsx
|  |- App.css
|  |- index.css
|  |- main.jsx
|- eslint.config.js
|- index.html
|- package.json
|- vite.config.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

If you see an icon import error for `lucide-react`, install it with:

```bash
npm install lucide-react
```

### 2. Start development server

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev`: start the Vite development server
- `npm run build`: create a production build in `dist/`
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint on project files

## How It Works

1. On first load, the app fetches a random quote from:
	`https://api.quotable.io/random`
2. The quote is displayed with author and action buttons.
3. Clicking **Like** stores the quote in local storage.
4. Liked quotes appear in the right panel.
5. You can filter liked quotes by typing an author name.
6. Liked quotes remain available after page refresh.

The app stores favorites under the local storage key:

`likedQuotes`

## Notes

- Internet connection is required to fetch new quotes.
- If the quote API is unavailable, the app shows an error message and allows retrying.
- `App.css` is currently empty; styling is handled primarily with Tailwind utility classes and `src/index.css`.

## Future Improvements

- Add pagination or lazy loading for liked quotes
- Add category/tag filters (if supported by API)
- Add dark mode toggle
- Add unit tests for components and hooks

## License

This project is currently unlicensed for public distribution. Add a license file if you plan to share it.
