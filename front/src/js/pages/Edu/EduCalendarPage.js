import React from 'react';
import EduCalendar from "../../component/Edu/EduCalendar";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/EduHeader";

function EduCalendarPage() {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 일정'}/>
            <EduCalendar/>
        </div>
    );
}

export default EduCalendarPage;
