import FTMain from "../../component/FT/FTMain";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import React from "react";


function FTMainPage({type}){

    let requiredModule;

    if (type === 'admin') {
        requiredModule = require('../../layout/Header/Data/AdminHeader');
    } else {
        requiredModule = require('../../layout/Header/Data/FtHeader');
    }

    const { headerInfo, urlData } = requiredModule;

    const footerTitle = type === 'admin' ? '여성인재풀': '메인'


    return(
        <div>
        <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
        <FTMain />
        </div>
    )
}

export default FTMainPage;