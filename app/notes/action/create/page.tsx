import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';
import type { Metadata } from 'next';
import type { NoteTag } from '@/types/note';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Page for creating a new note',
  openGraph: {
    title: 'Create note',
    description: 'Page for creating a new note',
    url: 'https://08-zustand-blush-one.vercel.app/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Note Hub Logo',
      },
    ],
  },
};

const DEFAULT_TAGS: NoteTag[] = [
  'Todo',
  'Personal',
  'Work',
  'Shopping',
  'Meeting',
];

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={DEFAULT_TAGS} />
      </div>
    </main>
  );
}
