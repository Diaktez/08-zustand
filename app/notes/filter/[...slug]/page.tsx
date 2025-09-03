import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';
import { fetchNotesCount } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || 'All';

  const count = await fetchNotesCount(
    filter === 'All' ? undefined : (filter as NoteTag)
  );

  const descriptions: { [key: string]: string } = {
    All: 'Browse all your notes (${count}) in NoteHUB.',
    Work: 'Keep track of your work-related notes (${count}) in NoteHUB.',
    Personal: 'Manage your personal thoughts and ideas (${count}).',
    Meeting: 'Review all your meeting notes and summaries (${count}).',
    Shopping: 'Check your shopping lists and related notes (${count}).',
    Todo: 'Stay on top of your todos and tasks (${count}).',
  };

  const title =
    filter === 'All'
      ? `All Notes (${count}) | NoteHUB`
      : `${filter} Notes (${count}) | NoteHUB`;

  const description =
    descriptions[filter] ||
    `Notes tagged with ${filter} (${count}) in NoteHUB.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-blush-one.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
      type: 'website',
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : (slug[0] as NoteTag);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
