// 1. React 관련
import React, {memo, useEffect, useState} from "react";
// 2. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from '../Common/constants';
// 3. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import StyledDataGrid from "../Common/StyledDataGrid";
import Wrapper from "../Common/Wrapper";
import LoadingContainer from "../Common/LoadingContainer";
// 4. 훅 관련
import useSearch from "../hook/useSearch";
import useFetch from "../hook/useFetch";
import useDelete from "../hook/useDelete";

// 1. 상수 및 상태
const SEARCH_OPTIONS = [
    {value: 'memId', label: 'ID', type: 'text'},
    {
        value: 'type',
        label: '유형',
        type: 'select',
        options: [
            {value: 'ADMIN', label: '관리자'},
            {value: 'USER', label: '일반 회원'},
            {value: 'LABOR', label: '노무사'},
            {value: 'COUNSELOR', label: '상담사'}
        ]
    },
];

function AccessingMemberList() {
    // 2. 로컬 상태 관리
    const [accessingMembers, setAccessingMembers] = useState([]);

    // 3. 커스텀 훅 사용
    const deleteItem = useDelete(SERVER_URL);

    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}token`, setAccessingMembers);
    const {data: fetchedAccessingMembers, loading} = useFetch(`${SERVER_URL}token`);

    useEffect(() => {
        if (!loading) {
            setAccessingMembers(fetchedAccessingMembers.reverse());
        }
    }, [loading, fetchedAccessingMembers]);

    const handleDelete = async (jti) => {
        const isSuccess = await deleteItem('token/' + jti, "강제 로그아웃");

        if (isSuccess) {
            const updatedRows = accessingMembers.filter(row => row.jti !== jti);
            setAccessingMembers(updatedRows);
        }
    };

    function formatLoginTime(dateString) {
        // 파싱
        let date = new Date(dateString);

        // 4 시간 더하기
        date.setTime(date.getTime() - 5 * 60 * 60 * 1000);

        // 출력 형식 만들기
        const HH = String(date.getHours()).padStart(2, '0');
        const MI = String(date.getMinutes()).padStart(2, '0');

        return `${HH}:${MI}`;
    }

    const columns = [
        {
            field: 'memId',
            headerName: '회원 아이디',
            width: 150,
        },
        {
            field: 'role',
            headerName: '유형',
            width: 150
        },
        {
            field: 'expirationDate',
            headerName: '로그인 시간',
            width: 200,
            valueFormatter: (params) => formatLoginTime(params.value)
        },
        {
            field: 'delete',
            headerName: '강제 로그아웃',
            sortable: false,
            filterable: false,
            renderCell: (row) => (
                <button onClick={() => handleDelete(row.row.jti)}>로그아웃</button>
            ),
            width: 150
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
                    totalCount={accessingMembers.length}
                    currentPage={0}
                    totalPages={0}
                />
                {loading ? (
                    <LoadingContainer>로딩중...</LoadingContainer>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={accessingMembers}
                        getRowId={(row) => row.tokenNum}
                        hideFooter
                        disableColumnMenu
                    />
                )}
            </div>
        </Wrapper>
    );
}
export default memo(AccessingMemberList);