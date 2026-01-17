# SkillHub Web

A Vue.js frontend for SkillHub - a marketplace to discover and install Claude skills and plugins.

## Features

- Browse and search for Claude skills
- Filter skills by category (Popular, Data Analysis, Writing, Development, Productivity)
- View skill details including description and category
- Modern, responsive UI matching the prototype design

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173/

### Build for Production

```bash
npm run build
```

The production files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── NavBar.vue      # Navigation bar
│   │   └── Footer.vue      # Page footer
│   └── home/
│       ├── HeroSection.vue # Hero section with title
│       ├── SearchBar.vue   # Search input with filters
│       ├── FilterTags.vue  # Category filter tags
│       └── SkillCard.vue   # Individual skill card
├── views/
│   └── HomeView.vue        # Main home page
├── types/
│   └── skill.ts            # TypeScript interfaces
├── services/
│   └── skillService.ts     # Data fetching service
├── App.vue                 # Root component
├── main.ts                 # App entry point
└── style.css               # Global styles
```

## Data Source

Skills are loaded from `/public/data/marketplace.json` at runtime. This file is copied from the `skill_marketplace/.claude-plugin/marketplace.json` configuration.
