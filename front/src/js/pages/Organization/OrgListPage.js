import React from 'react';
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import OrgList from "../../component/Organization/OrgList";

function OrgListPage() {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'유관 기관'}/>
            <OrgList/>
        </div>
    );
}

export default OrgListPage;
