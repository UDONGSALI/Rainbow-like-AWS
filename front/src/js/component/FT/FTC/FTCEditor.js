import React, {useState, useEffect} from "react";
import styles from  '../../../../css/component/Club/ClubForm.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";

function FTCEditor(props){
    const { id } = useParams();
    const memId = sessionStorage.getItem("memId");
    const memNum = sessionStorage.getItem("memNum");
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";

    const [formData, setFormData] = useState({
        memNum: memNum || '', // memNum이 null이나 undefined인 경우 빈 문자열을 할당
        speField: '',
        applyContent: '',
        statusDtl: '',
        ftmYN: 'N',
    });

    useEffect(() => {
        fetch(SERVER_URL + "ftc/" + id)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        fetch(SERVER_URL + "ftc/" + id)

            .then(response => response.json())
            .then(formData => {
                // 데이터를 가져와서 formData 상태를 업데이트
                setFormData({
                    memNum: formData.member.memNum || '',
                    speField: formData.ftc.speField,
                    applyContent: formData.ftc.applyContent,
                    statusDtl: formData.ftc.statusDtl,
                    ftmYN: formData.ftc.ftmYN
                });
            })
            .catch(error => console.error(error));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (value === '') {
            // 선택되지 않았을 때 이전 값을 유지
            setFormData({ ...formData });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // API 호출하여 게시글 정보 전송
        fetch(SERVER_URL + "ftc/edit/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 수정했습니다.');

                //게시글 상세로 이동
                navigate(`/ftc/dtl/${id}`);
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };



    return(
        <div className={styles.registrationFormContainer}>
            <h2>여성인재 신청 수정</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        name="memNum"
                        value={formData.memNum}
                        onChange={handleChange}
                        placeholder="신청자"
                        required
                    />
                </div>

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
                {isAdmin ?
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="statusDtl"
                        value={formData.statusDtl}
                        placeholder="매칭 거부 사유를 적어주세요."
                        onChange={handleChange}
                    />
                </div>
                    :
                    null
                }
                <div className={styles.inputGroup}>
                    <textarea
                        name="applyContent"
                        value={formData.applyContent}
                        onChange={handleChange}
                        placeholder="매칭 요구사항을 적어주세요."
                        required
                    >
                    </textarea>
                </div>


                <button type="submit">수정</button>
            </form>
        </div>
    );

};

export default FTCEditor;