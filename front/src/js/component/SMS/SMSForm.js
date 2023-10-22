import React, {useEffect, useState, Component} from "react";
import styles from '../../../css/component/Club/ClubForm.module.css';
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../component/Common/constants";


function SMSForm({ onFormSubmit }) {
    const [formData, setFormData] = useState({});
    const [telData, setTelData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(formSet);
    }, []);

    const formSet = {
        smsType: '',
        sendTel: '01075260231',
        content: '',
        recepTel : '',
        sendDate: new Date()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.recepTel === '전체 회원') {
            fetch(SERVER_URL + 'sms/allmembertel', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setTelData(data);
                    onFormSubmit();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else if (formData.recepTel === '직접 입력') {
            const recep = [formData.recepTelInput];
            setTelData(recep);
            onFormSubmit();
        }
    };

    useEffect(() => {
        if (telData.length > 0) {
            saveSMSHistory();
        }
    }, [telData]);

    const saveSMSHistory = () => {
        fetch(SERVER_URL + 'sms/newhist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((data) => {
                const histNum = data.smsHistNum;
                saveRecepTel(histNum);

            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
                alert('메세지 전송에 실패했습니다.');

            });
    }

    const saveRecepTel = (histNum) => {

        console.log(telData);

        fetch(SERVER_URL + 'sms/save/' + histNum, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(telData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                sendSMS(histNum);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const sendSMS = (histNum) => {
        // SMS 전송 작업 수행
        fetch(SERVER_URL + 'sms/sendsms/' + histNum, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setFormData(formSet);
                alert("메세지를 전송했습니다.");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div className={styles.registrationFormContainer}>
            <h2>SMS 작성</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                    <select
                        name="smsType"
                        value={formData.smsType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">메세지 유형 선택</option>
                        <option value="공지">공지</option>
                        <option value="홍보">홍보</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="recepTel"
                                value="전체 회원"
                                onChange={handleChange}
                            />
                            전체 회원
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="recepTel"
                                value="수신 동의 회원"
                                onChange={handleChange}
                            />
                            수신 동의 회원
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="recepTel"
                                value="직접 입력"
                                onChange={handleChange}
                            />
                            직접 입력
                        </label>
                    </div>
                </div>

                {formData.recepTel === "직접 입력" && (
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="recepTelInput"
                            value={formData.recepTelInput}
                            onChange={handleChange}
                            placeholder="(-) 기호 없이 숫자만 입력해주세요."
                        />
                    </div>
                )}


                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="sendTel"
                        value={formData.sendTel}
                        onChange={handleChange}
                        placeholder="010-7526-0231"
                    />
                </div>


                <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="45자 이내의 메세지를 작성해주세요."
                        required
                    >
                        45자 이내의 메세지를 작성해주세요.
                    </textarea>
                </div>


                <button type="submit">전송</button>
            </form>
        </div>
    );

};


export default SMSForm;