import styles from "../../../../css/component/Mypage/MyInfoEdit.module.css"
import * as React from "react";
import {useEffect, useState} from "react";
import {SERVER_URL} from "../../Common/constants";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import {useDaumPostcodePopup} from "react-daum-postcode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useToken} from "../../hook/useToken";


const style = {
    position: 'relative',
    display: 'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '40%',
    padding: 0,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function MemberInfoEdit() {

    const [updatedInfo, setUpdatedInfo] = useState({
        pwd: '',
        passwordConfirm: "",
        email: '',
        addr: '',
        addrDtl: '',
        addrPost: '',
        name: '',
    });
    const [memNum, setMemNum] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [name, setName] = useState(memberInfo ? memberInfo.name : "");
    const [gender, setGender] = useState(memberInfo ? memberInfo.gender : "");
    const [email, setEmail] = useState(memberInfo ? memberInfo.email : '');
    const [password, setPassword] = useState(memberInfo ? memberInfo.pwd : '');
    const [addrPost, setAddrPost] = useState(memberInfo ? memberInfo.addrPost : '')
    const [addr, setAddr] = useState(memberInfo ? memberInfo.addr : '')
    const [addrDtl, setAddrDtl] = useState(memberInfo ? memberInfo.addrDtl : '')
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
    const [smsConsent, setSmsConsent] = useState(true);
    const [emailConsent, setEmailConsent] = useState(false);
    const [selectedPathways, setSelectedPathways] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState({});
    const open = useDaumPostcodePopup();

    const {decodeToken: deleteTokenFromServer} = useToken();
    const logout = () => {
        const jti = sessionStorage.getItem('jti');
        if (jti) {
            deleteTokenFromServer(jti).then(() => {
                sessionStorage.clear();
                window.location.reload();
            });
        } else {
            sessionStorage.clear();
            window.location.reload();
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);

    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setUpdatedInfo((prev) => ({...prev, pwd: passwordConfirm}));
    };
    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setUpdatedInfo((prev) => ({...prev, email: e.target.value}));
    };


    const handleAddrChange = (e) => {
        setAddr(e.target.value);
        setUpdatedInfo((prev) => ({...prev, addr: e.target.value}));

    };
    const handleAddrDtlChange = (e) => {
        setAddrDtl(e.target.value);
        setUpdatedInfo((prev) => ({...prev, addrDtl: e.target.value}));

    };
    const handleAddrPostChange = (e) => {
        setAddrPost(e.target.value);
        setUpdatedInfo((prev) => ({...prev, addrPost: e.target.value}));

    };
    const handleSmsConsentChange = () => {
        setSmsConsent(!smsConsent);
    };
    const handleEmailConsentChange = () => {
        setEmailConsent(!emailConsent);
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };


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

        setMemberInfo({
            ...memberInfo,
            addr: fullAddress,
            addrPost: data.zonecode
        });
    };

    const handleClick = () => {
        open({onComplete: handleComplete});
    };


    const handleBlur = () => {
        if (!password) {
            setPlaceholderVisible(true);
        }

        if (password && passwordConfirm && password !== passwordConfirm) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };


    const handleCheckboxChange = (event) => {
        const {value} = event.target;

        // 이미 선택된 경로면 제거, 아니면 추가
        setSelectedPathways((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((pathway) => pathway !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };


    function redirectToURL1() {
        window.location.href = "/mypage/infoEdit";
    }


    function redirectToModal() {
        // console.log('redirectToModal called');
        handleOpen(true);
    }


    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        fetchMember();
    }, [memNum]);

    const fetchMember = () => {
        if (memNum === null) {
            return;
        }

        fetch(`${SERVER_URL}members/memInfo/${memNum}`)
            .then((response) => response.json())
            .then((data) => {
                // 멤버 정보를 받아온 후, 상태에 저장
                setMemberInfo(data);
                setGender(data.gender || ''); // gender가 null이면 빈 문자열로 초기화
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };
    const handleUpdate = async () => {
        const memId = memberInfo.memId;

        // 수정사항 확인
        const hasUpdates =
            memberInfo.gender !== gender ||
            memberInfo.email !== email ||
            memberInfo.password !== password ||
            memberInfo.addrPost !== addrPost ||
            memberInfo.addr !== addr ||
            memberInfo.addrDtl !== addrDtl ||
            memberInfo.name !== name;

        // 수정사항이 있을 경우에만 업데이트
        if (hasUpdates) {
            const updatedInfo = {
                gender: gender !== "" ? gender : memberInfo.gender,
                email: email !== "" ? email : memberInfo.email,
                pwd: password !== "" ? password : memberInfo.password,
                addrPost: addrPost !== "" ? addrPost : memberInfo.addrPost,
                addr: addr !== "" ? addr : memberInfo.addr,
                addrDtl: addrDtl !== "" ? addrDtl : memberInfo.addrDtl,
                name: name !== "" ? name : memberInfo.name,
            };

            try {
                const response = await fetch(`${SERVER_URL}members/update/${memId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedInfo),
                });

                if (response.status === 200 || response.status === 201) {
                    let text;
                    try {
                        text = await response.text();
                        // console.log('서버 응답 데이터:', text);
                        alert('회원 정보 수정에 성공 했습니다!');
                        window.location.href = "/mypage/infoEditSuccess";
                    } catch (jsonError) {
                        console.error('JSON 파싱 에러:', jsonError);
                        alert('회원 정보 수정에 성공 했습니다!');
                        window.location.href = "/mypage/infoEditSuccess";
                    }
                } else {
                    console.error('업데이트 실패:', response.statusText);
                    const text = await response.text(); // 여기서도 text 변수를 사용
                    // console.log('서버 응답 데이터:', text);
                    alert('회원 정보 수정 중 이상이 발생했습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                console.error('에러:', error);
                alert('회원 정보 수정 중 네트워크 또는 서버 오류가 발생했습니다.');
            }

            // console.log(updatedInfo);
        } else {
            // 수정사항이 없으면 기존 정보 유지
            console.error('수정사항이 없습니다. 기존 정보를 유지합니다.');
        }
    };

    const deleteMember = async () => {
        const memId = memberInfo.memId;
        // 서버에 회원 삭제 요청
        try {
            const response = await fetch(`${SERVER_URL}members/Withdrawal/${memId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                let text;
                text = await response.text();
                logout();
                window.location.href = "http://localhost:3000/login";
            } else {
                const text = await response.text();
                alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('에러:', error);
            alert('회원 삭제 중 에러가 발생했습니다. 다시 시도해 주세요. 에러 상세: ' + error.message);
        }
    }


    return (

        <div id={styles.title}>
            <div className={styles.main1}>
                <div className={styles.editProcess}>
                    <div className={styles.row}>
                        <div className={styles.col1}>
                            <p>STEP 01</p><h4>정보입력</h4>
                            <hr/>
                        </div>
                        <div className={styles.col2}>
                            <img
                                src="https://storage.googleapis.com/rainbow_like/img/nextButton.png"
                                alt="이동"
                                style={{width: "60px", height: "60px"}}/>
                        </div>
                        <div className={styles.col3}>
                            <p>STEP 02</p><h4>수정완료</h4>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main2}>
                <h3>필수입력사항</h3>
                <hr className={styles.main2hr}/>
                <div className={styles.basicInfo}>
                    {/*아이디*/}
                    <div className={styles.userId}>
                        <div className={styles.container}>
                            <div className={styles.field}><span>*</span><b>아이디</b></div>
                            <div> {memberInfo && memberInfo.memId}</div>
                        </div>
                    </div>
                    <hr/>
                    {/*비밀번호*/}
                    <div className={styles.userPwd}>
                        <div className={styles.container}>
                            <div className={styles.field}><span>*</span>
                                <b>비밀번호</b>
                            </div>
                            <div className={styles.userPwdIn}>
                                <input className={styles.basicInput}
                                       type={showPassword ? "text" : "password"}
                                       value={password}
                                       onChange={handlePasswordChange}
                                       placeholder="비밀번호 변경시 입력해주세요."
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    style={{backgroundColor: "white", border: "none"}}
                                >
                                    <img
                                        src={
                                            showPassword
                                                ? "https://storage.googleapis.com/rainbow_like/img/PwdShow.png"
                                                : "https://storage.googleapis.com/rainbow_like/img/PwdHind.png"
                                        }
                                        alt={showPassword ? "숨기기" : "보이기"}
                                        style={{Width: "30px", height: "30px"}}
                                    />
                                </button>

                                <p>영어 대문자, 소문자, 숫자, 특수문자 중 3종류 이상 조합하여 8~16자리로 입력해주세요.</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*비밀번호확인*/}
                    <div className={styles.userPwd}>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span>
                                <b>비밀번호 확인</b>
                            </div>
                            <div className={styles.userPwdIn}>
                                <input className={styles.basicInput}
                                       type={showPasswordConfirm ? "text" : "password"}
                                       value={passwordConfirm}
                                       onChange={handlePasswordConfirmChange}
                                       onBlur={handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPasswordConfirm}
                                    style={{backgroundColor: "white", border: "none"}}
                                >
                                    <img
                                        src={
                                            showPasswordConfirm
                                                ? "https://storage.googleapis.com/rainbow_like/img/PwdShow.png"
                                                : "https://storage.googleapis.com/rainbow_like/img/PwdHind.png"
                                        }
                                        alt={showPasswordConfirm ? "숨기기" : "보이기"}
                                        style={{Width: "30px", height: "30px"}}
                                    />
                                </button>
                                {passwordError && (
                                    <p style={{color: "red"}}>{passwordError}</p>
                                )}
                                <p>비밀번호 확인을 위해 다시 한번 입력해 주세요.</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*이름*/}
                    <div className={styles.userName}>
                        <div className={styles.container}>
                            <div className={styles.field}><span>*</span><b>이름</b></div>
                            <div>
                                {memberInfo && memberInfo.name}</div>
                        </div>
                    </div>
                    <hr/>
                    {/*성별*/}
                    <div className={styles.userGender}>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span><b>성별</b>
                            </div>
                            <div className={styles.radio}>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        checked={gender === 'MALE'}
                                        onChange={() => setGender('MALE')}
                                    />
                                    <span>남성</span>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        checked={gender === 'FEMALE'}
                                        onChange={() => setGender('FEMALE')}
                                    />
                                    <span>여성</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*생년월일*/}
                    <div className={styles.userBir}>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span><b>생년월일</b></div>
                            <div> {memberInfo && memberInfo.bir}</div>
                        </div>
                    </div>
                    <hr/>
                    {/*연락처*/}
                    <div className={styles.userTel}>
                        <div className={styles.container}>
                            <div className={styles.field}><span>*</span><b>연락처</b></div>
                            <div> {memberInfo && memberInfo.tel}</div>
                        </div>
                    </div>
                    <hr/>
                    {/*이메일주소*/}
                    <div className={styles.userEmail}>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span>
                                <b>이메일 주소</b></div>
                            <div>
                                <input className={styles.basicInput}
                                       name="email"
                                       defaultValue={email || (memberInfo && memberInfo.email) || ''}
                                       onChange={handleEmailChange}
                                       required
                                />
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*주소*/}
                    <div className={styles.userAddr}>
                        <div className={styles.container}>
                            <div className={styles.field}><span>*</span><b>주소</b></div>
                            <div className={styles.addrWrap}>
                                <div>
                                    <input className={styles.basicInput}
                                           name="addrPost"
                                           onClick={handleClick}
                                           value={memberInfo && memberInfo.addrPost}
                                           onChange={handleAddrPostChange}
                                           placeholder=""
                                           required/>
                                </div>
                                <div>
                                    <input className={styles.basicInput}
                                           name="addr"
                                           onClick={handleClick}
                                           value={memberInfo && memberInfo.addr}
                                           onChange={handleAddrChange}
                                           placeholder=""
                                           required/>
                                </div>
                                <div>
                                    <input className={styles.basicInput}
                                           name="addrDtl"
                                           onChange={handleAddrDtlChange}
                                           placeholder="상세주소를 입력하세요"
                                           required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {/*수신동의*/}
                    <div className={styles.userSms}>
                        <div className={styles.container}>
                            <div className={styles.field}>
                                <span>*</span>
                                <b>수신동의여부</b>
                            </div>
                            <div>
                                <label className={styles.checkWrap}>
                                    <input className={styles.check}
                                           type="checkbox"
                                           checked={smsConsent}
                                           onChange={handleSmsConsentChange}
                                    />
                                    <span>문자수신</span>
                                </label>
                                <label className={styles.checkWrap}>
                                    <input className={styles.check}
                                           type="checkbox"
                                           checked={emailConsent}
                                           onChange={handleEmailConsentChange}
                                    />
                                    <span>이메일수신</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
            <div className={styles.main3}>
                <h3>선택입력사항</h3>
                <hr className={styles.main3hr}/>
                <div className={styles.selectInfo}>
                    <div className={styles.container}>
                        <div className={styles.field}><b>소속</b></div>
                        <div><input className={styles.basicInput}/></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}><b>관심분야</b></div>
                        <div><select className={styles.basicInput} aria-label="interest">
                            <option value>선택</option>
                            <option value="1">여성 취업</option>
                            <option value="2">여성 창업</option>
                            <option value="3">교육 프로그램 참여</option>
                            <option value="4">소모임 등 지원 사업 참여</option>
                            <option value="5">여성 정책 관련 정보 취득</option>
                            <option value="6">기타</option>
                        </select></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}><b>알게된 경로</b></div>
                        <div>
                            <label className={styles.checkWrap}>
                                <input
                                    className={styles.check}
                                    type="checkbox"
                                    value="세종시청 홈페이지"
                                    checked={selectedPathways.includes('세종시청 홈페이지')}
                                    onChange={handleCheckboxChange}
                                />
                                세종시청 홈페이지
                            </label>
                            <label className={styles.checkWrap}>
                                <input className={styles.check}
                                       type="checkbox"
                                       value="세종시 네이버밴드"
                                       checked={selectedPathways.includes('세종시 네이버밴드')}
                                       onChange={handleCheckboxChange}
                                />
                                세종시 네이버밴드
                            </label>
                            <label className={styles.checkWrap}>
                                <input className={styles.check}
                                       type="checkbox"
                                       value="SNS"
                                       checked={selectedPathways.includes('SNS')}
                                       onChange={handleCheckboxChange}
                                />
                                SNS
                            </label>
                            <label className={styles.checkWrap}>
                                <input className={styles.check}
                                       type="checkbox"
                                       value="뉴스레터"
                                       checked={selectedPathways.includes('뉴스레터')}
                                       onChange={handleCheckboxChange}
                                />
                                뉴스레터
                            </label>
                            <label className={styles.checkWrap}>
                                <input className={styles.check}
                                       type="checkbox"
                                       value="지인소개"
                                       checked={selectedPathways.includes('지인소개')}
                                       onChange={handleCheckboxChange}
                                />
                                지인소개
                            </label>
                            <label>
                                <input className={styles.check}
                                       type="checkbox"
                                       value="기타"
                                       checked={selectedPathways.includes('기타')}
                                       onChange={handleCheckboxChange}
                                />
                                기타
                            </label>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
            <div className={styles.buttonWrap}>
                <div className={styles.button}>
                    <Stack spacing={2} direction="row">
                        <Button
                            onClick={redirectToURL1}
                            style={{
                                width: "120px",
                                height: "40px",
                                backgroundColor: "#3d0c69",
                                color: "rgb(255,255,255)",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}>취소</Button>
                    </Stack>
                </div>
                <div className={styles.button}>
                    <Stack spacing={2} direction="row">
                        <Button
                            onClick={handleUpdate}
                            style={{
                                width: "120px",
                                height: "40px",
                                backgroundColor: "#7653fd",
                                color: "rgb(255,255,255)",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}>입력완료</Button>

                    </Stack>
                </div>
                <div className={styles.button}>
                    <Stack className={styles.modalWrap} spacing={2} direction="row">
                        <Button
                            onClick={() => {
                                redirectToModal();
                            }}
                            style={{
                                width: "120px",
                                height: "40px",
                                backgroundColor: "#a38ced",
                                color: "#ffffff",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            회원탈퇴
                        </Button>
                        <Modal
                            className={styles.modal}
                            open={openModal}
                            onClose={handleClose}
                            aria-labelledby="modalTitle"
                            aria-describedby="modalDescription"
                        >
                            {/* 모달 내용 */}

                            <Box sx={style}>
                                <div className={styles.modalContent}>
                                    <Typography className={styles.modalTitle} variant="h6"
                                                component="h2">
                                        탈퇴 시 주의사항
                                    </Typography>
                                    <Typography className={styles.modalDescription} sx={{mt: 2}}>
                                        <div>
                                            <p>회원 탈퇴 후, 해당 회원으로 로그인 할 수 없고 <br/>
                                                회원정보 및 서비스 이용기록은 삭제됩니다.<br/>
                                                회원을 탈퇴하시겠습니까?</p>

                                        </div>
                                    </Typography>
                                    <div className={style.modalButtonWrap}>
                                        <Button
                                            className={styles.modalButton}
                                            onClick={handleClose}
                                            style={{
                                                width: "120px",
                                                height: "40px",
                                                backgroundColor: "#3d0c69",
                                                color: "#ffffff",
                                                borderRadius: '5px',
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                            }}
                                        >취소</Button>
                                        <Button
                                            className={styles.modalButton}
                                            onClick={() => {
                                                deleteMember();
                                            }}
                                            style={{
                                                width: "120px",
                                                height: "40px",
                                                backgroundColor: "#a38ced",
                                                color: "#ffffff",
                                                borderRadius: '5px',
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                            }}
                                        >탈퇴</Button>
                                    </div>
                                </div>
                            </Box>

                        </Modal>
                    </Stack>
                </div>
            </div>
        </div>

    )
        ;

};