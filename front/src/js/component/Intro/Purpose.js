import styled from '../../../css/component/Intro/Purpose.module.css'
import Vision1 from '../../../img/component/Intro/vision_icon01.png';
import Vision2 from '../../../img/component/Intro/vision_icon02.png';
import Vision3 from '../../../img/component/Intro/vision_icon03.png';
import Vision4 from '../../../img/component/Intro/vision_icon04.png';

function Purpose() {
    return (
        <div style={{width:'100%', marginTop:'90px'}}>
            <section id={styled.purContentWrap}>
                <div className={styled.topLayout}>
                    <header id={styled.hederSubTit}>
                        <h3 className={styled.mainTitle}>목적 및 비전</h3>
                    </header>
                    <div className={styled.vision}>
                        <div className={styled.vBox01}>
                            <div className={styled.visionTitle}><strong>설립목적</strong></div>
                            <h4 className={styled.vBoxText}>세종시 여성들의 지역사회 참여 촉진 및 성평등 문화 확산</h4>
                        </div>
                        <div className={styled.missionbox}>
                            <div className={styled.visionTitle}><strong>미션</strong></div>
                            <h4>성평등한 시민 공동체 세종</h4>
                        </div>
                        <div className={styled.visionbox}>
                            <div className={styled.visionTitle}><strong>비전</strong></div>
                            <h4>자원과 정보를 잇는 성평등 가온머리(컨트롤 타워)</h4>
                        </div>
                        <div className={styled.vBox03}>
                            <ul className={styled.visionList}>
                                <li>
                                    <div>
                                        <span className={styled.icon}><img src={Vision1} alt="성장" /></span>
                                        <p>성장</p>
                                        <em>Growth</em>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={styled.icon}><img src={Vision2} alt="변화" /></span>
                                        <p>변화</p>
                                        <em>Change</em>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={styled.icon}><img src={Vision3} alt="다양성" /></span>
                                        <p>다양성</p>
                                        <em>Diversity</em>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={styled.icon}><img src={Vision4} alt="연대" /></span>
                                        <p>연대</p>
                                        <em>Solidarity</em>
                                    </div>
                                </li>
                            </ul>
                            <div className={styled.visionTitle}>
                                <strong>핵심가치</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Purpose;
