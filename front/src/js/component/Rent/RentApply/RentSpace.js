import styles from '../../../../css/component/Rent/RentSpace.module.css';
import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../../Common/constants";
import LoginMember from "../RentApply/LoginMember";
import RentAgreeForm from "../RentApply/RentAgreeForm";

let payStatus

function RentSpace({selectedInfo}) {
    const [member, setMember] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(1);
    const [fileUri, setFileUri] = useState('');
    const [memId, setMemId] = useState(sessionStorage.getItem('memId'));
    const [selectedPurpose, setSelectedPurpose] = useState('');

    if (selectedInfo.selectedSpace.rentFee === '무료') {
        payStatus = 'COMPLETE'
    } else {
        payStatus = 'WAIT'
    }
    let url = selectedInfo.selectedSpace._links.self.href;
    let parts = url.split('/');
    let spaceNumValue = parts[parts.length - 1];
    let spaceNum = parseInt(spaceNumValue);

    //대관정보
    const [updatedInfo, setUpdatedInfo] = useState({
        rentStdt: `${selectedInfo.selectedDate}T${selectedInfo.selectedTimeRange[0]}`,
        rentEddt: `${selectedInfo.selectedDate}T${selectedInfo.selectedTimeRange[selectedInfo.selectedTimeRange.length - 1]}`,
        applyDate: new Date(),
        applyStatus: 'WAIT',
        payStatus: payStatus,

    });

    //멤버 정보 가지고 오기
    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then((response) => response.json())
            .then((data) => {
                setMember(data);

                // 멤버 정보가 있을 경우 hasUpdates 객체에 추가
                if (data) {
                    setUpdatedInfo((prevInfo) => ({
                        ...prevInfo,
                        member: data,  // 멤버 정보 추가
                    }));
                }
            })
            .catch((error) => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, []);

    //사진파일 가지고 오기
    useEffect(() => {
        fetch(SERVER_URL + `files`)
            .then(response => response.json())
            .then(data => {
                setFiles(data);

                // spaceName로 파일의 사진 찾기
                const matchingFile = data.find(file => file.space && file.space.spaceName === selectedInfo.spaceName);

                if (matchingFile) {
                    const randomParam = Math.random();  // 무작위 매개변수 생성
                    const updatedFileUri = `${matchingFile.fileUri}?${randomParam}`;  // 매개변수를 URL에 추가
                    setFileUri(updatedFileUri); // 수정된 URL을 상태에 저장
                    // console.log("Matching fileUri:", updatedFileUri);
                } else {
                    console.error("File not found for spaceName:", selectedInfo.spaceName);
                }
            })
            .catch(error => {
                alert('대관 장소 사진을 찾을 수 없습니다!');
            });
    }, [selectedInfo.spaceName]);


    //대관예약신청정보 데이터베이스로 보내기
    const handleUpdate = async () => {

        // 사용목적이 입력되지 않았을 경우 알림창 표시
        if (!selectedPurpose.trim()) {
            alert('사용목적 입력은 필수입니다.');
            return;
        }

        try {

            const response = await fetch(`${SERVER_URL}rent/update/${spaceNum}/${member.memNum}`, {
                method: 'POST',
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
                    alert('정말로 대관 예약 신청을 하시겠습니까?');
                    alert('대관 예약 신청이 완료되었습니다. 마이페이지에서 확인하세요.');
                    window.location.href = "/mypage/rent";
                } catch (jsonError) {
                    console.error('JSON 파싱 에러:', jsonError);
                    alert('정말로 대관 예약 신청을 하시겠습니까?');
                    window.location.href = "/mypage/rent";
                }
            } else {
                console.error('업데이트 실패:', response.statusText);
                const text = await response.text(); // 여기서도 text 변수를 사용
                // console.log('서버 응답 데이터:', text);
                alert('대관 예약 신청 중 이상이 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('에러:', error);
            alert('대관 예약 신청 중 네트워크 또는 서버 오류가 발생했습니다. 관리자에게 문의하세요.');
        }

    };

    const handleUserSelectChange = (e) => {
        const selectedUserCount = parseInt(e.target.value, 10);
        setSelectedUsers(selectedUserCount);
    };

    const handlePurposeChange = (e) => {
        setSelectedPurpose(e.target.value);
    };

    function redirectToURL() {
        window.location.href = "/mypage/rent"
    };

    return (
        <div id={styles.title}>
            {/*대관장소정보*/}
            <div className={styles.main1}>
                <div className={styles.rentSpace}>
                    <div className={styles.spaceImg}><img src={fileUri} style={{
                        width: "250px",
                        height: "200px",
                        borderRadius: "10px"
                    }}/></div>
                    <div className={styles.spaceInfo}>
                        <h2 className={styles.spaceName}>{selectedInfo.spaceName}</h2>
                        <div>
                            <div><b>공간용도</b>ㅣ{selectedInfo.selectedSpace.spaceUsage}</div>
                            <div><b>최대인원</b>ㅣ{selectedInfo.selectedSpace.maxPerson}명</div>
                            <div><b>이용료</b>ㅣ{selectedInfo.selectedSpace.rentFee}</div>
                        </div>
                    </div>
                </div>

            </div>


            {/*이용약관동의*/}
            <RentAgreeForm/>

            {/*대관신청정보*/}
            <div className={styles.main2}>
                <h3>대관 신청정보</h3>
                <hr className={styles.main2hr}/>
                <div className={styles.rentSpace}>
                    <div className={styles.container}>
                        <div className={styles.field}><span>*</span><b>장소명</b></div>
                        <div><b>{selectedInfo.spaceName}</b></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}>
                            <span>*</span>
                            <b>사용날짜</b></div>
                        <div><b>{selectedInfo.selectedDate}</b></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}>
                            <span>*</span>
                            <b>사용시간</b></div>
                        <div><b> {selectedInfo.rentTime}</b></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}>
                            <span>*</span>
                            <b>대관료</b></div>
                        <div>
                            <b> {selectedInfo.selectedSpace.rentFee}</b></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}>
                            <span>*</span>
                            <b>사용인원</b></div>
                        <div className={styles.per}>
                            <select value={selectedUsers} onChange={handleUserSelectChange}>
                                {[...Array(selectedInfo.selectedSpace.maxPerson).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                            </select></div>
                    </div>
                    <hr/>
                    <div className={styles.container}>
                        <div className={styles.field}>
                            <span>*</span>
                            <b>사용목적</b></div>
                        <div>
                            <input
                                className={styles.basicInput}
                                value={selectedPurpose}
                                onChange={handlePurposeChange}
                            /></div>
                    </div>
                    <hr/>
                </div>

            </div>

            {/*대관신청자정보*/}
            <LoginMember/>
            <div className={styles.rentButton}>
                <button
                    onClick={handleUpdate}
                    style={{
                        width: "150px",
                        height: "50px",
                        backgroundColor: "#a38ced",
                        color: "rgb(255,255,255)",
                        border: "1px solid #ffffff",
                        borderRadius: '5px',
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}>대관신청
                </button>
            </div>

        </div>
    );
}

export default RentSpace;