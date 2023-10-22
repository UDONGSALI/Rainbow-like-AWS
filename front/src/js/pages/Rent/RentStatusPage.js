import React from "react";
import SpaceApplyForm from "../../component/Rent/RentApply/SpaceApplyForm";
import RentStatus from "../../component/Rent/RentApply/RentStatus";
import RentCalender from "../../component/Rent/RentApply/RentCalender";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import Footer from "../../layout/Footer/footer";

function RentStatusPage() {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 현황 및 신청'}/>
            <SpaceApplyForm/>
        </div>
    );
}

export default RentStatusPage;