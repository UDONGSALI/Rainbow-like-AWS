import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Rent/RentReviewPost.module.css";
import RentReviewComment from "./RentReviewComment";
import {useConfirm} from "../../hook/useConfirm";

const RentReviewDetails = () => {
    const {postNum} = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const memId = sessionStorage.getItem("memId");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const navigate = useNavigate();
    const confirm = useConfirm();

    // 서버로부터 데이터를 가져오는 함수
    const fetchPostDetails = async () => {
        try {
            const [detailsResponse, postResponse] = await Promise.all([
                fetch(SERVER_URL + `post/${postNum}`),
                fetch(`${SERVER_URL}post/${postNum}/increase-view`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            ]);

            if (!detailsResponse.ok) {
                throw new Error("서버 응답 실패");
            }

            const detailsData = await detailsResponse.json();
            setPostDetails(detailsData);

            if (!postResponse.ok) {
                throw new Error("서버 응답 실패");
            }

            // postResponse에서는 JSON을 읽지 않습니다.
            // const postData = await postResponse.json();
            // setPost(postData);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    };
    useEffect(() => {
        // 데이터 가져오는 함수 호출
        fetchPostDetails();
    }, [postNum]);


    if (!postDetails) {
        // 데이터가 아직 로드되지 않았을 때의 상태를 처리
        return <div>Loading...</div>;
    }


    const writeDate = new Date(postDetails.writeDate);
    const formattedDate = writeDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const onEditClick = () => {
        // 수정 페이지로 이동
        navigate(`/rent/review/edit/${postNum}`);
    };

    const onDeleteClick = async () => {
        const shouldDelete = await confirm('정말로 삭제하시겠습니까?');
        if (shouldDelete) {
            // 삭제 API 호출
            const updatedPostData = {
                memNum: postDetails.member.memNum,
                boardNum: postDetails.board.boardNum,
                title: postDetails.title,
                content: postDetails.content,
                writeDate: postDetails.writeDate,
                editDate: postDetails.editDate,
                pageView: postDetails.pageView,
            };

            // PUT 요청 보내기
            fetch(SERVER_URL + `post/${postNum}`, {
                method: 'DELETE', // PUT 요청을 사용
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
                .catch((err) => console.error(err))
                .then((data) => {
                    alert('게시글을 삭제했습니다.');
                    setOpen(true);
                    navigate('/rent/review');
                })
                .catch((error) => {
                    console.error('게시글 삭제 중 오류 발생:', error);
                });
        }
    };


    // 데이터가 로드되면 UI를 렌더링
    return (
        <div id={styles.review} style={{width: "100%"}}>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                height: "45px",
            }}>
                <div style={{width: "30%", marginLeft:"5px"}}>
                    <p><b>글번호</b> {postDetails.postNum} <b>｜</b></p>
                </div>
                <div style={{width: "70%", display: "flex", justifyContent: "flex-end"}}>
                    {postDetails.member.memId === memId || isAdmin ? (
                        <div style={{marginRight:"5px"}}>
                            <button onClick={onEditClick} style={{
                                width: "70px",
                                height: "35px",
                                backgroundColor: "rgba(118,83,253,0.5)",
                                color: "#ffffff",
                                border: "1px solid #cccccc",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                                marginRight: "2px" // 여백 추가
                            }}> 수정
                            </button>
                            <button onClick={onDeleteClick} style={{
                                width: "70px",
                                height: "35px",
                                backgroundColor: "rgba(61,12,105,0.73)",
                                color: "#ffffff",
                                border: "1px solid #cccccc",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}> 삭제
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            {/*게시글*/}
            <div className={styles.postBox} style={{width: "100%", height: "700px"}}>
                <div className={styles.titleWrap}>
                    <div className={styles.title}>
                        <h2><b>제목</b> {postDetails.title}</h2>
                    </div>
                    <div className={styles.info}>
                        <p><b>작성자｜</b> {postDetails.member.memId}</p>
                        <p><b>조회수｜</b> {postDetails.pageView}</p>
                        <p><b>작성일｜</b> {formattedDate}</p>
                    </div>
                </div>
                <hr/>
                <div style={{width: "100%"}}>
                    <div className={styles.content} style={{marginLeft: "5%", marginRight: "5%", marginBottom: "10%"}}>
                        <p>{postDetails.content}</p>
                    </div>
                </div>
            </div>

            {/*대관이용후기게시글 댓글*/}
            <RentReviewComment/>

            {/*게시글 작성 및 목록이동 버튼*/}
            <div className={styles.button2} style={{display: 'flex', justifyContent: 'center'}}>

                <button onClick={() => navigate('/rent/review/write')}
                        style={{
                            width: "100px",
                            height: "40px",
                            backgroundColor: "#a38ced",
                            color: "#ffffff",
                            border: "1px solid #cccccc",
                            borderRadius: '5px',
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginTop: "5%",
                            marginBottom: "15%",
                            marginRight:"5px"
                        }}>새글쓰기
                </button>

                <button onClick={() => navigate('/rent/review')}
                        style={{
                            width: "100px",
                            height: "40px",
                            backgroundColor: "#3d0c69",
                            color: "#ffffff",
                            border: "1px solid #cccccc",
                            borderRadius: '5px',
                            fontSize: "15px",
                            fontWeight: "bold",
                            marginTop: "5%",
                            marginBottom: "15%"
                        }}> 목록으로
                </button>

            </div>
        </div>
    );
};

export default RentReviewDetails;