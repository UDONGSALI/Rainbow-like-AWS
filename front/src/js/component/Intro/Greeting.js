import greetImg from '../../../img/component/Intro/greeting_img.png';
import styled from '../../../css/component/Intro/Greeting.module.css';
function Greeting(){

    return (
        <div className={styled.FullContainer}>
            <section id={styled.contentWrap}>
                <div className={styled.fullLayout }>
                    <header id={styled.subTit}>
                        <h3>인사말</h3>
                    </header>
                    <div className={styled.greeting}>
                        <div className={styled.greetingImg}>
                            <img src={greetImg} alt={'xx'} />
                        </div>
                        <div className={styled.greetingTxt} >
                            <h4>세종여성플라자 이곳에서 여성들의 <br/><strong>
                                <span className={styled.highLight}>날개가 활짝,만남의 문이 활짝,</span>
                                <br/>
                                <span className={styled.highLight}>웃음이 활짝,성평등이 활짝</span>
                                <br/>
                            </strong> 피어나도록 함께 하고 싶습니다.
                            </h4>
                            <p>세종여성플라자는 여성들의 사회참여를 돕고 지역사회에
                                성평등 문화가 정착되도록 여성정책의 중심역할을 하기 위해 2022년에
                                설립된 기관입니다.
                            </p>
                            <p>시민들께 인권과 평등에 대한 교육, 문화 활동과 여성·가족 관련
                                정보제공 플랫폼으로서 역할을 하고 있습니다. 아울러 지역에 필요한
                                정책을 발굴하고 제안하기 위해 여성·가족 관련 기관·단체들의
                                네트워크를 운영하면서 연대와 협력의 중심역할을 하고 있습니다.
                            </p>
                            <p>우리 지역에서 평등의 가치를 고민하고 실현해가는 곳으로서 남녀노소
                                누구에게나 열려있는 곳입니다. 시민들께서 모이고, 공부하고,
                                실험하고, 즐기실 수 있기를 바랍니다. 그리고 성별에 상관없이
                                동등하게 일할 권리, 돌볼 권리, 참여의 권리를 누릴 수 있도록
                                여러분께서 다시 정책의 주체로서 다양한 제안 활동에 참여해주십시오.
                                세종여성플라자가 시민의 의견을 수렴하고 정책제안을 하는 창구로서
                                역할을 다하겠습니다.
                            </p>
                            <p>세종여성플라자를 통해 세종에 성평등이 활짝,
                                만남의 문이 활짝, 연대와 협력의 기회가 활짝,
                                여성의 날개가 활짝 펼쳐지길 바랍니다. 감사합니다.
                            </p>
                            <p className={styled.dFName}>세종여성플라자 대표 <span>홍만희</span></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Greeting;