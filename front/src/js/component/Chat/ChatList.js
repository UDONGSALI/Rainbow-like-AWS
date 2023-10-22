import styles from "../../../css/component/Club/ClubList.module.css"
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";
import CustomDataGrid from "../Common/CustomDataGrid";

function ChatList(){
    const [chats, setChats] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const memId = sessionStorage.getItem("memId");
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";




    const columns = [

        {
            field: 'chatRoom',
            headerName: '문의목록',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

            valueGetter: (params) => {
                const members = Array.isArray(params.row.chatRoom) ? params.row.chatRoom : [params.row.chatRoom];
                return members.map((m) => m.chatRoomId).join(', ');
            }
        },

        {
            field: 'member',
            headerName: '작성자',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            }
        },
        {
            field: 'content',
            headerName: '최근 글',
            width: 450,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            flex: 1,

            renderCell: (params) => (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: 'answerYN',
            headerName: '완료 여부',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

            renderCell: (params) => {
                switch (params.row.chatRoom.answerYN) {
                    case 'Y':
                        return "완료";
                    case 'N':
                        return "대기";
                }
            }
        },
        {
            field: '_links.self.href',
            headerName: '문의 완료',
            sortable: false,
            filterable: false,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

            renderCell: (params) => (
                <div className={styles.btn}>
                <button
                    onClick={() => onAnswerClick(params.row)}
                >
                    완료
                </button>
                    </div>
            ),
        }

    ];


    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = () => {
        fetch(SERVER_URL + "chat")
            .then((response) => response.json())
            .then((data) => {
                const uniqueChats = data.reduce((unique, chat) => {
                    const existingChat = unique.find((c) => c.chatRoom.chatRoomId === chat.chatRoom.chatRoomId);
                    if (!existingChat || chat.chatNum > existingChat.chatNum) {
                        if (!existingChat) {
                            unique.push(chat);
                        } else {
                            existingChat.chatNum = chat.chatNum;
                            existingChat.content = chat.content;
                            existingChat.answerYN = chat.answerYN;
                        }
                    }
                    return unique;
                }, []);

                // chats 배열을 chatNum에 따라 정렬
                uniqueChats.sort((a, b) => b.chatNum - a.chatNum);

                setChats(uniqueChats);
            })
            .catch((err) => console.error(err));
    };

    const onRowClick = (params) => {
        const rowId = params.row.chatRoom.member.memNum;
        const width = 400;
        const height = 700;

        // Calculate the top and left positions for the center of the screen.
        const top = (window.innerHeight / 2) - (height / 2) + window.screenY;
        const left = (window.innerWidth / 2) - (width / 2) + window.screenX;

        // Use those calculated positions in the window.open function.
        const popupWindow = window.open(
            `/chat/${rowId}`,
            '_blank',
            `width=${width},height=${height},top=${top},left=${left}`
        );
        // <Chatting />
    };


    function onAnswerClick(row) {

        const answerYNCheck = {
            memNum : row.member.memNum,
            answerYN : 'Y'
        }
        const chatRoomId = row.chatRoom.chatRoomId;

        fetch(SERVER_URL + "chatroom/edit/" + chatRoomId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answerYNCheck),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('상담이 완료되었습니다.');
                fetchChats();
            })
            .catch((error) => {
                // 오류 처리
                console.error('Error:', error);
            });
    }

    function CustomNoRowsOverlay() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                }}
            >
                <p>데이터가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className={styles.List} style={{ height: 500, width: "100%" }}>
            <CustomDataGrid
                className={styles.customDataGrid}
                columns={columns}
                rows={chats}
                disableRowSelectionOnClick={true}
                getRowId={(row) => row.chatNum}
                pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay
                }}
                pagination={true}
                sortModel={[
                    {
                        field: "number",
                        sort: "desc", // 내림차순 정렬
                    },
                ]}
            />

        </div>
    );
}
export default ChatList;