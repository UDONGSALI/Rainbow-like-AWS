import React from 'react';
import EduDetail from "../../component/Edu/EduDetail";
import {useParams} from "react-router-dom";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/EduHeader"; // 오타도 수정했습니다. EduDtail -> EduDetail

function EduDetailPage() {
    const {eduNum} = useParams();

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 신청'}/>
            <EduDetail eduNum={eduNum}/>
        </div>
    );
}

export default EduDetailPage;
