import React from "react";

import Footer from "../../layout/Footer/footer";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentReviewPost from "../../component/Rent/RentReview/RentReviewPost";
import Header from "../../layout/Header/Header";


function RentReviewListPage() {
    return (
        <div id="rentBody">
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewPost/>
        </div>
    )
}

export default RentReviewListPage;