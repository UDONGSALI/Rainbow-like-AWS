import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import FTWList from "../FTW/FTWList";
import styles from '../../../../css/pages/FT/FTpop.module.css';
import { SERVER_URL } from "../../Common/constants";



function MatchingPopup() {
    const { ftcNum } = useParams();
    const [post, setPost] = useState([]);
    const [checkedRows, setCheckedRows] = useState({}); // checkedRows를 상태로 관리

    const onClosePopup = () => {
        window.close()
    };
    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = () => {
        fetch(SERVER_URL + "ftc/" + ftcNum)
            .then(response =>
                response.json())
            .then(data =>
                setPost(data))
            .catch(err => console.error(err));
    };

    const onMatchingClick = () => {
        if (Object.keys(checkedRows).length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        // 모든 비동기 작업을 저장할 배열
        const matchPromises = [];

        for (const key in checkedRows) {
            if (checkedRows.hasOwnProperty(key)) { // 객체 자체의 속성인지 확인
                const matchPromise = onMatch(key);
                matchPromises.push(matchPromise);
            }
        }

        // Promise.all을 사용하여 모든 비동기 작업이 완료될 때까지 기다림
        Promise.all(matchPromises)
            .then(() => {
                upDateFtmYN();
                ftmSms();
                alert('매칭을 완료했습니다.');
                onClosePopup();
            })
            .catch((error) => {
                alert('에러가 발생했습니다.');
                console.error('매칭 중 오류 발생:', error);
            });
    };

    const onMatch = (ftwNum) => {
        const postData = {
            ftWorkerNum: ftwNum,
            ftConsumerNum: ftcNum
        };

        return fetch(SERVER_URL + "ftm/new/", {
            method: 'POST', // POST 요청을 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })

            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }

    const upDateFtmYN = () => {
        const postData = {
            memNum: post.member.memNum,
            speField: post.ftc.speField,
            applyContent: post.ftc.applyContent,
            statusDtl: post.ftc.statusDtl,
            ftmYN: 'Y'
        };

        return fetch(SERVER_URL + "ftc/edit/" + ftcNum, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }

    const ftmSms = () =>{
        return fetch(SERVER_URL + "sms/ftmsms/" + ftcNum, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }


    return (
        <div style={{backgroundColor:'white'}}>
        <div className={styles.FTList}>
            <FTWList ftcNum={ftcNum} checkedRows={checkedRows} setCheckedRows={setCheckedRows} />

        </div>
            <div className={styles.FTList}>
                <button onClick={onClosePopup}>닫기</button>
                <button onClick={onMatchingClick}>매칭하기</button>
            </div>
        </div>
    );
}

export default MatchingPopup;
