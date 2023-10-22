import React from 'react';
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import PayList from "../../component/Pay/PayList";


function PayListPage() {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'결제 내역'}/>
            <PayList/>
        </div>
    );
}

export default PayListPage;
