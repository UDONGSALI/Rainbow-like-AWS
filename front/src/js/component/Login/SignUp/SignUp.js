import React, {useState} from 'react';
import styles from '../../../../css/component/Login/SignUp.module.css';
import FileUpload from "../../Common/FileUpload";
import axios from "axios";
import {SERVER_URL} from "../../Common/constants";
import {useDaumPostcodePopup} from "react-daum-postcode";

function SignUp() {
    // State
    const [formData, setFormData] = useState({
        memId: '',
        pwd: '',
        passwordConfirm: "",
        type: 'USER',
        name: '',
        gender: '',
        bir: '',
        tel: '',
        email: '',
        addr: '',
        addrDtl: '',
        addrPost: '',
        jdate: new Date().toISOString().split('T')[0],
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [isDateInputFocused, setDateInputFocus] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [isSmsBtnActive, setSmsBtnActive] = useState(false);
    const [userSmsInput, setUserSmsInput] = useState('');
    const [isSmsInputActive, setSmsInputActive] = useState(false);
    const [smsError, setSmsError] = useState('인증이 되지 않았습니다.');
    const [isSmsVerified, setIsSmsVerified] = useState(false);
    const open = useDaumPostcodePopup();

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setFormData({
            ...formData,
            addr: fullAddress,
            addrPost: data.zonecode
        });
    };

    const handleClick = () => {
        open({onComplete: handleComplete});
    };


    const validate = (name, value) => {
        let error = null;

        switch (name) {
            case 'memId':
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    error = '아이디는 영어, 숫자만 사용 가능합니다.';
                }
                break;
            case 'pwd':
                if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,15}$/.test(value)) {
                    error = '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요..';
                }
                break;
            case 'name':
                if (!/^[a-zA-Z가-힣]+$/.test(value)) {
                    error = '이름은 한글, 영어만 사용 가능합니다.';
                }
                break;
            case 'bir':
                const birthYear = new Date(value).getFullYear();
                if (new Date(value) > new Date() || birthYear < 1900) {
                    error = '유효하지 않은 날짜입니다.';
                }
                break;
            case 'tel':
                if (!/^\d{11,12}$/.test(value)) {
                    error = '전화번호는 11~12자리 숫자만 가능합니다.';
                }
                break;
            case 'email':
                if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
                    error = '유효하지 않은 이메일 형식입니다.';
                }
                break;
            default:
                break;
        }

        return error;
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleBlur = async (e) => {
        const {name, value} = e.target;
        // SMS 인증 코드 확인
        if (name === 'smsInput') {
            try {
                const response = await axios.post(`${SERVER_URL}sms/verify/${formData.tel}/${value}`);
                if (response.status === 200) {
                    setIsSmsVerified(true); // 인증 성공
                    setSmsError(null); // 에러 메시지를 null로 설정
                } else {
                    setIsSmsVerified(false); // 인증 실패
                    setSmsError('인증 번호가 일치하지 않습니다.'); // 에러 메시지 설정
                }
            } catch (error) {
                setIsSmsVerified(false); // 인증 실패
                setSmsError('인증 실패. 다시 시도해주세요.'); // 에러 메시지 설정
            }
            return; // 이 부분이 실행되면 아래의 코드는 실행되지 않습니다.
        }
        const error = validate(name, value);
        setErrors(prevErrors => ({...prevErrors, [name]: error})); // Update errors state.

        if (error) return;

        const checkDuplicate = async (type, errorMsg) => {
            try {
                const response = await fetch(`${SERVER_URL}members/check/${type}/${value}`);
                const isDuplicate = await response.json();
                if (isDuplicate) {
                    setErrors(prevErrors => ({...prevErrors, [name]: errorMsg}));
                } else {
                    setErrors(prevErrors => ({...prevErrors, [name]: null}));

                    // 만약 전화번호가 유효하고 중복이 아니라면, SMS 버튼을 활성화
                    if (name === 'tel') {
                        setSmsBtnActive(true);
                    }
                }
            } catch (error) {
                console.error(`${name} 중복 체크 중 오류:`, error);
            }
        }

        switch (name) {
            case 'memId':
                checkDuplicate("memId", '이미 사용중인 아이디입니다.');
                break;
            case 'email':
                checkDuplicate("email", '이미 사용중인 이메일입니다.');
                break;
            case 'tel':
                checkDuplicate("tel", '이미 사용중인 전화번호입니다.');
                break;
            default:
                break;
        }
    };

    const handleSmsSend = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}sms/tel-check/${formData.tel}`);
            // 서버로부터 받은 response를 사용해서 클라이언트에 알림을 줄 수 있습니다.
            setSmsInputActive(true);  // SMS 입력이 활성화됨
        } catch (error) {
            console.error("SMS 발송 에러:", error);
        }
    };

    const handleSmsInputChange = (e) => {
        setUserSmsInput(e.target.value); // 사용자가 입력한 값을 상태에 저장
    };


    const handleFileChange = (files) => {
        setSelectedFiles(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 상태 검사
        let canSubmit = true;

        // 유효성 검사
        for (const key in formData) {
            if (formData.hasOwnProperty(key) && key !== "jdate") {
                const error = validate(key, formData[key]);
                if (error) {
                    setErrors(prevErrors => ({...prevErrors, [key]: error}));
                    canSubmit = false;
                }
            }
        }

        // 중복, SMS 인증 검사
        if (Object.values(errors).some(error => error !== null)) {
            canSubmit = false;
        }

        if (!isSmsVerified) {
            setSmsError('SMS 인증을 완료해주세요.');
            canSubmit = false;
        }

        if (formData.pwd !== passwordConfirm) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            canSubmit = false;
        }

        if (!canSubmit) {
            alert('항목을 확인해 주세요!');
            return;
        }

        const memberAndFileData = new FormData();
        memberAndFileData.append("memberData", JSON.stringify(formData));

        if (selectedFiles.length > 0) {
            for (const file of selectedFiles) {
                memberAndFileData.append('file', file);
            }
            memberAndFileData.append('tableName', "member");
            memberAndFileData.append('number', 0);
        }

        fetch(SERVER_URL + 'members', {
            method: 'POST',
            body: memberAndFileData,
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data)
                window.location.href = `/login`;
            })
            .catch(error => {
                alert(error)
            });
    };

    const handleDateInputBlur = (e) => {
        const {name, value} = e.target;
        validate(name, value);

        // 입력값이 없을 때, isDateInputFocused를 false로 설정하여 "생년월일" 텍스트를 보여주게 합니다.
        if (!value) {
            setDateInputFocus(false);
        }
    };

    const handleDateInputFocus = () => {
        setDateInputFocus(true);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        if (formData.pwd !== e.target.value) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError(null);
        }
    };


    return (
        <div className={styles.signFormContainer}>
            <h2><strong>회원가입</strong></h2>
            <form onSubmit={handleSubmit} className={styles.signForm}>
                <div className={styles.inputGroup}>
                    <input
                        name="memId"
                        value={formData.memId}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        style={{borderColor: errors.memId ? 'red' : ''}} // 여기서 스타일을 추가합니다.
                    />
                    <label>아이디</label>
                    {errors.memId && <span style={{color: 'red'}}>{errors.memId}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="pwd"
                        value={formData.pwd}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        style={{borderColor: errors.pwd ? 'red' : ''}}
                    />
                    <label>비밀번호</label>
                    {errors.pwd && <span style={{color: 'red'}}>{errors.pwd}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                        onBlur={handleBlur} // 기존의 handleBlur 함수를 재사용할 수 있습니다.
                        placeholder=" "
                        required
                        style={{borderColor: passwordError ? 'red' : ''}}
                    />
                    <label>비밀번호 확인</label>
                    {passwordError && <span style={{color: 'red'}}>{passwordError}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        style={{borderColor: errors.name ? 'red' : ''}}
                    />
                    <label>이름</label>
                    {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">성별 선택</option>
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    {isDateInputFocused ? (
                        <input
                            type="date"
                            name="bir"
                            value={formData.bir}
                            onChange={handleInputChange}
                            onBlur={handleDateInputBlur}
                            required
                            style={{borderColor: errors.bir ? 'red' : ''}}
                        />
                    ) : (
                        <input
                            name="bir"
                            value={formData.bir || "생년월일"}
                            onFocus={handleDateInputFocus}
                            readOnly
                        />
                    )}
                    {errors.bir && <span style={{color: 'red'}}>{errors.bir}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        name="tel"
                        value={formData.tel}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        style={{borderColor: errors.tel ? 'red' : ''}}
                        disabled={isSmsVerified} // SMS가 검증되면 비활성화
                    />
                    <label>전화번호</label>
                    {errors.tel && <span style={{color: 'red'}}>{errors.tel}</span>}
                    <button
                        onClick={handleSmsSend}
                        disabled={!isSmsBtnActive || errors.tel || isSmsVerified} // SMS가 검증되거나 전화번호에 에러가 있을 때 비활성화
                    >
                        인증번호 발송
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="smsInput"
                        value={userSmsInput}
                        onChange={handleSmsInputChange}
                        onBlur={handleBlur}
                        placeholder="인증번호 입력"
                        required
                        disabled={!isSmsInputActive} // SMS 발송 전에는 비활성화
                    />
                    {smsError && <span style={{color: 'red'}}>{smsError}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        required
                        style={{borderColor: errors.email ? 'red' : ''}}
                    />
                    <label>이메일</label>
                    {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                </div>
                <div className={styles.inputGroup} onClick={handleClick}>
                    <input
                        name="addr"
                        value={formData.addr}
                        onChange={handleInputChange}
                        placeholder=""
                        required
                    />
                    <label>주소</label>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        name="addrDtl"
                        value={formData.addrDtl}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                    />
                    <label>상세주소</label>
                </div>
                <div className={styles.inputGroup} onClick={handleClick}>
                    <input
                        name="addrPost"
                        value={formData.addrPost}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                    />
                    <label>우편번호</label>
                </div>
                <FileUpload onFileChange={handleFileChange} noFileMessage="상담사, 노무사 회원은 자격증 사본을 첨부 해주세요." maxSize={3}
                            maxCount={5}/>
                <div className={styles.inputGroup}>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;