import React, { useState } from 'react';
import SignUp from "../../component/Login/SignUp/SignUp";
import SignAgreement from "../../component/Login/SignUp/SignAgreement";
import Header from "../../layout/Header/Header";
import { headerInfo, urlData } from "../../layout/Header/Data/LoginHeader";
import styles from '../../../css/pages/Login/SignUpPage.module.css';

function SignUpPage() {
    const [isAgreed, setIsAgreed] = useState({
        first: false,
        second: false
    });
    const [showSignUp, setShowSignUp] = useState(false);

    const handleAgreement = (first, second) => {
        setIsAgreed({ first, second });
    };

    const onAnimationEnd = () => {
        setShowSignUp(true);
    };

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'회원가입'} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%',
                margin: 'auto',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                borderRadius: '5px'
            }}>

                {!showSignUp ? (
                    <div className={isAgreed.first && isAgreed.second ? styles.slideLeftOut : ''} onAnimationEnd={isAgreed.first && isAgreed.second ? onAnimationEnd : undefined}>
                        <SignAgreement onAgreementChange={handleAgreement} />
                    </div>
                ) : (
                    <div className={styles.slideRightIn}>
                        <SignUp />
                    </div>
                )}

            </div>
        </div>
    );
}

export default SignUpPage;
