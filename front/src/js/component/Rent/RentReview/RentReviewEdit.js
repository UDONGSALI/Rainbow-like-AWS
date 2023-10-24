import React, {useEffect, useState} from "react";
import styles from '../../../../css/component/Post/PostForm.module.css';
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import 'react-quill/dist/quill.snow.css';

export default function RentReviewEdit() {
    const {postNum} = useParams();
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState([]);
    const [post, setPost] = useState({});
    const [file, setFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [updatedPost, setUpdatedPost]=useState({});
    const [formData, setFormData] = useState({
        postNum: '',
        memNum: '',
        boardNum: 6,
        title: '',
        content: '',
        parentsNum: '',
        delYN: 'N',
        memName: '', // 추가
        phone: '',   // 추가
        email: '',   // 추가
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

    //해당 게시글 가지고 오기
    useEffect(() => {
        if(postNum) { // postNum이 존재할 경우에만 아래 코드 실행
            fetch(SERVER_URL + `post/${postNum}`)
                .then(response => response.json())
                .then(data => {
                    setPost(data);

                    // 필요한 필드만 업데이트
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        postNum: data.postNum,
                        title: data.title,
                        content: data.content,
                        parentsNum: data.parentsNum,
                        boardNum: data.board.boardNum,
                    }));
                })
                .catch(error => {
                    alert('게시글 정보를 찾을 수 없습니다!');
                    alert('새 게시글을 작성하시겠습니까?');
                });
        }
    }, [postNum]);

    // 게시글을 업데이트하는 함수
    const updatePost = async () => {
        try {
            const response = await fetch(SERVER_URL + `post/edit/${postNum}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postNum:formData.postNum,
                    memNum: formData.memNum,
                    boardNum: formData.boardNum,
                    title: formData.title,
                    content: formData.content,
                    delYN: formData.delYN,

                }),
            });

            if (response.ok) {
                alert('정말 게시글을 등록하겠습니까?');
                alert('게시글이 등록되었습니다.');
                window.location.href='/rent/review'
            }

            if (!response.ok) {
                throw new Error('게시글 등록에 실패했습니다');
            }

            // 성공적으로 업데이트된 게시글을 가져와서 상태를 갱신
            const updatedData = await response.json();
            setUpdatedPost(updatedData);

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
        updatePost();
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
        <div className={styles.parentContainer} style={{ fontFamily:'IBM Plex Sans KR'}}>
            <div className={styles.postFormContainer} >
                <div className={styles.formHeader}>
                    <span className={styles.formHeaderText} style={{fontSize:"25px", fontWeight:"bold"}}>게시글 등록</span>
                </div>
                <hr className={`${styles.formHeaderLine} ${styles.otherHr}`}/>
                <div className={styles.inputGroup} style={{width:"100%", marginTop:"-3%"}}>
                    <label className={styles.label} style={{marginRight:"4%",fontSize:"17px", fontWeight:"bold"}}><span className={styles.required}>*</span>이름</label>
                    <input
                        type="text"
                        name="memName"
                        value={formData.memName}
                        disabled
                        className={styles.input}
                        style={{width: "40%"}}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} style={{marginRight:"4%",fontSize:"17px", fontWeight:"bold"}}><span className={styles.required}>*</span>연락처</label>
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
                    <label className={styles.label} style={{marginRight:"4%",fontSize:"17px", fontWeight:"bold"}}><span className={styles.required}>*</span>이메일 주소</label>
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
                    <label className={styles.label} style={{marginRight:"4%",fontSize:"17px", fontWeight:"bold"}}><span className={styles.required}>*</span>제목</label>
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
                <div className={styles.inputGroup} >
                    <label className={styles.label} style={{marginRight:"4%",fontSize:"17px", fontWeight:"bold"}}><span className={styles.required}>*</span>내용</label>
                    <textarea
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            height : "400px",
                            maxHeight: "100%",
                            border: "1px solid #ccc",
                            borderRadius: '5px',
                        }}
                    />
                </div>
                <div className={styles.inputGroup} style={{width:"100^"}}>
                    <label className={styles.label} style={{marginRight:"4%",fontSize:"17px", fontWeight:"bold"}}>첨부파일</label>
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
                                    <p style={{width:"50%",height: "40px",border:"1px solid #cccccc", borderRadius:"5px",marginTop:"1%",padding:"3px", marginRight:"1%"}}>
                                        <b>선택된 파일:</b>{file.name}</p>
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
                                                marginTop:"1%",
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

                <div className={styles.buttonGroup} style={{width:"100%",display:"flex" , marginTop:"10%"}}>
                    <button type="submit" className={styles.submitButton}
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
                                marginRight:"5px"
                            }}>등록</button>
                    <button type="button"
                            onClick={() => navigate('/rent/review')}
                            className={styles.redirectButton}   style={{
                        width: "100px",
                        height: "40px",
                        backgroundColor: "#3d0c69",
                        color: "#ffffff",
                        border: "1px solid #cccccc",
                        borderRadius: '5px',
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginBottom: "15%"
                    }}>목록으로
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}

