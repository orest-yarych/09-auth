import { create } from 'zustand';
import { CreateNoteBody } from '../api';
import { persist } from 'zustand/middleware';

const initialDraft: CreateNoteBody = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: CreateNoteBody;
  setDraft: (note: CreateNoteBody) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
