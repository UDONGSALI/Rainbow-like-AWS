import React from 'react';
import styles from "../../../css/layout/Header/UrlHeader.module.css";

function TitleComponent({title}) {
    return (
        <div className={styles.urlHeader}>
            <h1><strong>{title}</strong></h1>
        </div>
    );
}

export default TitleComponent;