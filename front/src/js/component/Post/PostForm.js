import React, { useEffect, useState, useRef, useMemo } from "react";
import styles from '../../../css/component/Post/PostForm.module.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../Common/constants";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import {post} from "axios";

function PostForm(props) {
    const { parentsNum: parentsNumFromURL } = useParams();
    const location = useLocation();
    const mode = location.state?.mode || 'create';  // "create" 또는 "edit", or "reply"
    const [isEditMode, setIsEditMode] = useState(mode === 'edit');
    const [isReplyMode, setIsReplyMode] = useState(mode === 'reply');

    const { postNum: postNumFromParams } = useParams();
    const postNum = props.postNum || postNumFromParams;

    const boardNum = location.state?.boardNum;
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const [member, setMember] = useState([]);
    const [content, setContent] = React.useState('');
    const [filesNumbers, setFilesNumbers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});
    const [formData, setFormData] = useState({
        memNum: '',
        boardNum: location.state?.boardNum || '',
        title: '',
        content: '',
        pageView: 0,
        parentsNum: '',
        memName:'',
        email:'',
        phone:'',
        delYN: 'N'
    });

    useEffect(() => {
        // 회원 정보 가져오기
        fetch(SERVER_URL + `members/id/${memId}`)
            .then(response => response.json())
            .then(data => {
                setMember(data);
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

        // 글 정보 가져오기 (편집 모드일 때)
        if (isEditMode) {
            fetch(`${SERVER_URL}post/${postNum}`)
                .then(response => response.json())
                .then(data => {
                    setFormData({
                        memNum: data.member.memNum,
                        boardNum: data.board.boardNum || '',
                        title: data.title || '',
                        content: data.content || '',
                        pageView: data.pageView || 0,
                        parentsNum: data.parentsNum || '',
                        memName: data.member.name || '',
                        phone: data.member.tel || '',
                        email: data.member.email || '',
                        clubRecuStatus: data.clubRecuStatus || '',
                        delYN: data.delYN || 'N'
                    });
                    setContent(data.content || '');
                })
                .catch(error => {
                    console.error('Error fetching the post:', error);
                });
        }

        // 답글 모드일 때
        if (isReplyMode) {
            setFormData(prevFormData => ({
                ...prevFormData,
                parentsNum: parseInt(parentsNumFromURL)
            }));
        }

    }, [postNum, isEditMode, isReplyMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };


    const handleQuillChange = (contentValue) => {
        setContent(contentValue);
        setFormData(prevState => ({ ...prevState, content: contentValue }));

        const imgTagPattern = /<img [^>]*src="([^"]+)"[^>]*>/g;
        const currentSrcs = [];
        let match;
        while (match = imgTagPattern.exec(contentValue)) {
            currentSrcs.push(match[1]);
        }

        const missingSrcs = Object.keys(fileSrcToNumberMap).filter(src => !currentSrcs.includes(src));
        const missingFileNumbers = missingSrcs.map(src => fileSrcToNumberMap[src]);

        setFilesNumbers(prevNumbers => prevNumbers.filter(num => !missingFileNumbers.includes(num)));

        setFileSrcToNumberMap(prevMap => {
            missingSrcs.forEach(src => delete prevMap[src]);
            return { ...prevMap };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint;
        let method;

        if (isEditMode) {
            endpoint = `${SERVER_URL}post/edit/${postNum}`;
            method = 'PUT';
        } else {
            endpoint = `${SERVER_URL}post/new`;
            method = 'POST';
        }

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (isEditMode) {
                alert('게시글을 수정했습니다.');
            } else if (isReplyMode) {
                alert('답글을 작성했습니다.');
            } else {
                alert('게시글을 작성했습니다.');
            }

            if (filesNumbers && filesNumbers.length > 0) {
                filesNumbers.push(postNum + 1);

                const fileResponse = await fetch(SERVER_URL + "files/edit", {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filesNumbers),
                });

                if (!fileResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const fileData = await fileResponse.json();
                console.log(fileData.message);  // "Files updated successfully" 메시지 출력
            }
            handleRedirect();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleRedirect = () => {
        if (boardNum == 1 || boardNum == 2) {
            navigate(`/post/${boardNum}`);
        } else if (boardNum >= 3 && boardNum <= 5) {
            navigate(`/imgPost/${boardNum}`);
        } else if (boardNum >= 7) {
            navigate(`/csl/${boardNum}`);
        } else {
            // 뒤로 가기
            navigate(-1);
        }
    };

    function insertToEditor(url) {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range ? range.index : 0, 'image', url);
        }
    }

    function checkImageAvailability(urls) {
        const maxRetries = 5;
        let failedUrls = [];

        setLoading(true);

        urls.forEach(url => {
            fetch(url)
                .then(response => {
                    if (response.ok && !loading) {
                        insertToEditor(url);
                    } else {
                        failedUrls.push(url);
                    }
                })
                .catch(() => {
                    failedUrls.push(url);
                })
                .finally(() => {
                    if (failedUrls.length && retryCount < maxRetries) {
                        setTimeout(() => {
                            setRetryCount(prevRetry => prevRetry + 1);
                            checkImageAvailability(failedUrls);
                        }, 300);
                    } else {
                        setLoading(false);
                    }
                });
        });
    }

    function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', 'true');
        input.click();

        input.onchange = () => {
            const files = Array.from(input.files);

            if (files.length > 1) {
                alert('한번에 한 사진만 업로드 가능합니다!');
                return;
            }

            const formData = new FormData();

            files.forEach(file => {
                formData.append('file', file);
            });

            formData.append('tableName', 'post');
            formData.append('number', postNum + 1);

            fetch(`${SERVER_URL}files/FileNums`, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setFilesNumbers(prevFilesNumbers => [...prevFilesNumbers, ...data]);

                    const storageBaseUrl = "https://storage.googleapis.com/rainbow_like/";
                    const urlsForFiles = files.map(file => {
                        const postUrlPath = `post/${postNum + 1}/${file.name}`;
                        return storageBaseUrl + postUrlPath;
                    });

                    const newFileSrcToNumberMap = {};
                    urlsForFiles.forEach((url, index) => {
                        newFileSrcToNumberMap[url] = data[index];
                    });
                    setFileSrcToNumberMap(prevMap => ({ ...prevMap, ...newFileSrcToNumberMap }));

                    setLoading(true);
                    checkImageAvailability(urlsForFiles);
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error.message);
                })
                .finally(() => {
                    setImageLoading(false);
                });
        };
    }

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    ['image'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',
    ];
    const quillRef = useRef();

    return (
        <div className={styles.parentContainer}>
            <div className={styles.postFormContainer}>
                <div className={styles.formHeader}>
                    <span className={styles.formHeaderText}>게시글 등록</span>
                </div>
                <hr className={`${styles.formHeaderLine} ${styles.otherHr}`} />
                <form onSubmit={handleSubmit} className={styles.postForm}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}><span className={styles.required}>*</span>이름</label>
                        <input
                            type="text"
                            name="memName"
                            value={formData.memName}
                            disabled
                            className={styles.input}
                        />
                    </div>
                    {boardNum == 7 || boardNum == 8 ? ( // 보드넘이 7 또는 8인 경우에만 연락처 및 이메일 주소 표시
                        <div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}><span className={styles.required}>*</span>연락처</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
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
                                />
                            </div>
                        </div>
                    ) : null}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}><span className={styles.required}>*</span>제목</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.customInputGroup}`}>
                        <label className={styles.label}></label>
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={content}
                            onChange={handleQuillChange}
                            modules={modules}
                            formats={formats}
                            className={styles.customQuill}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>{isEditMode ? "수정" : "저장"}</button>
                        <button type="button" onClick={handleRedirect} className={styles.redirectButton}>목록으로</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default PostForm;
