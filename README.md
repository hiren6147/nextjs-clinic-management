# AuraHear Clinic Management System

A modern, multi-tab clinic management interface built with Next.js for managing patients, invoices, and clinic operations.

## Features

- 📊 **Dashboard** - Overview of clinic operations and statistics
- 👥 **Patient Management** - Manage patient records and details
- 💰 **Invoice Management** - Handle billing and invoice tracking
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 🌓 **Dark Mode** - Theme toggle support
- 📑 **Multi-Tab Interface** - Efficient tab-based navigation
- 🔄 **State Management** - Redux Toolkit for global state
- ⚡ **Data Fetching** - TanStack Query for server state management

## Tech Stack

- **Framework**: Next.js 16.0.1
- **React**: 19.2.0
- **State Management**: Redux Toolkit, React Redux
- **Data Fetching**: TanStack Query
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Notifications**: Sonner

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.0.0 or higher
- npm, yarn, pnpm, or bun package manager

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:

   ```bash
   cd nextjs-clinic-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

## Getting Started

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will auto-update as you edit the files.

### Build for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Start Production Server

After building, start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Additional Scripts

- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code using Prettier

## Project Structure

```
nextjs-clinic-management/
├── app/                    # Next.js app directory
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── components/             # React components
│   ├── layout/             # Layout components (Navbar, Sidebar, TabBar)
│   ├── tabs/               # Tab-specific components
│   ├── shared/             # Reusable shared components
│   └── ui/                 # shadcn/ui components
├── store/                  # Redux store and slices
├── providers/              # React context providers
├── lib/                    # Utility functions and API clients
└── public/                 # Static assets
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Redux Toolkit](https://redux-toolkit.js.org) - Learn about Redux Toolkit
- [TanStack Query](https://tanstack.com/query) - Learn about TanStack Query
- [Tailwind CSS](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com) - Learn about shadcn/ui components

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
