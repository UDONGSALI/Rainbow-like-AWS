import React, {useEffect, useState} from 'react';
import {useHistory, useLocation, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Rent/LoginMember.module.css"


const LoginMember = () => {
    const [member, setMember] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [memId, setMemId] = useState(sessionStorage.getItem('memId'));
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then((response) => response.json())
            .then((data) => {
                setMember(data);
                // 신청자 정보를 불러온 후, 휴대폰번호와 이메일주소를 state에 설정
                setPhone(data.tel || '');
                setEmail(data.email || '');
            })
            .catch((error) => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, [memId]);

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setSelectedFiles([newFile]);
        }
    };

    const handleFileCancel = () => {
        setFile(null);
        setSelectedFiles([]);
    };

    const handleFileUpload = () => {
        // 파일 업로드 로직 추가
        if (selectedFiles.length > 1) {
            alert('파일은 1개만 업로드할 수 있습니다.');
        } else if (selectedFiles.length === 1) {
            const uploadedFile = selectedFiles[0];
            // 여기에 파일 업로드를 위한 로직을 추가해야 합니다.
            console.log('Uploaded file:', uploadedFile);
        } else {
            alert('파일을 선택해주세요.');
        }
    };

    return (
        <div id={styles.title}>
            {member !== null ? (  // member가 null이 아닌 경우에만 렌더링
                <div className={styles.memApplyInfo}>
                    <h3>신청자 정보</h3>
                    <hr className={styles.mainHr}/>
                    <div className={styles.memInfo}>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span>
                                <b className={styles.name}>신청자명</b></div>
                            <input className={styles.memBasicInput} value={member.name} readOnly/>

                        </div>
                        <hr/>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span>
                                <b>휴대폰번호</b></div>
                            <input
                                className={styles.memBasicInput}
                                value={phone||''||member.tel}
                                onChange={handlePhoneChange}
                            />

                        </div>
                        <hr/>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span>
                                <b>이메일주소</b></div>
                            <input
                                className={styles.memBasicInput}
                                value={email ||''||member.email }
                                onChange={handleEmailChange}
                            />

                        </div>
                        <hr/>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <b>단체명</b></div>
                            <input className={styles.memBasicInput}/>

                        </div>
                        <hr/>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <b> 대표자</b></div>
                            <input className={styles.memBasicInput} />

                        </div>
                        <hr/>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <b>사업자등록증</b>
                            </div>
                            <div className={styles.buttonWrap}>
                                <button
                                    style={{
                                        width: '80px',
                                        height: '40px',
                                        backgroundColor: '#3d0c69',
                                        color: '#ffffff',
                                        borderRadius: '5px',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        marginRight: '10%',
                                        position: 'relative',
                                        border: '1px solid #ffffff',
                                    }}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    파일첨부
                                </button>
                                {!file && (
                                    <p>이용료 면제 기준 해당 시 사업자 등록증 첨부해주세요.</p>
                                )}
                                <div className={styles.buttonInfoWrap}>
                                    {file && (
                                        <>
                                            <div className={styles.buttonInfo}>
                                                <p>선택된 파일: {file.name}</p>
                                                <button className={styles.ceoFile}
                                                    style={{
                                                        width: '65px',
                                                        height: '40px',
                                                        backgroundColor: '#c694fa',
                                                        color: '#ffffff',
                                                        borderRadius: '5px',
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        marginRight: '10%',
                                                        position: 'relative',
                                                        border: '1px solid #ffffff',
                                                    }}
                                                    onClick={handleFileCancel}>취소
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <hr />
                    </div>
                </div>
            ) : (
                <p>멤버 정보를 불러오는 중이거나 로그인이 필요합니다.</p>
            )}
        </div>
    );
}

export default LoginMember;