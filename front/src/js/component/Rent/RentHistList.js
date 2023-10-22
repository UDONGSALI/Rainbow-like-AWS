// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 프로젝트 내 공통 모듈 관련
import {useLocation, useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Common/constants";
// 3. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import Permit from "./RenderCell/Permit";
import Pagination from "../Common/Pagination";
import StyledDataGrid from "../Common/StyledDataGrid";
import Wrapper from "../Common/Wrapper";
import LoadingContainer from "../Common/LoadingContainer";
// 4. 훅 관련
import usePagination from "../hook/usePagination";
import useSearch from "../hook/useSearch";
import useDelete from "../hook/useDelete";
import usePatch from "../hook/usePatch";
import useFetch from "../hook/useFetch";
// 5. Helper 함수나 Renderer 관련
import PayStatusCell from "./RenderCell/PayStatusCell";
import StatusCell from "./RenderCell/StatusCell";
import InfoModal from "../Common/InfoModal";
import DateCell from "../Common/DateCell";

const ADMIN_ROLE = "ADMIN";

function RentHistList(props) {
    // 1. React Router 관련
    const navigate = useNavigate();
    const location = useLocation();
    // 2. 사용자 관련
    const {memId} = props;
    const userRole = sessionStorage.getItem("role");
    const isAdmin = userRole === ADMIN_ROLE;
    // 3. 상수
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        {value: 'spaceName', label: '공간명', type: 'text'},
        ...(isAdmin ? [
            {value: 'memId', label: '회원 ID', type: 'text'}
        ] : []),
        {
            value: 'applyStatus', label: '신청 상태', type: 'select', options: [
                {label: "대기", value: "WAIT"},
                {label: "승인", value: "APPROVE"},
                {label: "거부", value: "REJECT"}
            ]
        },
        {
            value: 'payStatus', label: '결제 상태', type: 'select', options: [
                {label: "대기", value: "WAIT"},
                {label: "완료", value: "COMPLETE"},
            ]
        },
    ];
    // 4. 로컬 상태 관리
    const {activePage, setActivePage} = usePagination(1);
    const [isPermitOpen, setIsPermitOpen] = useState(false);
    const [currentPermitData, setCurrentPermitData] = useState({spaceName: "", getRentDate: "", getRentTime: ""});
    const [rentHist, setRentHist] = useState([]);
    const [infoData, setInfoData] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    // 5. 커스텀 훅
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}rent`, setRentHist, undefined, memId);
    const deleteItem = useDelete(SERVER_URL);
    const patchItem = usePatch(SERVER_URL);
    // 6. 데이터 가져오기,
    const rentHistUrl = isAdmin ? SERVER_URL + 'rent' : SERVER_URL + `rent/search/memId/${memId}/${memId}`;
    const {data: rawRentHistData, loading: RentHistLoading} = useFetch(rentHistUrl, []);

    useEffect(() => {
        if (!RentHistLoading && rawRentHistData) {
            const formattedData = rawRentHistData.map((item) => ({
                id: item.rentHistNum, ...item
            }));
            setRentHist(formattedData.reverse());
        }
    }, [rawRentHistData, RentHistLoading]);
    const handleStatusChange = async (rentHistNum, newStatus) => {
        const isSuccess = await patchItem('rent/' + rentHistNum, {status: newStatus}, "신청");

        if (isSuccess) {
            const updatedRows = rentHist.map(row =>
                row.rentHistNum === rentHistNum ? {...row, status: newStatus} : row
            );
            setRentHist(updatedRows);
        }
    };

    const handleDelete = async (rentHistNum) => {
        const isSuccess = await deleteItem('rent/' + rentHistNum, "취소");

        if (isSuccess) {
            const updatedRows = rentHist.filter(row => row.rentHistNum !== rentHistNum);
            setRentHist(updatedRows);
        }
    };


    const handlePageChange = (newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handlePermitPrint = (applyStatus, payStatus, spaceName, getRentDate, getRentTime) => {
        if (applyStatus === 'APPROVE' && payStatus === 'COMPLETE') {
            setCurrentPermitData({spaceName, getRentDate, getRentTime});
            setIsPermitOpen(true);
        } else {
            alert('대여 승인 및 결제 완료 후 출력이 가능합니다!');
        }
    };

    const handleSpaceClick = (space) => {
        setInfoTitle("공간 정보");
        setInfoData(space);
        setIsInfoModalOpen(true);
    };

    const handleMemIdClick = (member) => {
        if (isAdmin) {
            setInfoTitle("회원 정보");
            setInfoData(member);
            setIsInfoModalOpen(true);
        }
    };

    function handleOpenPaymentPopup(rentHist) {
        const totalAmount = calculateTotalAmount(rentHist.space.rentFee, rentHist.rentStdt, rentHist.rentEddt);
        const width = 500;
        const height = 650;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popupOptions = `scrollbars=no, width=${width}, height=${height}, top=${top}, left=${left}`;

        // rentHistNum와 fee 값을 URL에 포함시키기
        window.open(`/pay/${rentHist.id}/${totalAmount}`, 'PaymentPopup', popupOptions);
    }


    function getRentDate(params) {
        const date = new Date(params.row.rentStdt); // 대여 시작일을 기준으로 합니다.
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    function getRentTime(params) {
        const startTime = new Date(params.row.rentStdt);
        const endTime = new Date(params.row.rentEddt);
        return `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')} - ${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
    }

    function calculateRentDuration(rentStdt, rentEddt) {
        const startTime = new Date(rentStdt);
        const endTime = new Date(rentEddt);
        const duration = endTime - startTime;
        return duration / (60 * 60 * 1000);  // 시간으로 변환
    }

    function calculateTotalAmount(rentFee, rentStdt, rentEddt) {
        const cleanFee = parseInt(rentFee.replace('원', '').replace(/,/g, ''), 10);
        const duration = calculateRentDuration(rentStdt, rentEddt);
        return cleanFee * duration;
    }

    const columns = [
        {field: 'rentHistNum', headerName: '번호', width: 60},
        {
            field: 'spaceName',
            headerName: '공간명',
            width: 150,
            renderCell: (row) => (
                <span
                    onClick={() => handleSpaceClick(row.row.space)}
                    style={{cursor: "pointer"}}
                >
                {row.row.space?.spaceName || ''}
            </span>
            )
        },
        {
            field: 'memId',
            headerName: '회원 ID',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleMemIdClick(row.row.member)}
                    style={{cursor: isAdmin ? "pointer" : "default"}}
                >
                {row.row.member?.memId || ''}
            </span>
            )
        },
        {
            field: 'rentDate',
            headerName: '대여 일',
            width: 100,
            renderCell: getRentDate
        },
        {
            field: 'rentTime',
            headerName: '대여 시간',
            width: 150,
            renderCell: getRentTime
        },
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 150,
            renderCell: DateCell
        },
        {
            field: 'applyStatus',
            headerName: '신청 상태',
            width: 100,
            renderCell: (params) => <StatusCell params={params} handleStatusChange={handleStatusChange}/>
        },
        {
            field: 'payStatus',
            headerName: '결제 상태',
            width: 100,
            renderCell: (params) => <PayStatusCell {...params} onPayment={handleOpenPaymentPopup}
                                                   setRentHist={setRentHist}/>,
        },
        {
            field: 'permit',
            headerName: '허가증',
            width: 80,
            renderCell: (params) => (
                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => handlePermitPrint(
                        params.row.applyStatus,
                        params.row.payStatus,  // 여기에 payStatus를 추가합니다.
                        params.row.space?.spaceName,
                        getRentDate(params),
                        getRentTime(params)
                    )}>
                    🖨️
                </div>
            ),
        },
        {
            field: 'cancel',
            headerName: '취소',
            width: 80,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.rentHistNum)}>
                    취소
                </button>
            ),
        }
    ].map(col => ({...col, sortable: false}));

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={rentHist.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(rentHist.length / itemsPerPage)}
                />
                {RentHistLoading ? (
                    <LoadingContainer>로딩중...</LoadingContainer>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={rentHist.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        pageSize={5}
                        hideFooter
                        disableColumnMenu
                    />
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={rentHist.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
            <Permit
                isOpen={isPermitOpen}
                onClose={() => setIsPermitOpen(false)}
                spaceName={currentPermitData.spaceName}
                getRentDate={currentPermitData.getRentDate}
                getRentTime={currentPermitData.getRentTime}
            />
            <InfoModal
                title={infoTitle}
                data={infoData}
                open={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />
        </Wrapper>
    );
}

export default RentHistList;