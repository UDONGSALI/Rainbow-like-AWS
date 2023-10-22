import * as React from "react";
import styles from "../../../../css/component/Mypage/MyEditSuccess.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function EditSuccess() {
    function redirectToURL1() {
        window.location.href = "/";
    };

    function redirectToURL2() {
        window.location.href = "/mypage/edu";
    };

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
                                style={{Width: "50px", height: "50px"}}/>
                        </div>
                        <div className={styles.col3}>
                            <p>STEP 02</p><h4>수정완료</h4>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main2}>
                <div className={styles.editSuccess}>
                    <p>회원수정이 완료되었습니다.</p>
                    <div className={styles.successImage}>
                        <img
                            src="https://storage.googleapis.com/rainbow_like/img/MemberEdit.png"
                            alt="회원정보수정완료"
                            style={{Width: "130px", height: "130px"}}/>
                    </div>
                    <div className={styles.successInfo}><p>회원수정이 성공적으로 완료되었습니다.</p>
                        <p>회원정보 수정은 <span>마이페이지>회원정보수정</span>에서 가능합니다.</p><
                /div>
                </div>
                <div className={styles.successButton}>
                    <div className={styles.mainPage}>
                        <Stack className={styles.buttonWrap} spacing={2} direction="row">
                            <Button className={styles.button}
                                    onClick={redirectToURL1}
                                    style={{
                                        width: "120px",
                                        height: "40px",
                                        backgroundColor: "#3d0c69",
                                        color: "rgb(255,255,255)",
                                        borderRadius: '5px',
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}>메인으로</Button>
                        </Stack>
                    </div>
                    <div className={styles.mainPage}>
                        <Stack className={styles.buttonWrap} spacing={2} direction="row">
                            <Button className={styles.button}
                                    onClick={redirectToURL2}
                                    style={{
                                        width: "120px",
                                        height: "40px",
                                        backgroundColor: "#a38ced",
                                        color: "rgb(255,255,255)",
                                        borderRadius: '5px',
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}>마이페이지로</Button>
                        </Stack>
                    </div>
                </div>
            </div>


        </div>
    );
};