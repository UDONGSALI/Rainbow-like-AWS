import FTWList from "../../../component/FT/FTW/FTWList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/AdminHeader";
import React from "react";

function FTWListPage(props){
    const {memId} = props;

    return(
        <>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'여성 인재 리스트'}/>
            <div className={styles.postDetailPage}>
            <FTWList memId={memId} />
        </div>
        </>
    );
}

export default FTWListPage;