import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Note | NoteHub',
  description: 'Quickly create a new note in NoteHub',
  openGraph: {
    title: 'Create New Note | NoteHub',
    description: 'Quickly create a new note in NoteHub',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create New Note | NoteHub',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
