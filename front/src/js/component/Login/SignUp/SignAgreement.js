import React, {useEffect, useState} from 'react';
import styles from '../../../../css/component/Login/SignUp.module.css';


function Agreement({onAgreementChange}) {
    const [isCheckedFirst, setIsCheckedFirst] = useState(false);
    const [isCheckedSecond, setIsCheckedSecond] = useState(false);

    useEffect(() => {
        onAgreementChange(isCheckedFirst, isCheckedSecond);
    }, [isCheckedFirst, isCheckedSecond]);

    const handleCheckFirst = () => {
        setIsCheckedFirst(!isCheckedFirst);
    };

    const handleCheckSecond = () => {
        setIsCheckedSecond(!isCheckedSecond);
    };

    return (
        <div>
        <div className={styles.signFormContainer} >
            <h4>개인정보 수집 및 이용 동의(<strong>필수</strong>)</h4>
            <div className={styles.signAgreement}>
                <p>
                    제 1 조 (목적)<br/>
                    이 약관은 세종여성플라자(이하"여성플라자")이 제공하는 홈페이지의(이하 "서비스"라 함)의 이용에 관한 조건, 절차 및 기타 필요한 사항을 규정하는 것을 목적으로 합니다.
                </p>
                <hr/>
                <p>
                    제 2 조 (약관의 효력과 변경)<br/>
                    - 이 약관은 서비스 메뉴를 통해 공시함으로써 효력을 발생합니다.<br/>
                    - 여성플라자는 합리적 사유가 발생한 경우에는 이 약관을 변경할 수 있으며, 약관을 변경한 경우에는 지체없이 "공지사항"을 통해 공시합니다.<br/>
                    - 이용자는 변경된 약관사항에 동의하지 않으면, 언제나 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다. 약관의 효력발생일 이후의 계속적인 서비스 이용은 약관의 변경
                    사항에<br/>
                    동의한 것으로 간주됩니다.
                </p>
                <div className={styles.checkboxContainer}>
                    <input type="checkbox" id="agreeFirst" checked={isCheckedFirst} onChange={handleCheckFirst}/>
                    <label htmlFor="agree">약관에 동의합니다.</label>
                </div>
            </div>
            <br/>
            <h4>개인정보 제3자 제공 동의(<strong>필수</strong>)</h4>
            <div className={styles.signAgreement}>
                <p>
                    1. 개인정보의 수집,이용 목적<br/>
                    - 세종여성플라자는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br/>
                    - 교육신청, 공간대관 등 신청/운영 관리
                </p>
                <hr/>
                <p>
                    2. 수입하는 개인정보의 항목<br/>
                    - 세종여성플라자는 법령의 규정과 정보주체의 동의에 의해서만 개인정보를 수집,보유 하고 있습니다.<br/>
                    - 세종여성플라자가 법령의 규정에 근거하여 수집,보유하고 있는 개인정보 항목은 다음과 같습니다.<br/>
                    - 구분: 필수 항목 -개인정보의 항목: 성명,성별,생년월일,아이디,연락처(휴대폰),이메일,소,보호자 이름,보호자 성명, 보호자 생년월일, 보호자 국적<br/>
                </p>
                <div className={styles.checkboxContainer}>
                    <input type="checkbox" id="agreeSecond" checked={isCheckedSecond} onChange={handleCheckSecond}/>
                    <label htmlFor="agree">약관에 동의합니다.</label>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Agreement;