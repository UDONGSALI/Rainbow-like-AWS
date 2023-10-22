import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import MyRentHistList from "../../component/My/Rent/MyRentHistList";
import React from "react";

const MyRentPage = () => {
    return (

        <div id={styles.container}>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'공간대관 신청내역'}/>
            <MyRentHistList/>

        </div>

    );
}

export default MyRentPage;