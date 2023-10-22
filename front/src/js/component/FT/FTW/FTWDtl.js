import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../../Common/constants";
import styles from '../../../../css/component/Club/ClubDetail.module.css';


function FTWDtl({ftwNum}){

    const params = useParams();
    const memId = sessionStorage.getItem("memId");
    const memNum = sessionStorage.getItem("memNum");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";

    let id;

    if (ftwNum != undefined) {
        id = ftwNum;
    }else{
    id = params.id;
    }


    const [post, setPost] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () =>{
        fetch(SERVER_URL + "ftw/" + id)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))

            .catch(err => console.error(err));


    };

    const onDelClick = (post) => {
        const updatedPostData = {
            memNum: post.member.memNum,
            speField: post.speField,
            licenseYN: post.licenseYN,
            licenseDtl: post.licenseDtl,
            ftDtl: post.ftDtl,
            ftStatus: post.ftStatus,
            writeDate: post.writeDate,
            editDate: new Date(),
            delYN : 'Y'
        };


        // PUT 요청 보내기
        fetch(SERVER_URL + "ftw/edit/" + post.ftWorkerNum, {
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
            .then((data) => {
                alert('게시글을 삭제했습니다.');
                setOpen(true);
                navigate('/mypage/ftw');


            })
            .catch((error) => {
                console.error('게시글 삭제 중 오류 발생:', error);
            });
    };

    const onEditClick = (params) => {
        navigate("/ftw/edit/" + id);
    };


    if (!post) {
        return <div>Loading...</div>;
    }

    return(

        <div className={styles.FTDetailPage}>
            <h3>{post.member.name}</h3>
            <div>
                승인여부
                <div>
                    {post.ftw.ftStatus}
                </div>
            </div>
            <div>
                분야
            <div>
                {post.ftw.speField}
            </div>
            </div>
            <div>
                보유 자격증
            <div>
                {post.ftw.licenseDtl}
            </div>
            </div>
            <div>
                상세
                <div>
                    {post.ftw.ftDtl}
                </div>
           </div>

            {ftwNum === undefined ?
                <div className={styles.postButton}>
                    <button onClick={() => onEditClick()}>수정</button>
                    <button onClick={() => onDelClick(post.ftw)}>삭제</button>
                    {isAdmin?
                    <button onClick={() => navigate("/admin/ftmain/ftw")}>리스트로</button>
                        :
                        null
                    }
                </div>
                :
                null
            }
        </div>
    );
}

export default FTWDtl;