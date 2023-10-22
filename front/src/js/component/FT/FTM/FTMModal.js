import React, {useEffect, useState} from "react";
import styles from '../../../../css/pages/FT/FTModal.module.css';
import FTWDtl from "../FTW/FTWDtl";
import {SERVER_URL} from "../../Common/constants";



function FTMModal({ onClose, ftcNum }){

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () => {
        fetch(SERVER_URL + "ftm/find/" + ftcNum)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))
            .catch(err => console.error(err));
    };

    console.log(post);


    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>{post[0].ftConsumer.member.name}의 매칭 확인</h2>

                    {post.map(test => (
                        <FTWDtl key={test.ftWorker.ftWorkerNum} ftwNum={test.ftWorker.ftWorkerNum} />
                    ))}


                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default FTMModal;