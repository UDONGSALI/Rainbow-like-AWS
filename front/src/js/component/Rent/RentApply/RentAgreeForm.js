import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from '../../../../css/component/Rent/RentApplicationForm.module.css';


export default function RentAgreeForm() {
    const [checked1, setChecked1] = React.useState(true);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);



    const handleChange1 = () => {
        setChecked1((prev) => !prev); // toggle the checkbox
    };

    const handleChange2 = () => {
        setChecked2((prev) => !prev); // toggle the checkbox
    };

    const handleChange3 = () => {
        setChecked3((prev) => {
            setChecked1(prev ? false : true);
            setChecked2(prev ? false : true);
            return !prev; // toggle the checkbox
        });
    };


    return (
        <div id={styles.title}>
            <div className={styles.main1}>
                <h3>약관동의</h3>
                <hr className={styles.line}></hr>
                <div className={styles.personnalAgree}>
                    <p>개인정보 수집 및 이용 약관<span>(필수)</span></p>
                    <div className={styles.agreeBoxWrap}>
                        <div className={styles.agreeBox}
                             style={{
                                 overflowY: 'scroll',
                                 maxHeight: '250px',
                                 alignContent: 'center',
                             }}>

                            <ul>
                                <h3>
                                    1. 개인정보의 수집, 이용 목적
                                </h3>
                                <li> - 세종여성플라자는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</li>
                                <li> - 교육신청, 공간대관 등 신청.운영 관리</li>
                            </ul>
                            <ul>
                                <h3>
                                    2. 수입하는 개인정봉의 항목
                                </h3>
                                <li> - 세종여성플라자는 법령의 규정과 정보주체의 동의에 의해서만 수집, 보유하고 있습니다.</li>
                                <li> - 세종여성플라자가 법령의 규정에 근거하여 수집, 보유하고 있는 개인정보 항목은 다음과 같습니다.</li>
                                <li> - 구분 : 필수 항목</li>
                                <li> - 개인정보의 항목 : 성명, 생년월일, 연락처(휴대폰), 이메일주소</li>
                            </ul>
                            <ul>
                                <h3>
                                    3. 개인정보의 보유 및 이용기간 : 회원 탈퇴 시까지
                                </h3>
                                <li> - 세종여성플라자에서 처리하는 개인정보는 수집, 이용 목적으로 명시한 범위 내에서 처리하며, 개인정보보호법 등 관련 법령에서 정한 보유기관을 준용하고
                                    있습니다.
                                </li>
                                <li> - 세종여성플라자는 원칙적으로 보유기간이 경과하였거나 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.</li>
                            </ul>
                            <ul>
                                <h3>
                                    4. 정보의 주체는 이용자로서 개인정보 수집, 이용을 동의하지 않을 수 있습니다. 단, 동의를 거부할 경우, 교육, 공간대관 신청이 제한됩니다.
                                </h3>
                            </ul>
                            <ul>
                                <h3>
                                    5. 기타 개인정보와 관련된 사항은 홈페이지에 공개된 개인정보처리방침을 준수합니다.
                                </h3>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.check}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox className="checkBox"
                                                   color={"secondary"}
                                                   checked={checked1}
                                                   onChange={handleChange1}
                                                   inputProps={{'aria-label': 'controlled'}}
                                                   style={{
                                                       fontSize: '15px',
                                                       width: '15px',
                                                       height: '15px',
                                                       textAlign: 'center',
                                                       paddingTop : '8px',
                                                       paddingLeft : '20px'
                                                   }}/>}
                                label={
                                    <span style={{fontSize: '15px', paddingLeft : '5px' , fontWeight:'bold'}}>개인정보 수집 및 이용에 동의합니다.</span>}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className={styles.useFeeStandard}>
                    <p>이용료 면제 기준 안내<span>(선택)</span></p>
                    <div className={styles.useFeeBoxWrap}>
                        <div className={styles.useFeeBox}>
                            <ul>
                                <li> - 국가 또는 지방자치단체가 직접 이용하는 경우</li>
                                <li> - 국가나 지방자치단체가 설치하거나 지정한 여성가족 관련 기관·시설이 이용하는 경우</li>
                                <li> - 국가나 지방자치단체가 위탁 또는 보조하는 여성가족 관련 비영리법인 및 비영리단체가 이용하는 경우</li>
                                <li> - 그 밖에 성평등 문화 확산을 위하여 시장이 필요하다고 인정하는 경우</li>
                            </ul>

                        </div>
                    </div>
                    <div className={styles.check}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                                   color={"secondary"}
                                                   checked={checked2}
                                                   onChange={handleChange2}
                                                   inputProps={{'aria-label': 'controlled'}}
                                                   style={{
                                                       fontSize: '15px',
                                                       width: '15px',
                                                       height: '15px',
                                                       textAlign: 'center',
                                                       paddingTop : '8px',
                                                       paddingLeft : '20px'
                                                   }}/>}
                                label={
                                    <span style={{fontSize: '15px', paddingLeft : '5px' , fontWeight:'bold'}}>이용료 면제 기준안내에 동의합니다.</span>}
                            />
                        </FormGroup>
                    </div>
                </div>
                <hr/>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                                           color={"secondary"}
                                           checked={checked3}
                                           onChange={handleChange3}
                                           inputProps={{'aria-label': 'controlled'}}
                                           style={{
                                               fontSize: '15px',
                                               width: '15px',
                                               height: '15px',
                                               textAlign: 'center',
                                               paddingTop : '8px',
                                               paddingLeft : '20px'
                                           }}/>}
                        label={
                            <span style={{fontSize: '15px', paddingLeft : '5px', fontWeight:'bold'}}>위 약관 및 안내에 모두 동의합니다.</span>}
                    />
                </FormGroup>

            </div>


        </div>


    )

}
