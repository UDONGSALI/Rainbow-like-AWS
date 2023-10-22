import React from 'react';
import styled from '../../../css/component/Intro/SpaceIntro.module.css';
import SpaceIntroImg from '../../../img/component/Intro/spaceintroImg.png';


function SpaceIntro() {
    return(

        <div style={{height:'100%', marginTop:'150px'}}>
            <section id={styled.contentWrap}>
                <div className={styled.layout}>
                    <header className={styled.subTit}>
                        <h3>공간 소개</h3>
                    </header>
                    <div className={styled.space}>
                        <div className={styled.topBox}>
                            <div className={styled.topBoxInner}>
                                <span className={styled.img}>
                                    <img src={SpaceIntroImg} alt="세종여성플라자 공간 이미지" />
                                </span>
                                <ul className={styled.topBoxTxt}>
                                    <li>
                                        <div>
                                            <div><span className={styled.floor}><em>4</em>F</span> <strong>세종여성플라자</strong></div>
                                            <p>멀티미디어실, 다목적활동실, 세미나실, 강의실, 공유오피스, 상담실 등</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styled.detail}><span className={styled.floor}><em>3</em>F</span>
                                            <p>남부통합보건지소, 정신건강복지센터</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styled.detail}><span className={styled.floor}><em>2</em>F</span>
                                            <p>아동보호전문기관, 청소년센터, 여성새로일하기센터, 세종시가족센터 등</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styled.detail}><span className={styled.floor}><em>1</em>F</span>
                                            <p>공동육아나눔터, 세종시장애인복지관(분관), 시니어클럽 등</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styled.detail}><span className={styled.floor}>B1</span>
                                            <p>대강당, 다목적체육실, 체력단련실, 탁구장</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <p>[새롬종합복지센터]</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
}

export default SpaceIntro;