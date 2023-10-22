import FTWForm from "../../../component/FT/FTW/FTWForm";
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";

function FTWFormPage(props){
    const {memId} = props;

    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={"인재 등록 신청"}/>
            <FTWForm memId={memId}/>
        </div>
    );
}

export default FTWFormPage;