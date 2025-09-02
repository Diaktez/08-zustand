// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import css from './SidebarNotes.module.css';

// const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

// export default function SidebarPage() {
//   const pathname = usePathname();
//   const activeTag = pathname.split('/').pop() || 'All';

//   return (
//     <ul className={css.menuList}>
//       {TAGS.map(tag => {
//         const href = `/notes/filter/${tag}`;
//         const isActive = activeTag === tag;

//         return (
//           <li key={tag} className={css.menuItem}>
//             <Link
//               href={href}
//               className={`${css.menuLink} ${isActive ? css.active : ''}`}
//             >
//               {tag}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function SidebarPage() {
  return (
    <ul className={css.menuList}>
      {TAGS.map(tag => {
        const href = `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
