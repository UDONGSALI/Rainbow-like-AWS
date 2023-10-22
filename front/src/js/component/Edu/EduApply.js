import React, {useEffect, useState} from 'react';
import {SERVER_URL} from '../Common/constants';
import styles from '../../../css/component/Edu/EduApply.module.css';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';
import FileUpload from '../Common/FileUpload';
import {useNavigate} from "react-router-dom";

function EduApply(props) {
    const {eduNum, memId} = props;
    const navigate = useNavigate();
    const [eduData, setEduData] = useState(null);
    const [member, setMember] = useState(null);
    const [isFirstCheckboxChecked, setIsFirstCheckboxChecked] = useState(false);
    const [isSecondCheckboxChecked, setIsSecondCheckboxChecked] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileChange = (files) => {
        setSelectedFiles(files);
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
    });

    useEffect(() => {
        fetch(SERVER_URL + `api/edus/` + eduNum)
            .then(response => response.json())
            .then(data => {
                setEduData(data);
            })
            .catch(error => {
                alert('존재하지 않는 교육입니다!');
                navigate('/edu/list');
            });

        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                navigate('/login');
            });
    }, [eduNum, memId]);

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || '',
                email: member.email || '',
                tel: member.tel || '',
            });
        }
    }, [member]);

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function formatEduDate(eduStdt, eduEddt) {
        const startDate = new Date(eduStdt);
        const endDate = new Date(eduEddt);

        const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()} ${startDate.getHours()}:${String(
            startDate.getMinutes()
        ).padStart(2, '0')}`;
        const formattedEndDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()} ${endDate.getHours()}:${String(
            endDate.getMinutes()
        ).padStart(2, '0')}`;

        return eduStdt.split('T')[0] === eduEddt.split('T')[0]
            ? `${formattedStartDate} ~ ${endDate.getHours()}:${String(endDate.getMinutes()).padStart(2, '0')}`
            : `${formattedStartDate} ~ ${formattedEndDate}`;
    }

    function handleSubmit(event) {
        event.preventDefault();

        // 약관 동의 확인
        if (!isFirstCheckboxChecked) {
            alert('필수 약관에 동의하지 않으면 교육 신청이 불가능합니다.');
            return;
        }

        // 필요한 정보 누락 확인
        if (!eduData || !memId) {
            alert('필요한 정보가 누락되었습니다.');
            return;
        }

        let applyStatus;

        if (eduData.recuMethod === 'FIRST_COME') {
            applyStatus = 'APPROVE';
        } else if (eduData.recuMethod === 'ADMIN_APPROVAL') {
            applyStatus = 'WAIT';
        } else {
            alert('알 수 없는 승인 방식입니다.');
            return;
        }

        // 이미 신청했는지 확인
        fetch(SERVER_URL + 'eduHist/check/' + member.memNum + '/' + eduNum)
            .then(response => response.json())
            .then(data => {
                if (data) { // true인 경우 이미 신청한 상태
                    alert('이미 이 교육을 신청하셨습니다.');
                    throw new Error('Already applied'); // 오류를 발생시켜서 이후의 작업을 중지
                }
            })
            .then(() => {
                // 신청을 하지 않은 상태이므로 신청 처리 로직을 계속 진행
                const requestData = {
                    eduNum: parseInt(eduNum),
                    memNum: member.memNum,
                    applyDate: new Date().toISOString(),
                    portraitRights: isSecondCheckboxChecked,
                    status: applyStatus,
                };

                // FormData 생성 및 데이터 추가
                const formData = new FormData();
                formData.append("eduHistData", JSON.stringify(requestData));

                // 파일 추가
                if (selectedFiles && selectedFiles.length > 0) {
                    for (const file of selectedFiles) {
                        formData.append('file', file);
                    }
                    formData.append('tableName', "eduHist");
                    formData.append('number', 0);
                }

                // 서버에 신청 데이터 전송
                return fetch(SERVER_URL + 'eduHist', {
                    method: 'POST',
                    body: formData,
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error applying for the education');
                }
                return response.text();
            })
            .then(data => {
                window.alert(data);  // 성공 메시지 출력
                navigate(`/edu/list/detail/${eduNum}`);
            })
            .catch(error => {
                // 이미 신청했거나, 다른 오류 발생 시 이곳에서 처리
                if (error.message !== 'Already applied') {
                    console.error('Error:', error);
                    alert('신청 중 오류가 발생했습니다.');
                }
            });
    }


    function renderAgreementCheckbox(label, isChecked, onChange) {
        return (
            <div>
                <h5>
                    <strong>
                        {label}
                        <span style={{color: isChecked ? '#53468b' : '#808080', fontSize: '15pt'}}>
              {isChecked ? ' (필수)' : ' (선택)'}
            </span>
                    </strong>
                </h5>
                <div className={styles.termsDetail}>
                    <p>
                        {/* 약관 내용 */}
                    </p>
                </div>
                <div>
                    <Checkbox checked={isChecked} onChange={onChange}/>
                    <span>{label}에 동의합니다.</span>
                </div>
            </div>
        );
    }

    return (
            <div className={styles.eduApplyContainer}>
                {eduData ? (
                    <div>
                        <div className={styles.eduInfo}>
                            <h3><strong>{eduData.eduName}</strong></h3>
                            <p><strong>교육 일시 :</strong> {formatEduDate(eduData.eduStdt, eduData.eduEddt)}</p>
                            <p><strong>장소 :</strong> {eduData.eduAddr}</p>
                            <p><strong>대상 :</strong> {eduData.target}</p>
                            <p><strong>모집 인원 :</strong> {eduData.recuPerson}/{eduData.capacity}</p>
                            <p><strong>신청 기간 :</strong> {eduData.recuStdt} ~ {eduData.recuEddt}</p>
                        </div>
                        {isWithinApplicationPeriod(eduData.recuStdt, eduData.recuEddt) ? (
                            eduData.recuPerson >= eduData.capacity ? (
                                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                    <h2>정원이 초과 되었습니다!</h2>
                                </div>
                            ) : (
                                <div>
                                    <br/>
                                    <strong><h4>약관 동의</h4></strong>
                                    <hr/>
                                    <div>
                                        <h5>
                                            <strong>개인정보 수집 및 이용 약관
                                                <span style={{color: '#53468b', fontSize: '15pt'}}> (필수)</span>
                                            </strong>
                                        </h5>
                                        <div className={styles.termsDetail}>
                                            <p>
                                                <strong>1. 개인정보의 수집,이용 목적<br/></strong>
                                                - 세종여성플라자는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br/>
                                                - 교육신청, 공간대관 등 신청/운영 관리<br/><br/>

                                                <strong>2. 수입하는 개인정보의 항목<br/></strong>
                                                - 세종여성플라자는 법령의 규정과 정보주체의 동의에 의해서만 개인정보를 수집,보유 하고 있습니다.<br/>
                                                - 세종여성플라자가 법령의 규정에 근거하여 수집,보유하고 있는 개인정보 항목은 다음과 같습니다.<br/>
                                                - 구분: 필수 항목<br/>
                                                - 개인정보의 항목: 성명,생년월일,연락처(휴대폰),이메일주소<br/><br/>

                                                <strong>3. 개인정보의 보유 및 이용기간: 회원 탈퇴 시까지<br/></strong>
                                                - 세종여성플라자에서 처리하는 개인정보는 수집,이용 목적으로 명시한 범위 내에서 처리하며, 개인정보보호법 등 관련 법령에서 정한
                                                보유기관을
                                                준용하고
                                                있습니다.<br/>
                                                - 세종여성플라자는 원칙적으로 보유기간이 경과하였거나 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이
                                                파기합니다.<br/><br/>

                                                <strong>4. 정보 주체는 이용자로서 개인정보 수집, 이용을 동의하지 않을 수 있습니다. 단 동의를 거부할 경우 교육,
                                                    공간대관
                                                    신청이
                                                    제한됩니다.<br/><br/></strong>

                                                <strong>5. 기타 개인정보와 관련된 사항은 홈페이지에 공개된 개인정보처리방침을 준수합니다.</strong>
                                            </p>
                                        </div>
                                        <div className={styles.checkboxContainer}>
                                            <input
                                                type="checkbox"
                                                checked={isFirstCheckboxChecked}
                                                onChange={(e) => setIsFirstCheckboxChecked(e.target.checked)}
                                            />
                                            <span>개인정보 수집 및 이용에 동의합니다.</span>
                                        </div>
                                    </div>
                                    <br/>
                                    <div>
                                        <h5>
                                            <strong>초상권 사용 동의
                                                <span style={{color: '#808080', fontSize: '15pt'}}> (선택)</span>
                                            </strong>
                                        </h5>
                                        <div className={styles.checkboxContainer}>
                                            <input
                                                type="checkbox"
                                                checked={isSecondCheckboxChecked}
                                                onChange={(e) => setIsSecondCheckboxChecked(e.target.checked)}
                                            />
                                            <span>세종여성플라자의 교육 및 사업 진행시 사진 및 영상 촬영을 할 수 있으며, 본인이 촬영된 사진과 영상을 세종여성플라자의 홍보제작물에 사용하는 것에 동의합니다.</span>
                                        </div>
                                    </div>
                                    <br/>
                                    <strong><h4>신청자 정보</h4></strong>
                                    <hr/>
                                    <div className={styles.memInfo}>
                                        <Stack spacing={2}>
                                            <TextField
                                                label="이름"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                readOnly
                                            />
                                            <TextField
                                                label="이메일"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                readOnly
                                            />
                                            <TextField
                                                label="전화번호"
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.tel}
                                                readOnly
                                            />
                                            <FileUpload onFileChange={handleFileChange}
                                                        noFileMessage="신청서 파일이 있는 경우 다운로드 받아 신청내역을 작성 후 업로드 해주세요."
                                                        maxSize={3} maxCount={10}/>
                                        </Stack>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                        <button type="submit" onClick={handleSubmit}>교육 신청</button>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                                <h2>신청 기간이 아닙니다!</h2>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
    );
}

function isWithinApplicationPeriod(start, end) {
    const currentDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    return currentDate >= startDate && currentDate <= endDate;
}

export default EduApply;
