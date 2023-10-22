import React, {useRef, useState, useCallback} from 'react';
import SwiperCore, {Autoplay, EffectFade, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from '../../../../css/component/Main/Img/ImgContainer.module.css';
import heart from '../../../../img/component/Main/heart.jpg';
import club from '../../../../img/component/Main/club.jpg';
import edu from '../../../../img/component/Main/edu.jpg';
import office from '../../../../img/component/Main/office.jpg';
import rent from '../../../../img/component/Main/rent.png';
import styled from "@emotion/styled";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

function ImgContainer() {

    const SLIDE_CONTENTS = [
        {
            text: ["세종에", "교육이", "활•◡•짝", "교육 신청"],
            link: "/edu/list"
        },
        {
            text: ["만남의", "문ㅤ이", "활•◡•짝", "대관 신청"],
            link: "/rent/status"
        },
        {
            text: ["여성의", "날개가", "활•◡•짝", "여성 인재풀"],
            link: "/ftmain"
        },
        {
            text: ["이웃과", "소통이", "활•◡•짝", "소모임"],
            link: "/clubsMain"
        },
        {
            text: ["엄마의", "웃음이", "활•◡•짝", "지원 센터"],
            link: "/csl/7"
        },
    ];

    const [isPlaying, setIsPlaying] = useState(true); // 오토플레이 상태를 나타내는 state
    const swiperRef = useRef(null); // Swiper 인스턴스를 참조하는 ref
    const [activeIndex, setActiveIndex] = useState(0); // 현재 활성 슬라이드의 인덱스

    const toggleAutoplay = useCallback(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            if (isPlaying) {
                swiperRef.current.swiper.autoplay.stop();
            } else {
                swiperRef.current.swiper.autoplay.start();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const handleGotoClick = useCallback((link) => {
        window.location.href = link;
    }, []);

    function AnimatedText({text, className, style}) {
        return <span className={className} style={style}>{text}</span>;
    }

    return (
        <div>
            <StyledSwiper
                ref={swiperRef}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{clickable: true, el: '.swiper-pagination', type: 'bullets'}}
                loop={true}
                loopedSlides={5}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                speed={1000}  // fade 효과 속도 조절
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex % SLIDE_CONTENTS.length)}
            >
                <SwiperSlide><img src={edu} alt="교육" className={styles.fullscreenImage}/></SwiperSlide>
                <SwiperSlide><img src={rent} alt="공간" className={styles.fullscreenImage}/></SwiperSlide>
                <SwiperSlide><img src={office} alt="인재풀" className={styles.fullscreenImage}/></SwiperSlide>
                <SwiperSlide><img src={club} alt="소모임" className={styles.fullscreenImage}/></SwiperSlide>
                <SwiperSlide><img src={heart} alt="직장맘" className={styles.fullscreenImage}/></SwiperSlide>
            </StyledSwiper>
            <div className={styles.textArea}>
                <AnimatedText text={SLIDE_CONTENTS[activeIndex].text[0]} className={styles.fade1}
                              key={`text1-${activeIndex}`}/><br/>
                <AnimatedText text={SLIDE_CONTENTS[activeIndex].text[1]} className={styles.fade2}
                              key={`text2-${activeIndex}`}/><br/>
                <AnimatedText style={{letterSpacing: '2.4px'}} text={SLIDE_CONTENTS[activeIndex].text[2]}
                              className={styles.fade3} key={`text3-${activeIndex}`}/>
                <div className={styles.gotoText}>
                    <span
                        onClick={() => handleGotoClick(SLIDE_CONTENTS[activeIndex].link)}>{`${SLIDE_CONTENTS[activeIndex].text[3]} 바로가기 ➦`}</span>
                </div>
            </div>
            <div className={styles.index}>{activeIndex+1} / {SLIDE_CONTENTS.length}</div>
            <PausePlayButton onClick={toggleAutoplay}>
                {isPlaying ? <PauseIcon/> : '▶'}
            </PausePlayButton>
        </div>
    );
}

const StyledSwiper = styled(Swiper)`

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px;
    color: white;
  }

  .swiper-button-next::after {
    content: '❯';
  }

  .swiper-button-prev::after {
    content: '❮';
  }

  .swiper-button-next, .swiper-button-prev {
    position: absolute;
    top: 83%;
  }

  .swiper-button-next {
    right: 75%;
    transform: translate(-50%, -50%);
  }

  .swiper-button-prev {
    left: 12%;
    transform: translate(-50%, -50%);
  }

  .swiper-slide img {
    transform: scale(1.07); // 초기 확대 상태
    transition: transform 1s; // 확대/축소 애니메이션
  }

  .swiper-slide-active img {
    transform: scale(1); // 활성 슬라이드는 원래 크기로
  }
`;

const PausePlayButton = styled.button`
  position: absolute;
  width: 35px;
  height: 35px;
  top: 80.7%;
  left: 20%;
  transform: translate(-50%, -50%);
  z-index: 1000; // 높은 z-index 값으로 다른 요소 위에 표시
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경색
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  padding-bottom: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const PauseIcon = styled.div`
  display: inline-block;

  &::before, &::after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 10px;
    background-color: white;
    vertical-align: middle;
  }

  &::before {
    margin-right: 5px; // 작대기 사이의 거리 조절
  }
`;

export default React.memo(ImgContainer);
