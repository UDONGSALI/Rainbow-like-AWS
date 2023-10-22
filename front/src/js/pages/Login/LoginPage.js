import React, {memo} from 'react';
import Login from "../../component/Login/Login/Login";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/LoginHeader";

const LoginPage = ({memId, jti}) => {

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'Login'}/>
            <Login memId={memId} jti={jti}/>
        </div>
    );
};

export default memo(LoginPage);