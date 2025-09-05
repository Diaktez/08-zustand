import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || 'All';

  const descriptions: { [key: string]: string } = {
    All: 'Browse all your notes in NoteHUB.',
    Work: 'Keep track of your work-related notes and tasks.',
    Personal: 'Manage your personal thoughts and ideas.',
    Meeting: 'Review all your meeting notes and summaries.',
    Shopping: 'Check your shopping lists and related notes.',
    Todo: 'Stay on top of your todos and tasks.',
  };

  const title =
    filter === 'All' ? 'All Notes in NoteHUB' : `${filter} Notes in NoteHUB`;

  const description =
    descriptions[filter] || `Notes tagged with ${filter} in NoteHUB.`;

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
