import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";
import useFetch from "../../hook/useFetch";
import Pagination from "../../Common/Pagination";

export default function MyCounselList({memNum}) {
    const [counsels, setCounsels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 표시할 항목 수
    const navigate = useNavigate();
    const deleteItem = useDelete(SERVER_URL);

    const {data: fetchedCounsels, loading} = useFetch(`${SERVER_URL}post/memberCounsel/${memNum}`);


    useEffect(() => {
        if (!loading) {
            // Post 객체에 type 속성 설정
            fetchedCounsels.forEach(post => {
                switch (post.board.boardNum) {
                    case 7:
                        post.type = '노무 상담';
                        break;
                    case 8:
                        post.type = '온라인 상담';
                        break;
                    default:
                        break;
                }
            });

            const primaryCounsels = fetchedCounsels.filter(post => !post.parentsNum).sort((a, b) => b.postNum - a.postNum);

            const replyMap = fetchedCounsels.reduce((acc, post) => {
                if (post.parentsNum) {
                    if (!acc[post.parentsNum]) {
                        acc[post.parentsNum] = [];
                    }
                    acc[post.parentsNum].push(post);
                }
                return acc;
            }, {});

            const sortedCounsels = [];

            primaryCounsels.forEach(primaryCounsel => {
                sortedCounsels.push(primaryCounsel);
                if (replyMap[primaryCounsel.postNum]) {
                    sortedCounsels.push(...replyMap[primaryCounsel.postNum]);
                }
            });

            setCounsels(sortedCounsels);
        }
    },[loading, fetchedCounsels, memNum]);
    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        const boardNum = params.row.board.boardNum;
        navigate(`/post/detail/${boardNum}/${rowId}`);
    };

    function convertEnumToKorean(enumValue) {
        if (enumValue === "APPROVE") {
            return "승인";
        } else if (enumValue === "REJECT") {
            return "거부";
        } else if (enumValue === "COMPLETE") {
            return "완료";
        } else if (enumValue === "EDU") {
            return "교육";
        } else if (enumValue === "BUSINESS") {
            return "사업";
        } else {
            return "대기";
        }
    };

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const columns = [
        {
            field: "postNum",
            headerName: "번호",
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: "type",
            headerName: "구분",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: "title",
            headerName: "제목",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            headerAlign: 'center',
            renderCell: (params) => {

                const postTitle = params.row.title


                return (
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => onRowClick(params)}
                    >
                        {params.row.parentsNum ? "ㄴ [답글] " : ""}{params.row.title}
                    </div>
                );
            }

        },
        {
            field: "writeDate",
            headerName: "등록 일시",
            width: 200,
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

    ];

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
        <div id={styles.active}>
            <div className={styles.main}>
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
                        rows={counsels}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.postNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        pagination={true}
                        autoHeight={true}

                    />
                </div>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={counsels.length}
                    pageRangeDisplayed={5} // 원하는 범위로 조절
                    onChange={handleChangePage}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>
    );
}
;
