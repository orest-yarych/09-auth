import NotePreviewClient from './NotePreview.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NotePreviewProps) {
  const { id } = await params;
  const { title, content } = await fetchNoteById(id);
  return {
    title,
    description: content,
    openGraph: {
      title,
      description: content,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg ',
          width: 1200,
          height: 630,
          alt: `Note: ${title}`,
        },
      ],
    },
  };
}

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['SingleNote', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
