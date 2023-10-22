import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React, {useEffect, useState} from "react";
import MyCounselList from "../../component/My/Counsel/MyCounselList";

const MyCouselPage = () => {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    return (
        <div id={styles.container}>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'상담 내역'}/>
            {
                memNum === null ?
                    <div className={styles.loading}>로딩중...</div> :
                    <MyCounselList memNum={memNum}/>
            }
        </div>
    );
}

export default MyCouselPage;