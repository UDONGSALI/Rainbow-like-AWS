import React, { useState, useEffect } from 'react';
import ImgPostList from "../../component/Post/ImgPostList";
import Footer from "../../layout/Footer/footer";
import {useParams} from "react-router-dom";
import {headerInfo, urlData} from "../../layout/Header/Data/InfoShareHeader";
import Header from "../../layout/Header/Header";


function SjNewsPage() {
    const { boardNum } = useParams();

    let footerTitle = "";

    if (boardNum == "3") {
        footerTitle = "세종시 단체 및 소식";
    } else if (boardNum == "4") {
        footerTitle = "여플소식";
    } else if (boardNum == "5") {
        footerTitle = "뉴스레터";
    }


    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <ImgPostList boardNum={boardNum} />
        </div>
    );
}

export default SjNewsPage;