import FTCEditor from "../../../component/FT/FTC/FTCEditor";
import {useParams} from "react-router-dom";
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";
function FTCEditPage(props){
    const {ftcNum} = useParams();
    const {memId} = props;

    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <FTCEditor ttcNum={ftcNum} memId={memId} />
        </div>
    );
}

export default FTCEditPage;