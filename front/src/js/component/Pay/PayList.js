// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
import {useLocation, useNavigate} from 'react-router-dom';
// 3. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import InfoModal from "../Common/InfoModal";
import Pagination from "../Common/Pagination";
import DateCell from "../Common/DateCell";
import CurrencyCell from "./RenderCell/CurrencyCell";
import LoadingContainer from "../Common/LoadingContainer";
import StyledDataGrid from "../Common/StyledDataGrid";
import Wrapper from "../Common/Wrapper";
// 4. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";

// 1. 상수 및 상태
const itemsPerPage = 10;
const SEARCH_OPTIONS = [
    {label: "대여 번호", value: "rentHistNum", type: "number"},
    {label: "공간명", value: "spaceName", type: "text"},
    {label: "회원 ID", value: "memId", type: "text"},
];

function PayList() {
    // 2. Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 3. 로컬 상태 관리
    const [pays, setPays] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [infoData, setInfoData] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    // 4. 커스텀 훅 사용
    const {activePage, setActivePage} = usePagination(1);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}pay`, setPays);
    const {data: fetchedPays, loading} = useFetch(`${SERVER_URL}pay`);

    useEffect(() => {
        if (!loading) {
            setPays(fetchedPays.reverse());
            setTotalPages(Math.ceil(fetchedPays.length / itemsPerPage));
        }
    }, [loading, fetchedPays]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const currentActivePage = urlSearchParams.get("page");
        if (currentActivePage) {
            setActivePage(parseInt(currentActivePage));
        }
    }, [location.search]);

    const handlePageChange = (newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handleRentHistNumClick = (rentHist) => {
        setInfoTitle("대여 정보");
        setInfoData(rentHist);
        setIsInfoModalOpen(true);
    };

    const handleSpaceClick = (space) => {
        setInfoTitle("공간 정보");
        setInfoData(space);
        setIsInfoModalOpen(true);
    };

    const handleMemIdClick = (member) => {
        setInfoTitle("회원 정보");
        setInfoData(member);
        setIsInfoModalOpen(true);
    };

    const columns = [
        {
            field: 'payHistNum',
            headerName: '번호',
            width: 60, // 임의의 폭 값 설정
        },
        {
            field: 'rentHistNum',
            headerName: '대여 번호',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleRentHistNumClick(row.row.rentHist)}
                    style={{cursor: "pointer"}}
                >
                {row.row.rentHist?.rentHistNum || ''}
            </span>
            )
        },
        {
            field: 'spaceName',
            headerName: '공간명',
            width: 160,
            renderCell: (row) => (
                <span
                    onClick={() => handleSpaceClick(row.row.rentHist.space)}
                    style={{cursor: "pointer"}}
                >
                {row.row.rentHist.space?.spaceName || ''}
            </span>
            )
        },
        {
            field: 'memId',
            headerName: '회원 ID',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleMemIdClick(row.row.rentHist.member)}
                    style={{cursor: "pointer"}}
                >
                {row.row.rentHist.member?.memId || ''}
            </span>
            )
        },
        {
            field: 'fee',
            headerName: '결제 금액',
            width: 100,
            renderCell: CurrencyCell
        },
        {
            field: 'payDate',
            headerName: '결제일시',
            width: 150,
            renderCell:DateCell
        },
    ].map(col => ({ ...col, sortable: false }));

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={pays.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(pays.length / itemsPerPage)}
                />
                {loading ? (
                    <LoadingContainer>로딩중...</LoadingContainer>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={pays.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.payHistNum}
                        hideFooter
                        disableColumnMenu
                    />
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={pays.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
            <InfoModal
                title={infoTitle}
                data={infoData}
                open={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />
        </Wrapper>
    );
}
export default PayList;