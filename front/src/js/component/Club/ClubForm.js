import React, {useEffect, useState} from "react";
import styles from '../../../css/component/Club/ClubForm.module.css';
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

function ClubForm(props){
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState({ memNum: "" });
    const [formData, setFormData] = useState({
        memNum: "",
        boardNum: 9,
        title: "",
        content: "",
        pageView: 0,
        parentsNum: "",
        clubAllowStatus: 'WAIT',
        clubRecuStatus: '',
        delYN : 'N'
    });

    useEffect(() => {
        memberSet();

        const formSet = {
            memNum: member.memNum,
            boardNum: 9,
            title: '',
            content: '',
            pageView: 0,
            parentsNum: '',
            clubAllowStatus: 'WAIT',
            clubRecuStatus: '',
            delYN : 'N'
            }

            setFormData(formSet);

        }, [member.memNum]);



    const memberSet = () => {
        fetch(SERVER_URL + `members/id/${memId}`)
        .then(response => response.json())
        .then(data => {
            setMember(data);
        })
        .catch(error => {
            alert('회원 정보를 찾을 수 없습니다!');
            window.location.href = '/login';
        }, [member.memNum]);
    }




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // API 호출하여 게시글 정보 전송
        fetch(SERVER_URL + 'post/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('게시글을 작성했습니다.');

                const newPostId = data.postNum;
                navigate(`/clubs/${newPostId}`);

            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });


    };

    return (
        <div className={styles.registrationFormContainer}>
            <h2>소모임 신청 폼</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>

                <div className={styles.inputGroup}>
                    <input
                        type="hidden"
                        name="memNum"
                        value={member.memNum}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="소모임 제목"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="소모임 본문"
                        required
                    >
                    </textarea>
                </div>


                <button type="submit">게시글 작성</button>
            </form>
        </div>
    );

};

export default ClubForm;