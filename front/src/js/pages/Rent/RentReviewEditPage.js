import React from "react";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentReviewEdit from "../../component/Rent/RentReview/RentReviewEdit";
import Header from "../../layout/Header/Header";



function RentReviewEditPage() {
    return (
        <div id="rentBody">
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewEdit/>
        </div>
    )
}

export default RentReviewEditPage;