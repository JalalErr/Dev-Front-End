import { NavLink } from 'react-router-dom';
// Dans le .map() :
import styles from './Sidebar.module.css';

{projects.map(p => (
    <li key={p.id}>
        <NavLink
        to={`/projects/${p.id}`}
        className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ''}`
    }
    >
        <span className={styles.dot} style={{ background: p.color }} />
        {p.name}
    </NavLink>
    </li>
))}
