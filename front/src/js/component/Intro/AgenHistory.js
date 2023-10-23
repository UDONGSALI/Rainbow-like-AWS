import styles from '../../../css/component/Intro/AgenHistory.module.css'
import History_logo from '../../../img/component/Intro/history_logo.png'

function AgenHistory() {

    return (
        <div className={styles.agenHistory2}>
                <div className={styles.area}>
                    <h3><strong>연혁</strong></h3>
                    <img src={History_logo} alt="세종여성플라자" style={{width: '15%', margin:'2%'}}/>
                    <div className={styles.histArea}>
                        <div className={styles.left}>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.leftNum}>2022</div>
                            <div className={styles.textFiled}>
                                <div className={styles.realTextFiled}>
                                    <div className={styles.num}>03</div>
                                    <div>세종여성플라자 개소식 개최</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.histArea}>
                        <div className={styles.left}>
                            <div className={styles.textFiled}>
                                <div className={styles.realTextFiled}>
                                    <div>「세종특별자치시 여성플라자 운영에 관한 조례」 제정</div>
                                    <div className={styles.num}>12</div>
                                </div>
                                <div className={styles.realTextFiled}>
                                    <div>재단법인 세종특별자치시 사회서비스원과 대행협약 체결</div>
                                    <div className={styles.num}>12</div>
                                </div>
                                <div className={styles.realTextFiled}>
                                    <div>새롬종합복지센터 4층 리모델링 공사 완료</div>
                                    <div className={styles.num}>12</div>
                                </div>
                            </div>
                            <div className={styles.rightNum}>2021</div>
                        </div>
                        <div className={styles.right}>
                        </div>
                    </div>
                    <div className={styles.histArea}>
                        <div className={styles.left}>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.leftNum}>2020</div>
                            <div className={styles.textFiled}>
                                <div className={styles.realTextFiled}>
                                    <div className={styles.num}>09</div>
                                    <div>세종여성플라자 추진준비단 구성 및 운영</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.histArea}>
                        <div className={styles.left}>
                            <div className={styles.textFiled}>
                                <div className={styles.realTextFiled}>
                                    <div>새롬종합복지센터 4층으로 세종여성플라자 입지 선정</div>
                                    <div className={styles.num}>10</div>
                                </div>
                            </div>
                            <div className={styles.rightNum}>2019</div>
                        </div>
                        <div className={styles.right}>
                        </div>
                    </div>
                    <div className={styles.histArea}>
                        <div className={styles.left}>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.leftNum}>2018</div>
                            <div className={styles.textFiled}>
                                <div className={styles.realTextFiled}>
                                    <div className={styles.num}>12</div>
                                    <div>「세종시 여성플라자 설립 타당성 조사 및 운영방안 연구용역」</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.histArea}>
                        <div className={styles.left}>
                            <div className={styles.textFiled}>
                                <div className={styles.realTextFiled}>
                                    <div>여성친화도시 조성을 위한 과제로 세종여성플라자 설립 계획수립</div>
                                </div>
                            </div>
                            <div className={styles.num}>06</div>
                            <div className={styles.rightNum}>2017</div>
                        </div>
                        <div className={styles.right}>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default AgenHistory;