import React, {memo, useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {SERVER_URL} from "../../component/Common/constants";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import BoardPostList from "../../component/Board/BoardPostList";
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function BoardPostListPage() {
    const initialBoardNum = useParams().boardNum;
    const [boardNum, setBoardNum] = useState(initialBoardNum);
    const [boardName, setBoardName] = useState("");

    useEffect(() => {
        fetch(`${SERVER_URL}api/boards/${boardNum}`)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                setBoardName(data.boardName);
            })
            .catch(error => {
                console.error('Error fetching board name:', error);
            });
    }, [boardNum]);

    const handleSlideChange = useCallback((swiper) => {
        const newBoardNum = swiper.realIndex + 1;
        if (newBoardNum <= 9) {
            setBoardNum(newBoardNum.toString());
        } else {
            swiper.slideTo(0, 0);
            setBoardNum("1");
        }
    }, []);

    const slides = Array.from({ length: 9 }, (_, index) => (
        <SwiperSlide key={index}>
            <BoardPostList boardNum={index + 1} />
        </SwiperSlide>
    ));

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={boardName}/>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                onSlideChange={handleSlideChange}  // 슬라이드 변경 시 호출될 핸들러 함수
                initialSlide={parseInt(boardNum) - 1}  // 초기 슬라이드 설정
                style={{
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <SwiperSlide>
                    <BoardPostList boardNum={1}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={2}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={3}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={4}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={5}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={6}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={7}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={8}/>
                </SwiperSlide>
                <SwiperSlide>
                    <BoardPostList boardNum={9}/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default memo(BoardPostListPage);