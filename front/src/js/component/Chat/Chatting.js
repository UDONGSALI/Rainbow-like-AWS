import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../css/component/Chat/Chat.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "../Common/constants";
import { io } from "socket.io-client";

const webSocket = io("http://localhost:5000");

function Chatting({ param }) {
    const [chatData, setChatData] = useState([]);
    const [roomData, setRoomData] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const { memNum } = useParams();
    const isMemNum = sessionStorage.getItem("memNum");
    const memId = sessionStorage.getItem("memId");
    const scrollContainerRef = useRef(null);
    const [chatRoomId, setChatRoomId] = useState('');
    const [answerYN, setAnswerYN] = useState('');
    const [chatDataChangedCount, setChatDataChangedCount] = useState(0);


    const [chatForm, setChatForm] = useState({
        chatRoomId: chatRoomId,
        memNum: isMemNum,
        content: '',
    });

    useEffect(() => {
        fetchChatData();
        fetchRoomData();
        setChatForm({
            chatRoomId: chatRoomId,
            memNum: isMemNum,
            content: '',
        });
        webSocket.emit("login", { userId: isMemNum, roomNumber: memNum });
        console.log(answerYN);
        scrollToBottom();

        console.log(chatRoomId);
    }, [chatRoomId]);

    useEffect(() => {
        setChatDataChangedCount(chatDataChangedCount + 1);
        if(chatDataChangedCount === 2){
            hello(chatData);
        }
    }, [chatData]);

    const fetchChatData = () => {
        fetch(SERVER_URL + "findchatbymem/" + memNum)
            .then(response => response.json())
            .then(data => {
                setChatData(data);
                scrollToBottom();
            })
            .catch(err => console.error(err));
    };

    const fetchRoomData = () => {
        fetch(SERVER_URL + "chatroom/" + memNum)
            .then(response => response.json())
            .then(data => {
                setRoomData(data[0]);
                setChatRoomId(data[0].chatRoomId);
                setAnswerYN(data[0].answerYN);
                scrollToBottom();
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (!webSocket) return;
        function sMessageCallback(msg) {
            const { data, id, target } = msg;
            setChatHistory((prev) => [
                ...prev,
                {
                    msg: data,
                    id: id,
                },
            ]);
        }
        webSocket.on("sMessage", sMessageCallback);
        return () => {
            webSocket.off("sMessage", sMessageCallback);
        };
    }, []);

    useEffect(() => {
        if (!webSocket) return;
        function sLoginCallback(msg) {}
        webSocket.on("sLogin", sLoginCallback);
        return () => {
            webSocket.off("sLogin", sLoginCallback);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const hello = (chatData) => {
        if (Array.isArray(chatData) && chatData.length === 0) {
            const newChatHistory = [...chatHistory, { msg: `반갑습니다, ${memId}님! 무엇이 궁금하신가요?`, isUser: false }];
            setChatHistory(newChatHistory);
        }else if(answerYN === 'Y'){
            const newChatHistory = [...chatHistory, { msg: `상담이 종료되었습니다. 감사합니다.`, isUser: false }];
            setChatHistory(newChatHistory);
        }
    };

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setChatForm({ ...chatForm, [name]: value });
    };

    const handleUserMessageSubmit = (e) => {
        // e.preventDefault();

        fetch(SERVER_URL + 'chat/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chatForm),
        })
            .then((response) => response.json())
            .then((data) => {
                setChatForm({
                    chatRoomId: chatRoomId,
                    memNum: isMemNum,
                    content: '',
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        if(answerYN === 'Y'){
            const roomForm = {
                memNum: memNum,
                answerYN: 'N',
            }
            fetch(SERVER_URL + 'chatroom/edit/' + chatRoomId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomForm),
            })
                .then((response) => response.json())
                .then((data) => {
                   fetchRoomData();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        if (userMessage.trim() === '') return;

        const newChatHistory = [
            ...chatHistory,
            { msg: userMessage, isUser: true },
        ];
        const sendData = {
            data: userMessage,
            id: isMemNum,
            roomNumber: memNum
        };
        webSocket.emit("message", sendData);
        setChatHistory((prev) => [...prev, { msg: userMessage, type: styles.user, id: isMemNum }]);
        setUserMessage('');
        setChatHistory(newChatHistory);
    };

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUserMessageSubmit();
        }
    };


    if (memNum === isMemNum || isAdmin) {
        return (
            <div className={styles.chatbotContainer}>
                <div className={styles.chatHistory}
                     ref={scrollContainerRef}
                     style={{
                         overflowY: 'auto',
                         height: '600px'
                     }}>
                    {chatData.map((message, index) => {
                        return (
                            <div
                                key={index}
                                className={`${styles.message} ${
                                    message.member.memNum.toString() === isMemNum ? styles.user : styles.bot
                                }`}
                            >
                                {message.content}
                            </div>
                        );
                    })}

                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`${styles.message} ${
                                message.isUser ? styles.user : styles.bot
                            }`}
                        >
                            {message.msg}
                        </div>
                    ))}
                </div>

                <div className={styles.userInput}>
                    <input
                        type="text"
                        placeholder="메시지 입력..."
                        value={userMessage && chatForm.content}
                        onChange={(e) => {
                            setUserMessage(e.target.value);
                            setChatForm({ ...chatForm, content: e.target.value });
                        }}
                        onKeyDown={handleOnKeyPress}
                    />
                    <button onClick={handleUserMessageSubmit}>보내기</button>
                </div>
            </div>
        );
    }
    return (<div><h1>잘못된 접근입니다.</h1></div>);
}

export default Chatting;
