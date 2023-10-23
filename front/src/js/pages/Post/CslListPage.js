import React from 'react';
import CounselingList from "../../component/Post/CounselingList";
import '../../../css/font.css';
import {useParams} from "react-router-dom";
import {headerInfo, urlData} from "../../layout/Header/Data/CslHeader";
import Header from "../../layout/Header/Header";
import LaborTop from "../../component/Post/LaborTop";
import OnlineTop from "../../component/Post/OnlineTop";


function CslListPage() {
    const {boardNum} = useParams();
    const memNum = sessionStorage.getItem("memNum")

    let footerTitle = "";

    if (boardNum == "7") {
        footerTitle = "노무상담 게시판";
    } else if (boardNum == "8") {
        footerTitle = "온라인상담 게시판";
    }

    return (<div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            {/* 조건부 렌더링: boardNum이 7일 때만 LaborTop을 렌더링 */}
            {boardNum == "7" && <LaborTop/>}
            {boardNum == "8" && <OnlineTop/>}
            <CounselingList boardNum={boardNum} memNum={memNum}/>
        </div>);
}

export default CslListPage;
