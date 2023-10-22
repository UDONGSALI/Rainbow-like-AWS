// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 프로젝트 내 공통 모듈 관련
import { SERVER_URL } from "../Common/constants";
import { useLocation, useNavigate } from "react-router-dom";
// 3. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import OrgForm from "./OrgForm";
import Pagination from "../Common/Pagination";
import QuickMenu from "../../layout/QuickMenu/QuickMenu";
import LoadingContainer from "../Common/LoadingContainer";
import StyledDataGrid from "../Common/StyledDataGrid";
import Wrapper from "../Common/Wrapper";
// 4. 훅 관련
import useSearch from "../hook/useSearch";
import usePagination from "../hook/usePagination";
import useFetch from "../hook/useFetch";
import useDelete from "../hook/useDelete";

// 상수 및 상태 정의
const itemsPerPage = 10;
const SEARCH_OPTIONS = [
    {label: "기관명", value: "name", type: "text"},
    {label: "주소", value: "addr", type: "text"},
];

function OrgList() {
    // Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 로컬 상태 관리
    const [orgs, setOrgs] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    // 커스텀 훅 사용
    const { activePage, setActivePage } = usePagination(1);
    const { searchTerm, setSearchTerm, handleSearch } = useSearch(`${SERVER_URL}org`,setOrgs);
    const { data: fetchedOrgs, loading } = useFetch(`${SERVER_URL}org`);
    const deleteItem = useDelete(SERVER_URL);


    useEffect(() => {
        if (!loading) {
            setOrgs(fetchedOrgs.reverse());
        }
    }, [loading, fetchedOrgs]);

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
    };

    const handleEdit = (orgNum) => {
        const org = orgs.find((o) => o.orgNum === orgNum);
        handleOpenModal(org);
    };

    const handleOpenModal = (org) => {
        setSelectedOrg(org);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrg(null);
        setOpenModal(false);
    };

    const handleAddOrg = () => {
        setSelectedOrg(null);
        handleOpenModal();
    };

    const handleOrgUpdate = (updatedOrg) => {
        const updatedOrgs = orgs.map((org) =>
            org.orgNum === updatedOrg.orgNum ? updatedOrg : org
        );
        setOrgs(updatedOrgs);
    };

    const handleDelete = async (orgNum) => {
        const isSuccess = await deleteItem('org/' + orgNum, "삭제");

        if (isSuccess) {
            const updatedRows = orgs.filter(row => row.orgNum !== orgNum);
            setOrgs(updatedRows);
        }
    };

    const columns = [
        {field: 'orgNum', headerName: '번호', width: 60},
        {field: 'name', headerName: '기관명', width: 200},
        {
            field: 'url',
            headerName: '웹사이트',
            width: 200,
            renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    {params.value}
                </a>
            )
        },
        {field: 'tel', headerName: '전화번호', width: 120},
        {field: 'addr', headerName: '주소', width: 250},
        {field: 'addrDtl', headerName: '세부 주소', width: 200},
        {field: 'addrPost', headerName: '우편 번호', width: 100},
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
    ].map(col => ({ ...col, sortable: false }));

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={orgs.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(orgs.length / itemsPerPage)}
                />
                {loading ? (
                    <LoadingContainer>로딩중...</LoadingContainer>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={orgs.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.orgNum}
                        hideFooter
                        disableColumnMenu
                    />
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={orgs.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                    prevPageText="<"
                    nextPageText=">"
                />
                <OrgForm
                    org={selectedOrg}
                    open={openModal}
                    onClose={handleCloseModal}
                    onUpdate={handleOrgUpdate}
                />
            </div>
            <QuickMenu
                modal={{
                    method: handleAddOrg,  // 모달을 열 메소드
                    text: '기관 추가'  // 버튼 텍스트
                }}
            />
        </Wrapper>
    );
}

export default OrgList;
