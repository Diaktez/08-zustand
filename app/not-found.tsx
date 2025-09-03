import type { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHUB',
  description: 'The page you are looking for does not exist on NoteHUB.',
  openGraph: {
    title: '404 - Page Not Found | NoteHUB',
    description: 'Oops! The page you are trying to access does not exist.',
    url: 'https://08-zustand-blush-one.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 600,
        alt: '404 - Page Not Found',
      },
    ],
    type: 'website',
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
