import FTWDtl from "../../../component/FT/FTW/FTWDtl";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";
import {useParams} from "react-router-dom";

function FTWDtlPage(props) {
    const { memIdFromParams } = useParams();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const memNum = isAdmin ? props.memId : sessionStorage.getItem("memNum");

    return (
        <>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <div className={styles.postDetailPage}>
                <FTWDtl memNum={memNum}/>
            </div>
        </>
    );
}

export default FTWDtlPage;