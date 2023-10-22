import { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import { SERVER_URL } from "../../Common/constants";
import styles from "../../../../css/component/Main/Talent/TalentContainer.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

function TalentSwiper({ data, accessor, filterCondition, keyExtractor, contentExtractor }) {
    const navigate = useNavigate();

    const handleSlideClick = () => {
        navigate("/ftmain");
    };

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            autoplay={{
                delay: 1000,
                reverseDirection: accessor === 'ftw',
            }}
            speed={1000}
            loopedSlides={data.length}
            onClick={handleSlideClick}
            style={{ cursor: "pointer" }}
        >
            {data.filter(filterCondition).map(item => (
                <SwiperSlide key={keyExtractor(item)}>
                    <div className={styles.item}>
                        분야 : <strong>{item.speField}</strong>
                        <div>
                            <p className={styles.marginTop}>{contentExtractor(item)}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

function TalentContainer() {
    const [ftc, setFtc] = useState([]);
    const [ftw, setFtw] = useState([]);
    const { data: fetchedFtc, loadingFtc } = useFetch(`${SERVER_URL}ftc`);
    const { data: fetchedFtw, loadingFtw } = useFetch(`${SERVER_URL}ftw`);

    useEffect(() => {
        if (!loadingFtc) {
            setFtc(fetchedFtc.filter(item => !item.statusDtl));
        }
    }, [loadingFtc, fetchedFtc]);

    useEffect(() => {
        if (!loadingFtw) {
            setFtw(fetchedFtw.filter(item => item.ftStatus === "승인"));
        }
    }, [loadingFtw, fetchedFtw]);

    return (
        <div className={styles.container}>
            <div className={styles.itemComponent}>
                <div className={styles.header}>
                    <h2>인재를 찾고 있어요</h2>
                    <h1>여성 인재풀 DB를 이용해 보세요!</h1>
                </div>
                <TalentSwiper
                    data={ftc}
                    accessor="ftc"
                    filterCondition={item => !item.statusDtl}
                    keyExtractor={item => item.ftConsumerNum}
                    contentExtractor={item => item.applyContent}
                />
                <div className={styles.header}>
                    <h2>인재가 준비하고 있어요</h2>
                </div>
                <TalentSwiper
                    data={ftw}
                    accessor="ftw"
                    filterCondition={item => !item.statusDtl}
                    keyExtractor={item => item.ftWorkerNum}
                    contentExtractor={item => item.ftDtl}
                />
            </div>
        </div>
    );
}

export default TalentContainer;
