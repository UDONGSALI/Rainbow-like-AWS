import QnA from "../../component/QnA/QnA";
import {headerInfo, urlData} from "../../layout/Header/Data/InfoShareHeader";
import Header from "../../layout/Header/Header";
import React from "react";


function QnAPage() {

    return(
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'자주묻는 질문'}/>
            <QnA />
        </div>
    )
}
export default QnAPage