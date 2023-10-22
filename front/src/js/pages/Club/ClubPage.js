import ClubMain from "../../component/Club/ClubMain";
import ClubList from "../../component/Club/ClubList";
import styles from '../../../css/pages/Club/ClubPage.module.css';
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/ClubHeader";
import React from "react";

function ClubPage (props){
    const {memId} = props;

    return(
        <>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>

    <div className={styles.ClubMainPage}>
        <ClubMain />
        <div className={styles.List}>
        <ClubList memId = {memId} />
        </div>
    </div>
        </>
    );

}

export default ClubPage;