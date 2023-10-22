import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../css/component/Chat/Chat.module.css';
import { SERVER_URL } from '../Common/constants';
import {useNavigate} from "react-router-dom";
import Chatting from "./Chatting";

function ChatBot() {
    const [qnaData, setQnaData] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [userMessage, setUserMessage] = useState('');
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const memNum = sessionStorage.getItem("memNum");
    const scrollContainerRef = useRef(null);
    const [room, setRoom] = useState([]);



    useEffect(() => {
        // 서버에서 Q&A 데이터를 가져오는 함수
        const fetchQnaData = () => {
            fetch(SERVER_URL + "cbot")
                .then(response =>
                    response.json())
                .then(data =>
                    setQnaData(data))
                .catch(err => console.error(err));
        };

        fetchQnaData();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    useEffect(() => {
        const newChatHistory = [...chatHistory, { text: "반갑습니다! 무엇을 도와드릴까요?", isUser: false }];
        setChatHistory(newChatHistory);

    }, []);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };


    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedTitle(null); // 카테고리를 선택하면 선택한 타이틀 초기화
        const newChatHistory = [...chatHistory, { text: category, isUser: true }];
        setChatHistory(newChatHistory);

    };

    const handleTitleClick = (title, content) => {
        setSelectedTitle(title);
        const newChatHistory = [
            ...chatHistory,
            { text: title, isUser: true },
        ];

        if (content) {
            newChatHistory.push({ text: content, isUser: false });
        }

        setTimeout(() => {
            setChatHistory(newChatHistory);
        }, 100)

    };

    const handleGoBack = () => {
        // '뒤로 가기' 버튼 클릭 시 선택한 카테고리와 타이틀 초기화
        setSelectedCategory(null);
        setSelectedTitle(null);

    };

    const handleGoRealTime = () => {
        if (memNum === null) {
            alert('로그인 후 사용 가능합니다.');
        } else {
            // 개인채팅방이 있는지 확인
            fetch(SERVER_URL + "chatroom/" + memNum)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data) && data.length !== 0) {
                        navigate(`/chat/${memNum}`);
                    } else {
                        const roomData = {
                            memNum: memNum,
                            answerYN: 'N'
                        };
                        fetch(SERVER_URL + 'chatroom/new', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(roomData),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                // setTimeout 함수를 사용하여 3초 대기 후 navigate를 호출
                                setTimeout(() => {
                                    navigate(`/chat/${memNum}`);
                                }, 1000);
                            })
                            .catch((error) => {
                                // 오류 처리
                                console.error('Error:', error);
                            });
                    }
                })
                .catch(err => console.error(err));
        }
    }


    const handleUserMessageSubmit = () => {
        if (userMessage.trim() === '') return;

        const newChatHistory = [
            ...chatHistory,
            { text: userMessage, isUser: true },
        ];

        setUserMessage('');
        setChatHistory(newChatHistory);

    };

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            handleUserMessageSubmit();
        }
    };

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.chatHistory}
                 ref={scrollContainerRef}
                 style={{
                     overflowY: 'auto',
                     height: '400px' // 스크롤이 필요한 높이로 설정
                 }}>
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            message.isUser ? styles.user : styles.bot
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className={styles.qnaList}>
                {selectedCategory
                    ? qnaData
                        .filter((item) => item.resCtgr === selectedCategory)
                        .map((qna) => (
                            <div
                                key={qna.cbotResNum}
                                onClick={() => handleTitleClick(qna.resTitle, qna.resContnet)}

                                className={styles.qnaItem} >
                                {qna.resTitle}
                            </div>
                        ))
                    : qnaData
                        .reduce((categories, qna) => {
                            if (!categories.includes(qna.resCtgr)) {
                                categories.push(qna.resCtgr);
                            }
                            return categories;
                        }, [])
                        .map((category) => (
                            <div
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={styles.qnaItem}
                            >
                                {category}
                            </div>
                        ))}
                <div
                    onClick={handleGoRealTime}
                    className={`${styles.qnaItem}`}
                >
                    톡으로 문의
                </div>
                {selectedCategory && (
                    <div
                        onClick={handleGoBack}
                        className={`${styles.qnaItem}`}
                    >
                        뒤로 가기
                    </div>

                )}


            </div>
            <div className={styles.userInput}>
                <input
                    type="text"
                    placeholder="메시지 입력..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleOnKeyPress}
                />
                <button onClick={handleUserMessageSubmit}>보내기</button>
            </div>
        </div>
    );
}

export default ChatBot;
