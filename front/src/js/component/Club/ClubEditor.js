import React, {useState, useEffect} from "react";
import styles from  '../../../css/component/Club/ClubForm.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

function ClubEditor(props) {
    const {id} = useParams();
    const memId = sessionStorage.getItem("memId");
    const memNum = sessionStorage.getItem("memNum");
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const [member, setMember] = useState([]);

    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: '',
        title: '',
        content: '',
        writeDate: '',
        editDate: '',
        pageView: '',
        parentsNum: '',
        clubAllowStatus: '',
        clubRecuStatus: '',
        delYN: 'N'
    });


    useEffect(() => {
        fetch(SERVER_URL + "post/" + id)
            .then(response => response.json())
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        fetch(SERVER_URL + "post/" + id)
            .then(response => response.json())
            .then(data => {
                // 데이터가 존재하고 post 데이터도 존재하는 경우에만 formData를 업데이트합니다.
                if (data && data.post) {
                    setFormData({
                        memNum: data.member.memNum,
                        boardNum: data.board.boardNum,
                        title: data.post.title,
                        content: data.post.content,
                        writeDate: data.post.writeDate,
                        editDate: new Date(),
                        pageView: data.post.pageView,
                        parentsNum: data.post.parentsNum,
                        clubAllowStatus: data.post.clubAllowStatus,
                        clubRecuStatus: data.post.clubRecuStatus,
                        delYN: data.post.delYN
                    });
                }
            })
            .catch(error => console.error(error));
    }, [id]);


    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (value === '') {
            // 선택되지 않았을 때 이전 값을 유지
            setFormData({...formData});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        formData.boardNum = formData.board.boardNum;

        formData.memNum = formData.member.memNum;

        // API 호출하여 게시글 정보 전송
        fetch(SERVER_URL + "post/edit/" + id, {
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
                navigate(`/clubs/${id}`);
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    };

    if (!formData.member) {
        return <div>Loading...</div>;
    }


    return (isAdmin || memNum == formData.member.memNum) ? (
            <div className={styles.registrationFormContainer}>
                <h2>게시글 수정 폼</h2>
                <form onSubmit={handleSubmit} className={styles.registrationForm}>

                    {
                        isAdmin ?
                            <div className={styles.inputGroup}>
                                <select
                                    name="clubAllowStatus"
                                    value={formData.clubAllowStatus}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="WAIT">대기</option>
                                    <option value="APPROVE">허가</option>
                                    <option value="REJECT">거부</option>

                                </select>
                            </div>
                            :
                            null
                    }
                    <div className={styles.inputGroup}>
                        <select
                            name="clubRecuStatus"
                            value={formData.clubRecuStatus}
                            onChange={handleChange}
                            required
                        >
                            <option value="">진행 현황</option>
                            <option value="진행중">진행중</option>
                            <option value="모집중">모집중</option>
                            <option value="모집마감">모집마감</option>

                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    >
                        본문을 작성해주세요.
                    </textarea>
                    </div>


                    <button type="submit">게시글 수정</button>
                </form>
            </div>
        ) :
        (
            <div>
                <h1>잘못된 접근입니다.</h1>
            </div>
        );

};

export default ClubEditor;