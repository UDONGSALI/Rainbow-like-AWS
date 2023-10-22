import React, {useState} from "react";
import styles from '../../../../css/component/Club/ClubForm.module.css';
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";


function FTWForm(props){
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const memNum = sessionStorage.getItem("memNum");

    const [formData, setFormData] = useState({
        memNum: memNum,
        speField: '',
        licenseYN: 'N',
        licenseDtl: '',
        ftDtl: '',
        ftStatus: '승인대기',
        delYN : 'N'
    });

    const handleLicenseChange = (e) => {
        setFormData({ ...formData, licenseYN: e.target.value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // API 호출하여 게시글 정보 전송
        fetch(SERVER_URL + 'ftw/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('등록이 신청되었습니다.');
                const newPostId = data.ftWorkerNum;
                navigate(`/ftw/dtl/${newPostId}`);

            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };

    return(
        <div className={styles.registrationFormContainer}>
            <h2>여성인재풀DB 신청</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                <select
                    name="speField"
                    value={formData.speField}
                    onChange={handleChange}
                    required
                >
                    <option value="">분야 선택</option>
                    <option value="IT">IT 전반</option>
                    <option value="IT_front">IT / front</option>
                    <option value="IT_back">IT / back</option>
                    <option value="IT_ect">IT / 기타</option>
                    <option value="디자인">디자인 / 전반</option>
                    <option value="디자인_그림">디자인 / 그림</option>
                    <option value="디자인_영상">디자인 / 영상</option>
                    <option value="디자인_수공예">디자인 / 수공예</option>
                    <option value="디자인_기타">디자인 / 기타</option>
                    <option value="기타">기타</option>
                </select>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="licenseYN"
                                value="Y"
                                checked={formData.licenseYN === 'Y'}
                                onChange={handleChange}
                            />
                            자격증 있음
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="licenseYN"
                                value="N"
                                checked={formData.licenseYN === 'N'}
                                onChange={handleChange}
                            />
                            자격증 없음
                        </label>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="licenseDtl"
                        value={formData.licenseDtl}
                        onChange={handleChange}
                        placeholder="보유 자격증을 적어주세요."

                    />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="ftDtl"
                        value={formData.ftDtl}
                        onChange={handleChange}
                        placeholder="연락처, 포트폴리오 주소, 자기소개 등을 적어주세요.
"
                        required
                    >
                    </textarea>
                </div>


                <button type="submit">등록 신청</button>
            </form>
        </div>
    );

};


export default FTWForm;