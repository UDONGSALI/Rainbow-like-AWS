import FTCForm from "../../../component/FT/FTC/FTCForm";
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";

function FTCFormPage(props){
    const {memId} = props;

    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={"인재 매칭 신청"}/>
            <FTCForm memId={memId}/>
        </div>
    );
}

export default FTCFormPage;