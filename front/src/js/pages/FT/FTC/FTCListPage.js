import FTCList from "../../../component/FT/FTC/FTCList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/AdminHeader";
import React from "react";

function FTCListPage(){
    return(
        <>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'매칭 리스트'}/>
            <div className={styles.postDetailPage}>
            <FTCList />
        </div>
        </>
    );
}

export default FTCListPage;