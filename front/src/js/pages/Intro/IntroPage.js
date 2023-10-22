import React, { useEffect, useState } from 'react';
import Purpose from '../../component/Intro/Purpose';
import SpaceIntro from '../../component/Intro/SpaceIntro';
import Greeting from "../../component/Intro/Greeting";
import styles from '../../../css/pages/Intro/IntroPage.module.css';
import AgenHistory from "../../component/Intro/AgenHistory";
import MapComponent from "../../component/Intro/Map/MapComponent";
import { Element } from 'react-scroll';
import { useLocation } from "react-router-dom";

function IntroPage() {
    const [currentSlide, setCurrentSlide] = useState('Greeting');
    const location = useLocation();

    const slideComponents = {
        'Greeting': Greeting,
        'Purpose': Purpose,
        'AgenHistory': AgenHistory,
        'SpaceIntro': SpaceIntro,
        'MapComponent': MapComponent
    };

    const slideOrder = Object.keys(slideComponents);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const slide = params.get('slide');
        if (slide && slideComponents[slide]) {
            scrollToElement(slide);
        }
    }, [location.search]);

    const scrollToElement = (slideName) => {
        const element = document.getElementById(slideName);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScroll = (e) => {
        e.preventDefault();
        const direction = (e.deltaY > 0) ? 'down' : 'up';
        const currentId = e.currentTarget.id;
        const currentIndex = slideOrder.indexOf(currentId);

        let nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1;

        if (nextIndex >= 0 && nextIndex < slideOrder.length) {
            const nextSlide = slideOrder[nextIndex];
            setCurrentSlide(nextSlide);
            scrollToElement(nextSlide);
        }
    };

    useEffect(() => {
        const mainDiv = document.querySelector(`.${styles.Intro}`);
        mainDiv.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            mainDiv.removeEventListener('wheel', handleScroll);
        };
    }, []);

    return (
        <div className={styles.Intro}>
            {slideOrder.map(slideName => (
                <Element
                    key={slideName}
                    name={slideName}
                    id={slideName}
                    className={styles.slide}
                    onWheel={handleScroll}
                >
                    {React.createElement(slideComponents[slideName])}
                </Element>
            ))}

            <div className={styles.dotIndicator}>
                {slideOrder.map(slideName => (
                    <div
                        key={slideName}
                        className={`${styles.dot} ${currentSlide === slideName ? styles.dotActive : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default IntroPage;
