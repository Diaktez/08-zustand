import css from './page.module.css';
import type { Metadata } from 'next';

interface Props {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let path = '';

  if (params.slug && params.slug.length > 0) {
    path = '/';
    for (let i = 0; i < params.slug.length; i++) {
      path += params.slug[i];
      if (i < params.slug.length - 1) {
        path += '/';
      }
    }
  }

  return {
    title: `404 - Page Not Found ${path}`,
    description: `The page "${path || 'unknown'}" does not exist on NoteHUB.`,
    openGraph: {
      title: `404 - Page Not Found ${path}`,
      description: `Oops! The page "${
        path || 'unknown'
      }" you are trying to access does not exist.`,
      url: `https://08-zustand-blush-one.vercel.app/${path}`,
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
}

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
