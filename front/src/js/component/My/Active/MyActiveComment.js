
import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../../../js/component/Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import Pagination from "../../../component/Common/Pagination";

export default function MyActiveComment() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [comments, setComments] = useState([]); // 게시글 데이터 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 표시할 항목 수
    const navigate = useNavigate();


    useEffect(() => {
        // 실제로 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        // memNum 상태가 변경될 때마다 fetchCommentsByMember를 호출
        if (memNum !== null) {
            fetchCommentsByMember();
        }
    }, [memNum]);

    const fetchCommentsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 댓글만 가져오도록 수정
        fetch(`${SERVER_URL}comments/member/${memNum}`)
            .then((response) => response.json())
            .then((data) => {

                // 해당 멤버의 댓글만 필터링하여 상태(State)에 저장
                const memberComments = data.filter((comment) => comment.member.memNum === memNum);
                setComments(memberComments);

                // 필터링: delYN이 'N'인 게시물만 남김
                const filteredComments = data.filter((comment) => comment.delYN === 'N');
                setComments(filteredComments);

                // 번호를 추가하여 각 행에 할당
                const commentsWithNumbers = data.map((comment, index) => ({
                    ...comment,
                    id: comment.commNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));
                setComments(commentsWithNumbers);
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const onRowClick = (params) => {
        const rowId = params.row.post.postNum;
        const boardName = params.row.post.board.boardName; // 게시글의 유형에 따른 필드 (예: type 필드)


        let targetPath = ""; // 이동할 경로 초기화

        // boardName에 따라 다른 경로 설정
        if (boardName === '공지사항') {
            targetPath = `/post/detail/${rowId}`;
        } else if (boardName === '모임 페이지') {
            targetPath = `/clubs/${rowId}`;
        } else if (boardName === '세종시 기관 및 단체 소식') {
            targetPath = `/post/detail/${rowId}`;
        } else if (boardName === '대관 이용 후기') {
            targetPath = `/rent/review/post/${rowId}`;
        } else {
            targetPath = `/post/detail/${rowId}`;
        }

        // 실제로 경로 이동
        navigate(targetPath);
    };



    const columns = [
        {
            field: "number",
            headerName: "번호",
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: "boardName", // 게시판 구분을 "boardName"으로 변경
            headerName: "구분",
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => {
                // params.row.post가 없거나 params.row.post.board가 없으면 'N/A' 반환
                if (!params.row.post || !params.row.post.board) {
                    return 'N/A';
                }

                const board = params.row.post.board;
                return board.boardName || 'N/A';
            }

        },
        {
            field: "title",
            headerName: "게시글",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

            renderCell: (params) => {
                const postTitle = params.row.post && params.row.post.title;
                const displayTitle = postTitle || 'N/A';

                return (
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => onRowClick(params)}
                    >
                        {displayTitle}
                    </div>
                );
            },
        },
        {
            field: "content",
            headerName: "댓글 내용",
            flex:1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: "delYN",
            headerName: "댓글 삭제 여부",
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',


        },
        {
            field: "writeDate",
            headerName: "작성일",
            width: 150,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => {
                //작성일을 JS Date 객체로 파싱
                const writeDate = new Date(params.value);
                //원하는 형식으로 날짜 포맷
                const formattedDate = `${writeDate.getFullYear()}-${String(writeDate.getMonth() + 1).padStart(2, '0')}-${String(writeDate.getDate()).padStart(2, '0')}`;

                return formattedDate;
            },
        },
    ].map(col => ({ ...col, sortable: false }));


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
    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div id={styles.active}>
            <div className={styles.main}>
                <h3>내가 쓴 댓글 관리</h3>
                <div
                    className={styles.posts}
                    style={{
                        maxHeight: 600,
                        height:"100%",
                        width: "100%",

                    }}
                >
                    <CustomDataGrid
                        className={styles.customDataGrid}
                        columns={columns}
                        rows={comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                        getRowId={(row) => row.commNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        autoHeight={true}
                        disableColumnMenu
                    />

                </div>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={comments.length}
                    pageRangeDisplayed={5} // 원하는 범위로 조절
                    onChange={handleChangePage}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>
    );
}


