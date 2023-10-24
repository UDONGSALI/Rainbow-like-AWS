import React from "react";

import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";

import Header from "../../layout/Header/Header";
import RentReviewWrite from "../../component/Rent/RentReview/RentReviewWrite";



function RentReviewWritePage() {
    return (
        <div id="rentBody">
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewWrite/>
        </div>
    )
}

export default RentReviewWritePage;