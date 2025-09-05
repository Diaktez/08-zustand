'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  tags: NoteTag[];
}

interface NoteFormValuesProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NoteForm({ tags }: NoteFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
    onError: error => {
      console.error(error);
    },
  });

  async function handleSubmit(formData: FormData) {
    const values: NoteFormValuesProps = {
      title: formData.get('title') as string,
      content: (formData.get('content') as string) || '',
      tag: formData.get('tag') as NoteTag,
    };
    mutation.mutate(values);
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          minLength={3}
          maxLength={50}
          className={css.input}
          defaultValue={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          required
          className={css.textarea}
          defaultValue={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={e => setDraft({ tag: e.target.value as NoteTag })}
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {mutation.isError && (
        <div className={css.error}>{(mutation.error as Error).message}</div>
      )}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
