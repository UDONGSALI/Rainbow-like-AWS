import React, {useEffect, useState, useRef, useMemo} from "react";
import styles from '../../../../css/component/Post/PostForm.module.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import 'react-quill/dist/quill.snow.css';

export default function RentReviewWrite() {
    const {postId} = useParams();
    const {postNum} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState([]);
    const [post, setPost] = useState({});
    const [file, setFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({});
    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: 6,
        title: '',
        content: '',
        delYN: 'N'
    });

    //로그인한 멤버정보 가지고 오기
    useEffect(() => {
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);

                // 필요한 필드만 업데이트
                setFormData(prevFormData => ({
                    ...prevFormData,
                    memNum: data.memNum,
                    memName: data.name,
                    phone: data.tel,
                    email: data.email
                }));
            })
            .catch(error => {
                alert('회원 정보를 찾을 수 없습니다!');
                window.location.href = '/login';
            });
    }, []);


    // 게시글을 업로드하는 함수
    const writePost = async () => {
        try {
            const response = await fetch(SERVER_URL + `post/new/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memNum: formData.memNum,
                    boardNum: formData.boardNum,
                    title: formData.title,
                    content: formData.content,
                    delYN: formData.delYN,
                }),
            });
            if (response.ok) {
                const responseData = await response.json(); // 응답 본문 추출
                alert('게시글 등록에 성공했습니다.');
                navigate(`/rent/review/post/${responseData.postNum}`)
            }
            if (!response.ok) {
                throw new Error('게시글 등록에 실패했습니다');
            }
        } catch (error) {
            console.error(error);
            alert('게시글 등록에 실패했습니다');
        }
    };


    const handleUpdateButtonClick = () => {
        if (!formData.phone || !formData.email || !formData.title || !formData.content) {
            alert('연락처, 이메일 주소, 제목, 내용은 필수 입력 항목입니다.');
            return;
        }
        writePost();
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setSelectedFiles([newFile]);
        }
    };

    const handleFileCancel = () => {
        setFile(null);
        setSelectedFiles([]);
    };


    return (
        <div className={styles.parentContainer} >
            <div className={styles.postFormContainer}>
                <div className={styles.formHeader}>
                    <span className={styles.formHeaderText} style={{fontWeight:"bold"}}>게시글 등록</span>
                </div>
                <hr className={`${styles.formHeaderLine} ${styles.otherHr}`}/>
                <div className={styles.inputGroup} style={{width: "100%"}}>
                    <label className={styles.label}><span className={styles.required}>*</span>이름</label>
                    <input
                        type="text"
                        name="memName"
                        value={formData.memName}
                        disabled
                        className={styles.input}
                        style={{width: "40%",}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>연락처</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{width: "40%",}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>이메일 주소</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{width: "40%",}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>제목</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{
                            width: "100%",
                        }}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}><span className={styles.required}>*</span>내용</label>
                    <textarea
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            height: "400px",
                            maxHeight: "100%",
                            border: "1px solid #ccc",
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>첨부파일</label>
                    <div className={styles.buttonInfoWrap} style={{width:"100%"}}>
                        <button
                            style={{
                                width: '80px',
                                height: '40px',
                                backgroundColor: '#3d0c69',
                                color: '#ffffff',
                                borderRadius: '5px',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                marginRight: '10%',
                                position: 'relative',
                                border: '1px solid #ffffff',

                            }}
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            파일첨부
                        </button>
                        {file && (
                            <>
                                <div className={styles.buttonInfo} style={{display: "flex",width:"100%"}}>
                                    <p style={{width:"10%"}}>선택된 파일: {file.name}</p>
                                    <button className={styles.ceoFile}
                                            style={{
                                                width: '65px',
                                                height: '40px',
                                                backgroundColor: '#c694fa',
                                                color: '#ffffff',
                                                borderRadius: '5px',
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                                marginRight: '10%',
                                                position: 'relative',
                                                border: '1px solid #ffffff',
                                            }}
                                            onClick={handleFileCancel}>취소
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit"
                            onClick={handleUpdateButtonClick}
                            style={{
                                   width: "100px",
                                   height: "40px",
                                   backgroundColor: "#a38ced",
                                   color: "#ffffff",
                                   border: "1px solid #cccccc",
                                   borderRadius: '5px',
                                   fontSize: "15px",
                                   fontWeight: "bold",
                                   marginTop: "3%",
                                   marginBottom: "15%"
                    }}>등록
                    </button>
                    <button type="button" onClick={() => navigate('/rent/review')}
                            style={{
                                width: "100px",
                                height: "40px",
                                backgroundColor: "#3d0c69",
                                color: "#ffffff",
                                border: "1px solid #cccccc",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                                textAlign:"center",
                                marginTop: "3%",
                                marginBottom: "15%"
                    }}
                    >목록으로
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}

