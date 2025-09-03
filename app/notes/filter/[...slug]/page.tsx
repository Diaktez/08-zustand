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
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const filter = slug?.[0] || 'All';

  return {
    title: `Notes filtered by "${filter}" | NoteHUB`,
    description: `Browse your notes filtered by tag "${filter}" in NoteHUB.`,
    openGraph: {
      title: `Notes filtered by "${filter}" | NoteHUB`,
      description: `Easily explore notes that are tagged with "${filter}" in NoteHUB.`,
      url: `https://08-zustand-blush-one.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 600,
          alt: `Notes filtered by ${filter}`,
        },
      ],
      type: 'website',
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = params;
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
