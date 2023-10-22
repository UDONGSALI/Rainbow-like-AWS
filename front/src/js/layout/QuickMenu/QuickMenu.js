import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../../../css/layout/QuickMenu/QuickMenu.module.css';

function QuickMenu({ useScrollTop, useChat, move, modal }) {

    const navigate = useNavigate();

    const onScrollTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // smooth scrolling
        });
    }, []);

    const onClickChat = useCallback(() => {
        const width = 400;
        const height = 700;
        const top = (window.innerHeight / 2) - (height / 2) + window.screenY;
        const left = (window.innerWidth / 2) - (width / 2) + window.screenX;
        window.open(`/chat`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    }, []);

    const onMove = useCallback(() => {
        if (move && move.link) {
            navigate(move.link);  // navigate to the provided link
        }
    }, [move, navigate]);

    const onOpenModal = useCallback(() => {
        if (modal && modal.method) {
            modal.method();
        }
    }, [modal]);

    const renderOption = useCallback((condition, callback, text, extraClass = "", style = {}) => (
        condition && (
            <div className={`${styles.option} ${extraClass}`}>
                <span onClick={callback} style={style}>{text}</span>
            </div>
        )
    ), []);

    return (
        <div className={styles.quickMenu}>
            {renderOption(useScrollTop, onScrollTop, "▲", "", { fontSize: '30px', marginBottom: '5px' })}
            {renderOption(useChat, onClickChat, "챗봇", styles.chatBot)}
            {renderOption(move, onMove, move?.text)}
            {renderOption(modal, onOpenModal, modal?.text)}
        </div>
    );
}

export default QuickMenu;