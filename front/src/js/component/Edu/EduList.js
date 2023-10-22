// 1. React 관련
import React, {memo, useCallback, useEffect, useState} from "react";
// 2. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
import {useLocation, useNavigate} from 'react-router-dom';
// 3. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import Pagination from "../Common/Pagination";
import LoadingContainer from "../Common/LoadingContainer";
import StyledDataGrid from "../Common/StyledDataGrid";
import Wrapper from "../Common/Wrapper";
// 4. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";
import useDelete from "../hook/useDelete";
// 5. Helper 함수나 Renderer 관련
import {renderStatusCell} from "./RenderCell/statusRenderer";
// 1. 상수 및 상태
const itemsPerPage = 10;
const isAdmin = sessionStorage.getItem("role") === "ADMIN";
const SEARCH_OPTIONS = [
    {label: "프로그램명", value: "eduName", type: "text"},
    {
        label: "구분",
        value: "type",
        type: "select",
        options: [
            {label: "교육", value: "EDU"},
            {label: "사업", value: "BUSINESS"}
        ]
    },
    {label: "내용", value: "content", type: "text"},
    {
        label: "접수 방법",
        value: "recuMethod",
        type: "select",
        options: [
            {label: "관리자 승인", value: "ADMIN_APPROVAL"},
            {label: "선착순 모집", value: "FIRST_COME"}
        ]
    }
];

function EduList() {
    // 2. Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 3. 로컬 상태 관리
    const [edus, setEdus] = useState([]);
    // 4. 커스텀 훅 사용
    const {activePage, setActivePage} = usePagination(1);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}edus`, setEdus);
    const {data: fetchedEdus, loading} = useFetch(`${SERVER_URL}edus`);
    const deleteItem = useDelete(SERVER_URL);

    useEffect(() => {
        if (!loading) {
            setEdus(fetchedEdus.reverse());
        }
    }, [loading, fetchedEdus]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const currentActivePage = urlSearchParams.get("page");
        if (currentActivePage) {
            setActivePage(parseInt(currentActivePage));
        }
    }, [location.search]);

    const handlePageChange = useCallback((newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }, [location.pathname, navigate, setActivePage]);

    const handleTitleClick = useCallback((eduNum) => {
        navigate('/edu/list/detail/' + eduNum);
    }, [navigate]);

    const handleEdit = useCallback((eduNum) => {
        navigate('/admin/edu/edit/' + eduNum);
    }, [navigate]);

    const handleDelete = useCallback(async (eduNum) => {
        const isSuccess = await deleteItem('api/edus/' + eduNum, "삭제");
        if (isSuccess) {
            const updatedRows = edus.filter(row => row.eduNum !== eduNum);
            setEdus(updatedRows);
        }
    }, [deleteItem, edus]);

    const columns = [
        {
            field: 'eduNum',
            headerName: '번호',
            width: 60
        },
        {
            field: 'type',
            headerName: '구분',
            width: 60,
            renderCell: (row) => (
                <div className={`typeCell ${row.value}`}>
                    {row.value === 'BUSINESS' ? '사업' :
                        row.value === 'EDU' ? '교육' : ''}
                </div>
            ),
        },
        {
            field: 'eduName',
            headerName: '프로그램명',
            width: 300,
            renderCell: (row) => (
                <div onClick={() => handleTitleClick(row.id)} className="eduNameCell">
                    {row.value}
                </div>
            ),
        },
        {
            field: 'recuMethod',
            headerName: '접수 방법',
            width: 100,
            renderCell: (row) => (
                <div>
                    {row.value === 'ADMIN_APPROVAL' ? '관리자 승인' :
                        row.value === 'FIRST_COME' ? '선착순 모집' : row.value}
                </div>
            ),
        },
        {
            field: 'recuStdt~recuEddt',
            headerName: '모집 기간',
            width: 180,
            valueGetter: (params) => {
                return `${params.row.recuStdt}~${params.row.recuEddt}`;
            },
        },
        {
            field: 'recuPerson+/+capacity',
            headerName: '신청인/정원',
            width: 120,
            valueGetter: (params) => {
                return `${params.row.recuPerson}/${params.row.capacity}`;
            },
        },
        {
            field: 'status',
            headerName: '상태',
            width: 100,
            renderCell: (params) => renderStatusCell(params.row),
        },
        ...(isAdmin ? [
            {
                field: 'edit',
                headerName: '수정',
                sortable: false,
                filterable: false,
                renderCell: (row) => (
                    <button onClick={() => handleEdit(row.id)}>수정</button>
                ),
                width: 80,
            },
            {
                field: 'delete',
                headerName: '삭제',
                sortable: false,
                filterable: false,
                renderCell: (row) => (
                    <button onClick={() => handleDelete(row.id)}>삭제</button>
                ),
                width: 80,
            },
        ] : []),
    ].map(col => ({ ...col, sortable: false }));

    return (
        <Wrapper>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={edus.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(edus.length / itemsPerPage)}
                />
                {loading ? (
                    <LoadingContainer>로딩중...</LoadingContainer>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={edus.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.eduNum}
                        hideFooter
                        disableColumnMenu
                    />
                )}
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={edus.length}
                        pageRangeDisplayed={10}
                        onChange={handlePageChange}
                        prevPageText="<"
                        nextPageText=">"
                    />
            </div>
        </Wrapper>
    );
}
export default memo(EduList);
