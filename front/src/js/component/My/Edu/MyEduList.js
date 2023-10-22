
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";
import styles from "../../../../css/component/Mypage/MypageComponent.module.css";
import CustomDataGrid from "../../Common/CustomDataGrid";
import useDelete from "../../hook/useDelete";
import Pagination from "../../Common/Pagination";
import Certificate from "../../Edu/RenderCell/Certificates";

export default function MyEduList() {
    const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    const [eduHists, setEduHists] = useState([]); // 게시글 데이터 상태
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [currentCertificateData, setCurrentCertificateData] = useState({name: "", eduName: ""});
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
        // memNum 상태가 변경될 때마다 fetchClubsByMember를 호출
        if (memNum !== null) {
            fetchEduHistsByMember();
        }
    }, [memNum]);

    const fetchEduHistsByMember = () => {
        if (memNum === null) {
            return;
        }

        // memNum을 사용하여 해당 멤버의 교육신청내역만 가져오도록 수정
        fetch(`${SERVER_URL}eduHist/memberEduHist/${memNum}`)
            .then((response) => response.json())
            .then((data) => {

                const modifiedData = data.map(item => ({
                    ...item,
                    type: item.edu.type,
                    eduName: item.edu.eduName,
                    rentStdt: item.rentStdt,
                    rentEddt: item.rentEddt,
                }));
                const eduHistWithNumbers = modifiedData.map((eduHist, index) => ({
                    ...eduHist,
                    id: eduHist.eduHistNum,
                    number: index + 1, // 각 행에 번호를 순차적으로 할당
                }));

                setEduHists(eduHistWithNumbers);
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    };

    function getEduDate(params) {
        const date = new Date(params.row.edu.eduStdt); // 대여 시작일을 기준으로 합니다.
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }


    const onRowClick = (params) => {
        const rowId = params.row.edu.eduNum;
        navigate(`/edu/list/detail/${rowId}`);
    };


    const handleDelete = async (eduHistNum) => {
        const isSuccess = await deleteItem('eduHist/' + eduHistNum, "취소");

        if (isSuccess) {
            const updatedRows = eduHists.filter(row => row.eduHistNum !== eduHistNum);
            setEduHists(updatedRows);
        }
        // console.log(isSuccess);
    };

    const handleCertificatePrint = (status, name, eduName) => {
        if (status === 'COMPLETE') {
            setIsCertificateOpen(true);
            setCurrentCertificateData({name, eduName});
        } else {
            alert('교육 수료 후 출력이 가능합니다!');
        }
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
        } else if (enumValue === "BUSINESS"){
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
            field: "number",
            headerName: "번호",
            width: 80,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            sortable: true,
        },
        {
            field: "type",
            headerName: "구분",
            width: 130,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),

        },
        {
            field: "eduName",
            headerName: "교육명",
            flex: 1,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            headerAlign: 'center', renderCell: (params) => {

                const postTitle = params.row.edu.eduName


                return (
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => onRowClick(params)}
                    >
                        {postTitle}
                    </div>
                );
            }




        },
        {
            field: "eduPeriod",
            headerName: "교육일시",
            width: 130,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: getEduDate

           
        },
        {
            field: "applyDate",
            headerName: "신청일시",
            width: 130,
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
            field: "status",
            headerName: "신청 상태",
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params) => convertEnumToKorean(params.value),
        },
        {
            field: "cancel",
            headerName: "취소",
            width:100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.eduHistNum)}
                        style={{
                            width: "50px",
                            height: "25px",
                            border:"1px solid #fff",
                            backgroundColor: "#a38ced",
                            color: "rgb(255,255,255)",
                            borderRadius: '5px',
                            fontSize: "13px",
                            fontWeight: "bold",
                        }}
                >
                    취소
                </button>
            ),

        },
        {
            field: 'printCertificate',
            headerName: '수료증',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    onClick={() => handleCertificatePrint(params.row.status, params.row.member?.name, params.row.edu?.eduName)}
                    style={{ cursor: "pointer" }}  // 이 부분을 추가했습니다.
                >
                    🖨️
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
                        rows={eduHists}
                        pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                        getRowId={(row) => row.eduHistNum}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                        autoHeight={true}
                        disableColumnMenu
                    />
                </div>
                <Certificate
                    isOpen={isCertificateOpen}
                    onClose={() => setIsCertificateOpen(false)}
                    name={currentCertificateData.name}
                    eduName={currentCertificateData.eduName}
                />
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={eduHists.length}
                    pageRangeDisplayed={5} // 원하는 범위로 조절
                    onChange={handleChangePage}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>
    );
};
