import {SERVER_URL} from "../../Common/constants";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomDataGrid from "../../Common/CustomDataGrid";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import Pagination from "../../Common/Pagination";

export default function RentReviewList() {
    const [rentReviews, setRentReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // 페이지당 표시할 항목 수
    const navigate = useNavigate();

    useEffect(() => {
        fetchRentReviewPosts();
    }, []);

    const fetchRentReviewPosts = () => {
        fetch(SERVER_URL + "post/board/6")
            .then(response => response.json())
            .then((data) => {
                // Sort the data array in descending order based on postNum
                data.sort((a, b) => b.postNum - a.postNum);

                const rentReviewWithNumbers = data.map((rentReviews, index) => ({
                    ...rentReviews,
                    id: rentReviews.postNum,
                    number: data.length - index, // 내림차순으로 번호 할당
                }));
                setRentReviews(rentReviewWithNumbers);
            })
            .catch(err => console.error(err));
    };


    const onRowClick = (params) => {
        const rowId = params.row.postNum;

        navigate(`/rent/review/post/${rowId}`);
    };

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const columns = [

        {
            field: "number",
            headerName: "번호",
            width: 60,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'title',
            headerName: '제목',
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,

            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: 'member',
            headerName: '작성자',
            width: 150,
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
            field: 'writeDate',
            headerName: '작성일',
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
        {
            field: 'pageView',
            headerName: '조회수',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
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
                <div style={{display: 'flex', justifyContent: 'right'}}>
                    <button onClick={() => navigate('/rent/review/write')}
                            style={{
                                width: "100px",
                                height: "40px",
                                backgroundColor: "#a38ced",
                                color: "#ffffff",
                                border: "1px solid #cccccc",
                                borderRadius: '5px',
                                fontSize: "15px",
                                fontWeight: "bold",
                                marginTop: "3%",
                                marginBottom:"1%"
                            }}>글쓰기
                    </button>

                </div>
                <div className={styles.posts}>
                    <div style={{width: '100%'}}>
                        <CustomDataGrid
                            className={styles.customDataGrid}
                            columns={columns}
                            rows={rentReviews}
                            pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                            getRowId={(row) => row.postNum}
                            components={{
                                NoRowsOverlay: CustomNoRowsOverlay
                            }}
                            pagination={true}

                        />
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={rentReviews.length}
                            pageRangeDisplayed={5} // 원하는 범위로 조절
                            onChange={handleChangePage}
                            prevPageText="<"
                            nextPageText=">"
                        />

                    </div>
                </div>
            </div>
        </div>

    );
}