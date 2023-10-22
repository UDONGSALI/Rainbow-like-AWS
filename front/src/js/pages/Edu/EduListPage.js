import React from 'react';
import EduList from "../../component/Edu/EduList";
import Header from "../../layout/Header/Header";
import QuickMenu from "../../layout/QuickMenu/QuickMenu";

function EduListPage({type}) {
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인

    const {headerInfo, urlData} = type === 'admin' ?
        require('../../layout/Header/Data/AdminHeader') :
        require('../../layout/Header/Data/EduHeader');

    const footerTitle = type === 'admin' ? '교육 관리': '교육 신청';

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <EduList/>
            {isAdmin && (
                <QuickMenu move={{ link: '/admin/edu/add', text: '교육 추가' }}/>
            )}
        </div>
    );
}

export default EduListPage;
