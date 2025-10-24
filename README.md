# Contact List Application

A modern, responsive single-page React application for managing and viewing contacts. Built with TypeScript, React 18, and Tailwind CSS, this application demonstrates clean component architecture, custom hooks, and accessible UI design.

## 🚀 Live Demo

**Deployed Application:** [Coming Soon - Deployment URL will be added here]

## ✨ Features

- **View Contacts**: Browse through a visually organized list of contacts with name, email, phone, and company information
- **Real-time Search**: Filter contacts by name with instant, case-insensitive search functionality
- **Add New Contacts**: Create new contacts with form validation and immediate feedback
- **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile viewports
- **Accessible UI**: WCAG AA compliant with keyboard navigation and screen reader support
- **Loading States**: Smooth loading experience with skeleton screens
- **Empty States**: Helpful messaging when no contacts exist or search yields no results

## 🛠️ Technology Stack

### Core Technologies
- **React 18.2** - Modern React with functional components and hooks
- **TypeScript 5.2** - Type-safe development with strict mode enabled
- **Vite 5.0** - Lightning-fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.3** - Utility-first CSS framework for rapid, responsive UI development
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

### Development Tools
- **ESLint** - Code quality and consistency enforcement
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities

### Rationale for Technology Choices

**React + TypeScript**: Provides type safety, excellent developer experience, and catches errors at compile time rather than runtime. TypeScript's strict mode ensures robust code quality.

**Vite**: Chosen over Create React App for significantly faster development server startup, hot module replacement (HMR), and optimized production builds. Vite's modern approach leverages native ES modules.

**Tailwind CSS**: Enables rapid UI development with utility classes, ensures consistent design system, and produces minimal CSS in production through purging unused styles. Eliminates the need for separate CSS files and naming conventions.

**Vitest**: Native integration with Vite, faster test execution than Jest, and compatible with React Testing Library for comprehensive component testing.

## 📁 Project Structure

```
contact-list-app/
├── src/
│   ├── components/          # React components
│   │   ├── AddContactForm.tsx
│   │   ├── ContactCard.tsx
│   │   ├── ContactList.tsx
│   │   ├── EmptyState.tsx
│   │   └── SearchBar.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useContacts.ts
│   ├── types/               # TypeScript type definitions
│   │   └── contact.ts
│   ├── data/                # Mock data
│   │   └── mockContacts.ts
│   ├── utils/               # Utility functions
│   │   └── searchFilter.ts
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher

### Installation

1. **Clone the repository** (or navigate to the project directory):
```bash
cd contact-list-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is in use).

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build optimized production bundle (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run test` - Run test suite with Vitest

## 🎨 Design Decisions & Assumptions

### Architecture Decisions

**Component-Based Architecture**: The application is broken down into small, reusable components (ContactCard, SearchBar, etc.) following the single responsibility principle. Each component has a clear, focused purpose.

**Custom Hooks Pattern**: Business logic is extracted into the `useContacts` custom hook, separating data management from UI rendering. This makes the code more testable and reusable.

**Mocked Data with Simulated API**: Rather than connecting to a real backend, the application uses mock data with simulated async behavior (loading states) to demonstrate realistic API interaction patterns without requiring backend infrastructure.

**Optimistic UI Updates**: When adding a contact, the UI updates immediately without waiting for a backend response, providing a snappy user experience.

### Data Management

**Session-Based Persistence**: New contacts are stored in component state and persist only for the current browser session. Refreshing the page resets to the original mock data. This was chosen to keep the implementation simple while demonstrating state management patterns.

**Client-Side Filtering**: Search filtering happens entirely in the browser using `useMemo` for performance optimization. This provides instant feedback without network latency.

### UX Decisions

**Inline Form vs Modal**: The add contact form is implemented as an inline component that toggles visibility rather than a modal. This keeps the implementation simpler while maintaining good UX.

**Responsive Grid Layout**: Contact cards are displayed in a responsive grid (1 column on mobile, 2-3 on tablet, 3-4 on desktop) rather than a traditional list view for better visual appeal and information density.

**Empty States**: Two distinct empty states are provided - one for an empty contact list and one for no search results - each with appropriate messaging and calls-to-action.

### Accessibility Decisions

**Keyboard Navigation**: All interactive elements are keyboard accessible with visible focus indicators.

**ARIA Labels**: Screen reader support is provided through semantic HTML and ARIA labels where needed.

**Color Contrast**: All text meets WCAG AA contrast ratio requirements (4.5:1 for normal text, 3:1 for large text).

### Assumptions

- Users will primarily access the application on modern browsers (Chrome, Firefox, Safari, Edge)
- Contact data volume is small enough that client-side filtering is performant (no pagination needed)
- Email and phone validation is basic (format checking only, not verification)
- No authentication or user accounts are required
- The application is for demonstration purposes and doesn't require production-grade error tracking or analytics

## 🧪 Testing

The application includes comprehensive test coverage for components and functionality:

```bash
npm run test
```

Tests cover:
- Component rendering and props
- Search filtering logic
- Form validation
- User interactions
- Empty state handling

## 📸 Screenshots

[Screenshots or demo GIF will be added after deployment]

## 🚢 Deployment

This application is configured for deployment on Vercel:

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel will automatically detect Vite configuration
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy!

The application can also be deployed to Netlify, GitHub Pages, or any static hosting service.

## 📝 License

This project is open source and available for educational and demonstration purposes.

## 🤝 Contributing

This is a demonstration project, but feedback and suggestions are welcome!

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
