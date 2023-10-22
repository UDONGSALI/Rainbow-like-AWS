import ClubEditor from "../../component/Club/ClubEditor";
import {useParams} from "react-router-dom";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/ClubHeader";
import React from "react";

function ClubEditorPage(){

    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>

            <ClubEditor />
        </div>


);
}

export default ClubEditorPage;