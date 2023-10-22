import styles from '../../../css/component/SMS/SMSodal.module.css';
import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../../component/Common/constants";
import FTWDtl from "../FT/FTW/FTWDtl";

function SMSDtl({onClose, histNum}){
    const [post, setPost] = useState(null);
    const [tel, setTel] = useState([]);

    useEffect(() => {
        fetchPost();
        fetchTel();
    }, []);

    const fetchPost = () => {
        fetch(SERVER_URL + "sms/hist/" + histNum)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))
            .catch(err => console.error(err));
    };

    const fetchTel = () => {
        fetch(SERVER_URL + "sms/receptel/" + histNum)
            .then(response =>
                response.json())
            .then(data =>
                setTel(data))
            .catch(err => console.error(err));
    };



    if (!post) {
        return <div>Loading...</div>;
    }
    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h3>메세지 상세</h3>
                    <div className={styles.smsContent}>
                    {post.content}
                    </div>
                    <h3>전송받은 번호</h3>

                    <div className={styles.smsContent}>
                        <ul>
                            {tel.map((phoneNumber, index) => (
                                <li key={index}>{phoneNumber}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SMSDtl;