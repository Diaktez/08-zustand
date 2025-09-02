import { deleteNote } from '@/lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import EditNoteForm from '../EditNoteForm/EditNoteForm';
import { useState } from 'react';
import Modal from '../Modal/Modal';
interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.error('Error deleting note:', error);
    },
  });

  if (!notes.length) return null;

  return (
    <>
      <ul className={css.list}>
        {notes.map(note => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View Details</Link>
              <div className={css.actions}>
                <button
                  className={`${css.button} ${css.edit}`}
                  onClick={() => setEditingNote(note)}
                >
                  Edit
                </button>
                <button
                  className={`${css.button} ${css.delete} `}
                  onClick={() => deleteMutation.mutate(note.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {editingNote && (
        <Modal onClose={() => setEditingNote(null)}>
          <EditNoteForm
            note={editingNote}
            onCancel={() => setEditingNote(null)}
            onSuccess={() => setEditingNote(null)}
          />
        </Modal>
      )}
    </>
  );
}
