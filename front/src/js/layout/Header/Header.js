import React from 'react';
import TitleComponent from './TitleComponent';
import UrlItem from './UrlItem';
import styles from '../../../css/layout/Header/UrlComponent.module.css'
import SubTitleComponent from "./subTitleComponent";

function Header({headerTitle, urlItems, footerTitle}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom:'15px'}}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <TitleComponent title={headerTitle}/>
                </div>
                <div className={styles.list}>
                    {urlItems.map((item, index) => (
                        <UrlItem key={index} index={index} name={item.name} link={item.link}/>
                    ))}
                </div>
            </div>
            <div>
                <SubTitleComponent title={footerTitle}/>
            </div>
        </div>
    );
}

export default Header;