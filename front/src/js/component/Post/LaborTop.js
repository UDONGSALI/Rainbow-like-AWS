import React from 'react';
import LaborImg from "../../../img/pages/laborBorad1.png";
import styles from '../../../css/component/Post/LaborTop.module.css';

function LaborTop() {

    return (
        <>
            <div className={styles.laborTop}>
                <div className={styles.laborImg}>
                    <img src={LaborImg} alt={"imgFalse"}/>
                </div>
                <div className={styles.const}>
                    <div className={styles.constText}>
                        <p>
                            <strong>설립목적</strong>
                        </p>
                        <ul className={styles.txtList}>
                            <li>
                                ○&nbsp;직장맘의 모성권 보호 관련 노무상담을 통해 경력단절 사전 예방
                            </li>
                            <li>
                                ○&nbsp;직장맘 고충 해결
                            </li>
                            <li>
                                ○&nbsp;일·가정 양립을 위한 가정과 직장 내 성평등한 문화 확산
                            </li>
                        </ul>
                        <p>
                            <strong>사업내용</strong>
                        </p>
                        <ul className={styles.txtList}>
                            <li>
                                ○&nbsp;노무상담 및 사건 대리
                            </li>
                            <li>
                                ○&nbsp;노동법교육(직장맘권리 이해 교육)
                            </li>
                            <li>
                                ○&nbsp;직장맘을 위한 토요 프로그램
                            </li>
                        </ul>
                    </div>
                    <ul className={styles.iconList}>
                        <li>
                            <span>전화상담</span>
                            <strong className={styles.phoneNum}>044-000-0000</strong>
                        </li>
                        <li>
                            <span>방문상담</span>
                            <strong className={styles.location}>세종시 어디구 저어기센터 4층
                                <br/>세종시직장맘지원센터
                            </strong>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.noticeBorderBox}>
                <div className={styles.noticeTitle}>
                    <strong>노무 상담 게시판 필독사항</strong>
                </div>
                <p className={styles.noticeCont}>이 곳은 직장맘들을 위한 노무상담 게시판입니다.<br/>
                    상담을 원하는 내용을 상세히 작성해 주시면 노무사가 검토 후 답변해 드립니다.
                    <br/>＊상담 내용 검토 등으로 인해 답변에 시간이 걸릴 수 있습니다.</p>
            </div>
        </>
    );
}

export default LaborTop;