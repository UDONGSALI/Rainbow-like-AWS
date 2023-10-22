import ClubForm from "../../component/Club/ClubForm";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/ClubHeader";
import React from "react";

function ClubFormPage(props){
    const {memId} = props;


    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={"소모임 신청"}/>

            <ClubForm memId = {memId} />
        </div>


);
}

export default ClubFormPage;