import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";
import MyClubList from "../../component/My/Club/MyClubList";

const MyClubPage = () => {
    return (

        <div id={styles.container}>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'소모임 신청내역'}/>
            <MyClubList/>
        </div>

    );
}

export default MyClubPage;