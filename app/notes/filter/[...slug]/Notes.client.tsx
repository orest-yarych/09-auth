'use client';

import SearchBox from '@/components/SearchBox/SearchBox';
import css from './Notes.module.css';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';

interface NotesClientProps {
  tag: string | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, currentPage, tag],
    queryFn: () => fetchNotes(query, currentPage, tag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];

  const setQueryDebounce = useDebouncedCallback((query: string) => {
    setQuery(query);
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} setQuery={setQueryDebounce} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {notes && notes.length > 0 && <NoteList notes={notes} />}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
