import React, { useRef, useEffect, useState } from "react";
import styles from './chattest.module.css'
import { io } from "socket.io-client";

const webSocket = io("http://localhost:5000");

function ChatTestPage() {

    const messagesEndRef = useRef(null);
    const [userId, setUserId] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const [privateTarget, setPrivateTarget] = useState("");
    const [roomNumber, setRoomNumber] = useState("1");

    useEffect(() => {
        if (!webSocket) return;
        function sMessageCallback(msg) {
            // 2
            const { data, id, target } = msg;
            setMsgList((prev) => [
                ...prev,
                {
                    msg: data,
                    type: target ? styles.private : styles.other,
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
        function sLoginCallback(msg) {
            setMsgList((prev) => [
                ...prev,
                {
                    msg: `${msg.userId} joins the chat`,
                    type: styles.welcome,
                    id: "",
                },
            ]);
        }
        webSocket.on("sLogin", sLoginCallback);
        return () => {
            webSocket.off("sLogin", sLoginCallback);
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [msgList]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        webSocket.emit("login", { userId: userId, roomNumber: roomNumber });
        setIsLogin(true);
    };

    const onChangeUserIdHandler = (e) => {
        setUserId(e.target.value);
    };

    const onSendSubmitHandler = (e) => {
        e.preventDefault();

        // 3
        const sendData = {
            data: msg,
            id: userId,
            target: privateTarget,
            roomNumber: roomNumber
    };
        webSocket.emit("message", sendData);
        setMsgList((prev) => [...prev, { msg: msg, type: styles.me, id: userId}]);
        setMsg('');
    };

    const onChangeMsgHandler = (e) => {
        setMsg(e.target.value);
    };

    // 4
    const onSetPrivateTarget = (e) => {
        const { id } = e.target.dataset;
        setPrivateTarget((prev) => (prev === id ? "" : id));
    };

    const onRoomChangeHandler = (e) => {
        setRoomNumber(e.target.value);
    };

    return (
        <div className={styles.appContainer}>
            <div className={styles.wrap}>
                {isLogin ? (
                    <div className={styles.chatBox}>
                        <h3>Login as a "{userId}" in Room {roomNumber}</h3>
                        <ul className={styles.chat}>
                            {msgList.map((v, i) =>
                                v.type === styles.welcome ? (
                                    <li className={styles.welcome}>
                                        <div className={styles.line} />
                                        <div>{v.msg}</div>
                                        <div className={styles.line} />
                                    </li>
                                ) : (
                                    <li
                                        className={v.type}
                                        key={`${i}_li`}
                                        name={v.id}
                                        data-id={v.id}
                                        onClick={onSetPrivateTarget}
                                    >
                                        <div
                                            className={
                                                v.id === privateTarget ? styles.privateUser : styles.userId
                                            }
                                            data-id={v.id}
                                            name={v.id}
                                        >
                                            {v.id}
                                        </div>
                                        <div className={v.type} data-id={v.id} name={v.id}>
                                            {v.msg}
                                        </div>
                                    </li>
                                )
                            )}
                            <li ref={messagesEndRef} />
                        </ul>
                        <form className={styles.sendForm} onSubmit={onSendSubmitHandler}>
                            {privateTarget && (
                                <div className={styles.privateTarget}>{privateTarget}</div>
                            )}
                            <input
                                placeholder="Enter your message"
                                onChange={onChangeMsgHandler}
                                value={msg}
                            />
                            <button type="submit">send</button>
                        </form>
                    </div>
                ) : (
                    <div className={styles.loginBox}>
                        <div className={styles.loginTitle}>
                            <div>IOChat</div>
                        </div>
                        <form className={styles.loginForm} onSubmit={onSubmitHandler}>
                            <select onChange={onRoomChangeHandler}>
                                <option value="1">Room 1</option>
                                <option value="2">Room 2</option>
                            </select>
                            <input
                                placeholder="Enter your ID"
                                onChange={onChangeUserIdHandler}

                                value={userId}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatTestPage;
