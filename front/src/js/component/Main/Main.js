import React, {memo, useEffect, useState} from 'react';
import styles from '../../../css/component/Main/Main.module.css';
import ImgContainer from "./Img/ImgContainer";
import EduContainer from "./Edu/EduContainer";
import RentContainer from "./Rent/RentContainer";
import TalentContainer from "./Talent/TalentContainer";
import { Element, scroller } from 'react-scroll';

function Main() {
    const [currentSlide, setCurrentSlide] = useState('imgContainer');

    const slideOrder = ['imgContainer', 'eduContainer', 'rentContainer', 'talentContainer'];

    const scrollToElement = (elementName) => {
        scroller.scrollTo(elementName, {
            duration: 50,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
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

    const preventDrag = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const mainDiv = document.querySelector(`.${styles.Main}`);
        mainDiv.addEventListener('wheel', handleScroll, { passive: false });
        mainDiv.addEventListener('mousedown', preventDrag, { passive: false });

        scrollToElement('imgContainer');

        return () => {
            mainDiv.removeEventListener('wheel', handleScroll);
            mainDiv.removeEventListener('mousedown', preventDrag);
        };
    }, []);

    return (
        <div className={styles.Main}>
            {slideOrder.map((slide, index) => {
                const Component = slide === 'imgContainer' ? ImgContainer :
                    slide === 'eduContainer' ? EduContainer :
                        slide === 'rentContainer' ? RentContainer :
                            TalentContainer;
                return (
                    <Element key={index} name={slide} id={slide} className={slide !== 'imgContainer' ? styles.slide : ''} onWheel={handleScroll}>
                        <Component />
                    </Element>
                )
            })}

            <div className={styles.dotIndicator}>
                {slideOrder.map((slide, index) => (
                    <div key={index} className={`${styles.dot} ${currentSlide === slide ? styles.dotActive : styles[`dot${slide.charAt(0).toUpperCase() + slide.slice(1)}`]}`}></div>
                ))}
            </div>
        </div>
    );
};

export default memo(Main);