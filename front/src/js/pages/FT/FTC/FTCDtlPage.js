import FTCDtl from "../../../component/FT/FTC/FTCDtl";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import {useParams} from 'react-router-dom';
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";


function FTCDtlPage(props) {
    const {memId} = props;
    const {id} = useParams();


    return (
        <>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <div className={styles.postDetailPage}>
                <FTCDtl memId={memId}/>
            </div>
        </>
    );
}

export default FTCDtlPage;