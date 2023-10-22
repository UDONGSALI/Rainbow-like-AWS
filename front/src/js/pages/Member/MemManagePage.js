import React, {memo, useCallback, useState} from 'react';
import MemList from "../../component/Member/MemList";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from '../../layout/Header/Data/AdminHeader';
import AccessingMemberList from "../../component/Member/AccessingMemberList";
import SwiperCore, {A11y, Navigation, Pagination, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function MemManagePage() {
    const [footerTitle, setFooterTitle] = useState('회원 관리');

    const handleSlideChange = useCallback((event) => {
        const realIndex = event.realIndex;
        if (realIndex === 0) {
            setFooterTitle('회원 관리');
        } else if (realIndex === 1) {
            setFooterTitle('접속 회원');
        }
    }, []);

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                onSlideChange={handleSlideChange}
                style={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <SwiperSlide><MemList/></SwiperSlide>
                <SwiperSlide><AccessingMemberList/></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default memo(MemManagePage);
