import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../../css/layout/Header/UrlItem.module.css';

function UrlItem({ name, link, index }) {
    const animationDelay = `${0.15* index}s`;  // 각 아이템에 대한 애니메이션 지연 시간

    return (
        <NavLink
            to={link}
            style={{ animationDelay }}
            className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
            }
        >
            <strong>{name}</strong>
        </NavLink>
    );
}

export default UrlItem;