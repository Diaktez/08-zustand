import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const url = `https://08-zustand-eight-phi.vercel.app/notes/${id}`;

  const description = note.content.slice(0, 100);

  return {
    title: `Note: ${note.title}`,
    description,
    openGraph: {
      title: `Note: ${note.title}`,
      description,
      siteName: 'NoteHub',
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 600,
          alt: `Note: ${note.title}`,
        },
      ],
      type: 'website',
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
