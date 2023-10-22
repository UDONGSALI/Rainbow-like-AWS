import ClubDetail from "../../component/Club/ClubDetail";
import Comment from "../../component/Comment/Comment";
import styles from '../../../css/pages/Club/ClubDtlPage.module.css';
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/ClubHeader";
import React from "react";


function ClubDtlPage(props) {
    const {memId} = props;

    return (
        <>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <div className={styles.postDetailPage}>

                <ClubDetail memId={memId}/>
                <div className="comment">
                    <Comment memId={memId}/>
                </div>
            </div>
        </>

    );
}

export default ClubDtlPage;