import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../../Common/constants";
import {useParams} from "react-router-dom";

export default function RentReviewComment() {
    const {postNum} = useParams();
    const memId = sessionStorage.getItem("memId");
    const memNum = sessionStorage.getItem("memNum");
    const userRole = sessionStorage.getItem("role");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const [member, setMember] = useState([]);
    const [rentComms, setRentComms] = useState({});
    const [open, setOpen] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);

    const [replyFormData, setReplyFormData] = useState({
        postNum: postNum,
        memNum: memNum,
        content: "",
        parentNum: "0",
        delYN: "N",
    });
    const [showEditForm, setShowEditForm] = useState({});
    const [comments, setComments] = useState([]);
    const [showReply, setShowReply] = useState({});

    const [editFormData, setEditFormData] = useState({
        postNum: postNum,
        memNum: memNum,
        content: "",
        parentNum: "0",
        delYN: "N",
    });

    //해당글에 대한 모든 댓글 가지고오기
    const fetchAllComments = () => {
        fetch(SERVER_URL + `postnumcomm/${postNum}`)
            .then((response) => response.json())
            .then((data) => {
                // 삭제되지 않은 댓글만 필터링
                const nonDeletedComments = data.filter(
                    (comment) => comment.delYN !== "Y"
                );
                setComments(nonDeletedComments);
            })
            .catch((error) => {
                alert("댓글을 가져오는 중에 문제가 발생했습니다.");
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        fetchAllComments();
    }, []);

    //댓글 정보 가지고 오기
    useEffect(() => {
        fetch(SERVER_URL + `comments`)
            .then((response) => response.json())
            .then((data) => {
                setRentComms(data);

                // 필요한 필드만 업데이트
                setReplyFormData((prevFormData) => ({
                    ...prevFormData,
                    // 여기에 필요한 필드 추가
                    post: data.post,
                    content: data.content,
                    delYN: data.delYN,
                }));
            })
            .catch((error) => {
                alert("댓글을 가져오는 중에 문제가 발생했습니다.");
                console.error("Error:", error);
            });
    }, []);

    const [formData, setFormData] = useState({
        postNum: postNum,
        memNum: memNum,
        content: "",
        parentNum: "0",
        delYN: "N",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        // console.log("Name:", name, "Value:", value);

        // formData 로그 추가
        // console.log("formData before update:", formData);

        setFormData({...formData, [name]: value});

        // formData 로그 추가
        // console.log("formData after update:", formData);
    };

    //댓글 작성하기
    const handleSubmit = (e) => {
        e.preventDefault();

        // 댓글 내용이 비어있을 경우 알림창 표시
        if (!formData.content.trim()) {
            alert('댓글 내용을 작성하셔야 댓글을 등록하실 수 있습니다.');
            return;
        }

        fetch(SERVER_URL + 'comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('댓글을 등록했습니다.');

                // 댓글 작성 후에 textarea를 비워줌
                setFormData({
                    postNum: postNum,
                    memNum: memNum,
                    content: '',
                    parentNum: '0',
                    delYN: 'N'
                });

                // 댓글 작성 후에 댓글 목록을 다시 불러와서 업데이트
                fetchAllComments();

                setOpen(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    //댓글 수정
    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditFormData({...editFormData, [name]: value});
    };

    // 수정된 부분: 수정 폼 닫기 함수
    const closeEditForm = () => {
        setShowEditForm({});
        setEditingCommentId(null);
    };

    // 수정 폼 제출
    const handleEditSubmit = (comment) => {
        // 수정 로직 추가
        const updatedCommentData = {
            editDate: new Date(),
            content: editFormData.content,
            delYN: comment.delYN,
            memNum: comment.member.memNum,
            parentNum: comment.parentNum,
            postNum: comment.post.postNum,
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "comm/" + comment.commNum, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCommentData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                alert("댓글을 수정했습니다.");

                // 댓글 수정 후에 댓글 목록을 다시 불러와서 업데이트
                fetchAllComments();

                // 수정 폼 닫기
                setShowEditForm((prevShowEditForm) => ({
                    ...prevShowEditForm,
                    [comment.commNum || 0]: false,
                }));

                // 수정 완료 후 textarea 숨기기
                setEditingCommentId(null);

                // 수정 완료 후에 textarea를 비워줌
                setEditFormData({
                    postNum: postNum,
                    memNum: memNum,
                    content: "",
                    parentNum: "0",
                    delYN: "N",
                });
            })
            .catch((error) => {
                console.error("댓글 수정 중 오류 발생:", error);
            });
    };

    const onEditClick = (comment) => {
        setEditFormData({
            postNum: comment.post.postNum,
            memNum: comment.member.memNum,
            content: comment.content,
            parentNum: comment.parentNum,
            delYN: comment.delYN,
        });

        // 댓글 수정 창을 토글합니다.
        setShowEditForm((prevShowEditForm) => ({
            ...prevShowEditForm,
            [comment.commNum || 0]: !prevShowEditForm[comment.commNum || 0],
        }));
    };

    // 댓글 삭제(delYN을 Y로 바꿔 리스트에 노출하지 않게 함)
    const onDelClick = (comment) => {
        const updatedCommentData = {
            editDate: new Date(),
            content: comment.content,
            delYN: "Y",
            memNum: comment.member.memNum,
            parentNum: comment.parentNum,
            postNum: comment.post.postNum,
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "comm/" + comment.commNum, {
            method: "PUT", // PUT 요청을 사용
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCommentData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                alert("댓글을 삭제했습니다.");

                // 댓글 삭제 후에 댓글 목록을 다시 불러와서 업데이트
                fetchAllComments();
            })
            .catch((error) => {
                console.error("댓글 삭제 중 오류 발생:", error);
            });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };

        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    return (
        <div>
            <div style={{width: "100%", maxHeight: "100%", backgroundColor: 'white'}}>
                <div
                    style={{
                        width: "100%",
                        position: "relative",
                        height: "180px",
                        backgroundColor: "#f6f2ff",
                        border: "2px solid #9d91cc",
                        borderRadius: "5px",
                        marginTop: "3%",
                    }}
                >
                    <div style={{width: "100%"}}>
                        <h3
                            style={{
                                marginLeft: "2%",
                                fontWeight: "bold",
                                fontSize: "20px",
                                marginTop: "20px",
                            }}
                        >
                            댓글쓰기
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                marginLeft: "2%",
                                marginRight: "2%",
                                marginTop: "1%",
                            }}
                        >
              <textarea
                  style={{
                      width: "90%",
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      marginRight: "2%",
                      borderRadius: "5px",
                      border: "1px solid #9d91cc",
                      fontSize: "15px",
                      resize: "none",
                  }}
                  name="content"
                  onChange={handleChange}
                  placeholder="댓글 작성은 로그인 후에 가능합니다."
              ></textarea>
                            <button
                                style={{
                                    width: "10%",
                                    borderRadius: "5px",
                                    border: "1px solid #9d91cc",
                                    backgroundColor: "#cbb6e5",
                                }}
                                onClick={handleSubmit}
                            >
                                <b style={{fontSize: "18px"}}>등록</b>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        position: "relative",
                        maxheight: "100%",
                        borderRadius: "5px",
                        marginTop: "3%",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                padding: "1%",
                                width: "80px",
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "25px",
                                marginTop: "20px",
                                border: "2px solid #9d91cc",
                                borderBottom: "none",
                                borderRadius: "5px",
                            }}
                        >
                            댓글
                        </h3>

                        <div
                            style={{
                                border: "2px solid #9d91cc",
                                padding: "1%",
                                borderRadius: "5px",
                            }}
                        >
                            {comments.length === 0 ? (
                                <p>댓글쓰기창에서 댓글을 작성해주세요.</p>
                            ) : (
                                comments.map((comment, index) => (
                                    <div style={{width: "100%", marginBottom: "10px"}} key={comment.commNum}>
                                    <div>
                                            <div style={{display: "flex"}}>
                                                <div>
                                                    <b>작성자ㅣ</b>
                                                    {comment.member.memId}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "15px",
                                                        marginLeft: "2%",
                                                        marginTop: "6px",
                                                    }}
                                                >
                                                    {formatDate(comment.editDate)}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "18px",
                                                    marginTop: "1%",
                                                    marginLeft: "1%",
                                                    marginBottom: "1%",
                                                }}
                                            >
                                                {/* 댓글 수정 폼 표시 */}
                                                {editingCommentId === comment.commNum ? (
                                                    <div style={{width: "100%", display: "flex"}}>
                          <textarea
                              type="text"
                              name="content"
                              style={{
                                  width: "80%",
                                  border: "1px solid #9d91cc",
                                  borderRadius: "5px",
                              }}
                              value={editFormData.content}
                              onChange={handleEditChange}
                          />
                                                        <button
                                                            onClick={() => handleEditSubmit(comment)}
                                                            style={{
                                                                width: "60px",
                                                                height: "30px",
                                                                backgroundColor: "#bc95e7",
                                                                color: "#ffffff",
                                                                border: "1px solid #ffffff",
                                                                borderRadius: "5px",
                                                                fontSize: "14px",
                                                                fontWeight: "bold",
                                                                marginLeft: "5px",
                                                            }}
                                                        >
                                                            완료
                                                        </button>
                                                    </div>
                                                ) : (
                                                    comment.content
                                                )}
                                            </div>

                                            {/* 수정 및 삭제 버튼 추가 */}
                                            {Number(memNum) === comment.member.memNum || isAdmin ? (
                                                <div style={{width: "100%"}}>
                                                    {/* 수정된 부분: 수정 버튼 클릭 시 editingCommentId 변경 */}
                                                    <button
                                                        onClick={() => {
                                                            onEditClick(comment);
                                                            setEditingCommentId(comment.commNum);
                                                        }}
                                                        style={{
                                                            width: "60px",
                                                            height: "30px",
                                                            backgroundColor: "#bc95e7",
                                                            color: "#ffffff",
                                                            border: "1px solid #ffffff",
                                                            borderRadius: "5px",
                                                            fontSize: "14px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        onClick={() => onDelClick(comment)}
                                                        style={{
                                                            width: "60px",
                                                            height: "30px",
                                                            backgroundColor: "#3d0c69",
                                                            color: "#ffffff",
                                                            border: "1px solid #ffffff",
                                                            borderRadius: "5px",
                                                            fontSize: "14px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            ) : null}

                                            {index !== comments.length - 1 && <hr/>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}