'use client';
import css from './TagsMenu.module.css';
import { useState } from 'react';
import Link from 'next/link';
import { NoteTag } from '@/types/note';

// list of tegs for filter
const tags: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {/* "All Notes" */}
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={css.menuLink}
              onClick={toggleMenu}
            >
              All Notes
            </Link>
          </li>

          {/* Other Notes */}
          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={toggleMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
