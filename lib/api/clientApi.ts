import { Note, NoteTag } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteBody {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface UserData {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  success: boolean;
}

export async function fetchNotes(query: string, page: number, tag?: string) {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: query,
      page,
      perPage: 12,
      tag,
    },
  });
  return data;
}

export async function createNote(body: CreateNoteBody) {
  const { data } = await nextServer.post<Note>('/notes', body);
  return data;
}

export async function deleteNote(noteId: string) {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function fetchNoteById(noteId: string) {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
}

export async function register(registerData: UserData): Promise<User> {
  const { data } = await nextServer.post<User>('/auth/register', registerData);
  return data;
}

export async function login(loginData: UserData): Promise<User> {
  const { data } = await nextServer.post<User>('/auth/login', loginData);
  return data;
}

export async function checkSession(): Promise<boolean> {
  const { data } = await nextServer.get<CheckSessionResponse>('/auth/session');
  return data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
}

export async function updateMe(username: string): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', { username });
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}
