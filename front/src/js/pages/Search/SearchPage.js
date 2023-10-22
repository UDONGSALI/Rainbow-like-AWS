import React, {memo, useState} from 'react';
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/SearchHeader";
import SearchContainer from "../../component/Search/SearchContainer";

function SearchPage() {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'통합 검색'} />
            <SearchContainer/>
        </div>
    );
}

export default memo(SearchPage);