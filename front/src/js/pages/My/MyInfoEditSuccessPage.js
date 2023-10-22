import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";
import EditSuccess from "../../component/My/MemberEdit/EditSuccess";

const MyInfoEditSuccessPage = () => {
    return (

        <div id={styles.container}>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'회원정보수정'}/>
            <EditSuccess/>
        </div>

    );
}

export default MyInfoEditSuccessPage;