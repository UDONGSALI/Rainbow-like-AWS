import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";
import styles from '../../../css/component/Club/ClubDetail.module.css';


function ClubDetail(props) {
    const { id } = useParams();
    const memId = sessionStorage.getItem("memId");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 조회수 증가 API 호출
        fetch(`${SERVER_URL}post/${id}/increase-view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [id]);


    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () =>{
        fetch(`${SERVER_URL}post/${id}`)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))
            .catch(err => console.error(err));
    };

    const onDelClick = (post) => {
        const updatedPostData = {
            memNum:post.member.memNum,
            boardNum: post.board.boardNum,
            title: post.title,
            content: post.content,
            writeDate: post.writeDate,
            editDate: post.editDate,
            pageView: post.pageView,
            parentsNum: post.parentsNum,
            clubAllowStatus: post.clubAllowStatus,
            clubRecuStatus: post.clubRecuStatus,
            delYN : 'Y'
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "post/edit/" + post.postNum, {
            method: 'PUT', // PUT 요청을 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(err => console.error(err))

            .then((data) => {
                alert('게시글을 삭제했습니다.');
                navigate('/clubsMain');

            })
            .catch((error) => {
                console.error('게시글 삭제 중 오류 발생:', error);
            });
    };


    
    const onEditClick = () => {

        navigate("/clubs/edit/" + id);
    };

    function convertStatus(status) {
        switch (status) {
            case 'WAIT':
                return "대기";
            case 'APPROVE':
                return "허가";
            case 'REJECT':
                return "거부";
        }
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (

                <div className={styles.postDetailPage}>
            <h3>{post.title}</h3>
            <div className={styles.postMeta}>
                <div className={styles.postMeta1}>
                    {post.member.name}
                </div>
                <div className={styles.postMeta2}>
                    <span className={styles.metaItem}>{convertStatus(post.clubAllowStatus)}</span>
                    <span className={styles.metaItem}>{post.clubRecuStatus}</span>
                    <span className={styles.metaItem}>조회수 {post.pageView}</span>
                </div>
            </div>

            <div className={styles.content}>{post.content}</div>
                    <div className={styles.postButton}>
                        {post.member.memId === memId || isAdmin ? (
                            <>
                                <button onClick={() => onEditClick()}>수정</button>
                                <button onClick={() => onDelClick(post)}>삭제</button>
                            </>
                        ) : (
                            <></>
                        )}
                        <button onClick={() => navigate("/clubsMain")}>리스트로</button>
                    </div>

        </div>
    );


}

export default ClubDetail;