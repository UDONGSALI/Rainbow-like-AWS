
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";
import Pagination from "../../Common/Pagination";

export default function MyFTWList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [ftWorkers, setFtWorkers] = useState([]);
    const [ftConsumers, setFtConsumers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 표시할 항목 수
    const [ftData, setFtData] = useState({ ftWorkers: [], ftConsumers: [] });
    const navigate = useNavigate();


    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        fetchFTWByMember();
    }, [memNum]);


    const fetchFTWByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 모임정보만 가져오도록 수정
        fetch(`${SERVER_URL}ftw/member/${memNum}`)
            .then((response) => response.json())
            .then((ftwData) => {
                const ftwWithNumbers = ftwData.map((ftWorker, index) => ({
                    ...ftWorker,
                    id: ftWorker.ftWorkerNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));

                setFtWorkers(ftwWithNumbers);
            })



            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const onRowClick = (params) => {
        if (params.field === 'ftDtl') {
            const ftWorkerId = params.row.ftWorkerNum;
            navigate(`/ftw/dtl/${ftWorkerId}`);
        }
    };

    const handleChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            field: "speField",
            headerName: "분야",
            width: 300,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },

        {
            field: "writeDate",
            headerName: "신청일시",
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


        {
            field: "ftStatus",
            headerName: "승인 여부",
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: "ftDtl",
            headerName: "상세 내용",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            renderCell: (params) => (
                <div
                    style={{cursor: "pointer"}}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
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

    return (
        <div id={styles.active}>
            <div className={styles.main}>
                <h3>인재 등록 신청 관리<b>(개인)</b></h3>
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
                        rows={ftWorkers}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.id}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        disableColumnMenu
                        autoHeight={true}

                    />
                </div>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={ftWorkers.length}
                    pageRangeDisplayed={5} // 원하는 범위로 조절
                    onChange={handleChangePage}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>
    );
};
