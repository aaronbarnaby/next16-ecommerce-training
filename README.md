# Next.js 16 Commerce Training

A responsive and interactive e-commerce application built with Next.js 16 App Router, built with Prisma for mock data and TailwindCSS, utilizing `use cache` for performance optimization.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
pnpm install --force
```

Next setup the mock db with Prisma

```bash
pnpm run prisma.push
```

Seed prisma/seed.ts for initial data:

```sh
pnpm run prisma.seed
```

To view your data in the database, you can run:

```bash
pnpm run prisma.studio
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
