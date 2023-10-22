
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";
import Pagination from "../../Common/Pagination";

export default function MyFTCList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [ftConsumers, setFtConsumers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 표시할 항목 수
    const navigate = useNavigate();
    const deleteItem = useDelete(SERVER_URL);

    useEffect(() => {
        // 로그인한 사용자 정보를 가져오는 방법에 따라서 구현
        const fetchedUserInfo = {memNum: sessionStorage.getItem("memNum")};
        setMemNum(fetchedUserInfo.memNum); // memNum 상태 업데이트
    }, []);

    useEffect(() => {
        fetchFTCByMember();
    }, [memNum]);

    const fetchFTCByMember = () => {
        if (memNum === null) {
            return;
        }

        fetch(`${SERVER_URL}ftc/member/${memNum}`)
            .then((response) => response.json())
            .then((ftcData) => {

                const ftcWithNumbers = ftcData.map((ftConsumer, index) => ({
                    ...ftConsumer,
                    id: ftConsumer.ftConsumerNum,  // ftConsumerNum이 실제로 데이터에 있는지 확인해야 함
                    number: index + 1
                }));

                setFtConsumers(ftcWithNumbers);
            })

            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    const onRowClick = (params) => {
        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/dtl/${rowId}`);
    };



    function convertEnumToKorean(enumValue) {
        if (enumValue === "Y") {
            return "해결";
        } else {
            return "미해결";
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
            field: "ftmYN",
            headerName: "매칭 여부",
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),

        },
        {
            field: "applyContent",
            headerName: "상세 내용",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    style={{cursor: "pointer"}}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        }
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
                <h3>인재 매칭 신청 관리<b>(기업)</b></h3>
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
                        rows={ftConsumers}
                        pageSize={5}
                        getRowId={(row) => row.id}  // 각 행의 고유한 식별자를 지정
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
                    totalItemsCount={ftConsumers.length}
                    pageRangeDisplayed={5} // 원하는 범위로 조절
                    onChange={handleChangePage}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>
    );
};
