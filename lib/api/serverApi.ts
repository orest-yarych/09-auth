import { cookies } from 'next/headers';
import { nextServer } from './api';
import { CheckSessionResponse, FetchNotesResponse } from './clientApi';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';
import { Note } from '@/types/note';

export async function checkSession(): Promise<
  AxiosResponse<CheckSessionResponse>
> {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNotes(query: string, page: number, tag?: string) {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNoteById(noteId: string) {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
