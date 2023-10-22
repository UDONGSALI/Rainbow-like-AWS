import React from 'react';
import EduHistList from "../../component/Edu/EduHistList";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";

function EduHistListPage(props) {
    const { memId, type } = props;

    let requiredModule;

    if (type === 'admin') {
        requiredModule = require('../../layout/Header/Data/AdminHeader');
    } else if (type === 'edu') {
        requiredModule = require('../../layout/Header/Data/EduHeader');
    } else {
        requiredModule = require('../../layout/Header/Data/MyHeader');
    }

    const { headerInfo, urlData } = requiredModule;

    const footerTitle = type === 'admin' ? '교육 신청 관리': '교육 신청내역'

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <EduHistList memId={memId}/>
        </div>
    );
}

export default EduHistListPage;