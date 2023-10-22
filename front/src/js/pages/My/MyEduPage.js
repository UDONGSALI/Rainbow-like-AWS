import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from 'react';
import MyEduList from "../../component/My/Edu/MyEduList";

const MyEduPage = (props) => {
    const { memId, type } = props;
    const footerTitle = type === 'admin' ? '교육 신청 관리': '교육 신청 내역'

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <MyEduList/>
        </div>
    );
}

export default MyEduPage;
