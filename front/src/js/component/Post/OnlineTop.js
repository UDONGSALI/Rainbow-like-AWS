import React from 'react';
import onlineImg from '../../../img/component/Online/online2.jpg'
import styles from '../../../css/component/Post/OnlineTop.module.css';

function OnlineTop() {

    return (
        <>
            <div className={styles.onlineTop}>
                <div className={styles.onlineImg}  >
                    <img src={onlineImg}  alt={"온라인 상담 이미지"}/>
                </div>
            </div>
            <div className={styles.noticeBorderBox} >
                <div className={styles.noticeTitle}>
                    <strong >온라인 상담 게시판 필독사항</strong>
                </div>
                <p className={styles.noticeCont}>이 곳은 세종여성플라자의 문의 사항을 등록하는 게시판입니다.
                    상담을 원하시는 내용을 상세히 작성해 주시면, 상담사가 검토 후 답변해 드립니다.<br/>
                    세종여성플라자에 대한 문의나 관련 상담글이 아닌 경우,
                    의미없는 문자의 나열이 포함된 경우에는 관리자에 의해 게시글이 삭제될 수 있습니다.<br/>
                    ＊상담 내용 검토 등으로 인해 답변에 시간이 걸릴 수 있습니다.</p>
            </div>
        </>
    );
}

export default OnlineTop;