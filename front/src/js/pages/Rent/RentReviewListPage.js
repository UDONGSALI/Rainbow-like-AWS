import React from "react";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentReviewList from "../../component/Rent/RentReview/RentReviewList";
import Header from "../../layout/Header/Header";


function RentReviewPostPage() {
    return (
        <div id="rentBody">
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewList/>
        </div>
    )
}

export default RentReviewPostPage;