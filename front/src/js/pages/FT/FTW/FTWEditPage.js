import FTWEditor from "../../../component/FT/FTW/FTWEditor";
import {useParams} from "react-router-dom";
import Header from "../../../layout/Header/Header";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";
function FTWEditPage(props){
    const {ftwNum} = useParams();
    const {memId} = props;

    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <FTWEditor ttwNum={ftwNum} memId={memId} />
        </div>
    );
}

export default FTWEditPage;