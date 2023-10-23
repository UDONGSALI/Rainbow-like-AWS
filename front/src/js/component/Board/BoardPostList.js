// 1. React 관련
import React, {memo, useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import { DataGrid } from "@mui/x-data-grid";
import styled from '@emotion/styled';
// 3. 프로젝트 내 공통 모듈 관련
import { SERVER_URL } from '../Common/constants';
import SearchComponent from "../Common/SearchComponent";
import DateCell from "../Common/DateCell";
import InfoModal from "../Common/InfoModal";
// 4. 컴포넌트 관련
import LaborAssignmentModal from "./LaborAssignmentModal";
import Pagination from "../Common/Pagination";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import useFetch from "../hook/useFetch";
import usePagination from "../hook/usePagination";
import usePatch from "../hook/usePatch";
// 6. Renderer 관련
import StatusCell from "../Rent/RenderCell/StatusCell";
import ConselStatusCell from "./RenderCell/ConselStatusCell";
import LaborCell from "./RenderCell/LaborCell";
import {useLocation, useNavigate} from "react-router-dom";
import {useConfirm} from "../hook/useConfirm";
import LoadingContainer from "../Common/LoadingContainer";
import Wrapper from "../Common/Wrapper";
import StyledDataGrid from "../Common/StyledDataGrid";

function BoardPostList({ boardNum }) {
    // 1. 상수 정의
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        { label: "제목", value: "title", type: "text" },
        { label: "내용", value: "content", type: "text" },
        { label: "작성자", value: "member", type: "text", valueGetter: (post) => post.member.memId },
    ];
    // Router Hooks
    const navigate = useNavigate();
    const location = useLocation();
    // 2. 로컬 상태 관리
    const [posts, setPosts] = useState([]);
    const [isLaborModalOpen, setIsLaborModalOpen] = useState(false);
    const [selectedPostNum, setSelectedPostNum] = useState(null);
    const [infoData, setInfoData] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    // 3. 커스텀 훅 사용
    const { activePage, setActivePage } = usePagination(1);
    const patchItem = usePatch(SERVER_URL);
    const confirm = useConfirm();
    // 4. 데이터 가져오기,
    const { searchTerm, setSearchTerm, handleSearch } = useSearch(`${SERVER_URL}post/${boardNum}`, setPosts);
    const { data: fetchedPosts, loading } = useFetch(`${SERVER_URL}post/board/${boardNum}`);

    useEffect(() => {
        if (!loading) {
            if (boardNum === 7 || boardNum === 8) {
                // boardNum이 7 또는 8일 때의 로직
                const primaryPosts = fetchedPosts.filter(post => !post.parentsNum).sort((a, b) => b.postNum - a.postNum);

                const replyMap = fetchedPosts.reduce((acc, post) => {
                    if (post.parentsNum) {
                        if (!acc[post.parentsNum]) {
                            acc[post.parentsNum] = [];
                        }
                        acc[post.parentsNum].push(post);
                    }
                    return acc;
                }, {});

                const sortedPosts = [];

                primaryPosts.forEach(primaryPost => {
                    sortedPosts.push(primaryPost);
                    if (replyMap[primaryPost.postNum]) {
                        sortedPosts.push(...replyMap[primaryPost.postNum]);
                    }
                });

                setPosts(sortedPosts);
            } else {
                // boardNum이 7 또는 8이 아닐 때의 로직
                setPosts(fetchedPosts.reverse());
            }
        }
    }, [loading, fetchedPosts, boardNum]);

    const handleDelete = async (postNum) => {

        const isConfirmed = await confirm("정말로 이 게시글을 삭제하시겠습니까?");

        if (!isConfirmed) {
            return;
        }

        fetch(`${SERVER_URL}post/${postNum}`, {
            method: 'DELETE'
        })
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return {};
                }
            })
            .then(data => {
                setPosts(posts.filter(post => post.postNum !== postNum));
                alert("삭제가 완료되었습니다.");
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            });
    };

    const handleMemIdClick = (member) => {
        setInfoTitle("회원 정보");
        setInfoData(member);
        setIsInfoModalOpen(true);
    };

    const handleStatusChange = async (postNum, newStatus) => {
        const isSuccess = await patchItem('post/patch/' + postNum, { action: "status", status: newStatus }, "신청");
        if (isSuccess) {
            const updatedRows = posts.map(row =>
                row.postNum === postNum ? { ...row, status: newStatus } : row
            );
            setPosts(updatedRows);
        }
    };

    const handleOpenLaborModal = () => {
        setIsLaborModalOpen(true);
    };

    const handleCloseLaborModal = () => {
        setIsLaborModalOpen(false);
    };

    const handleAssignSuccess = (postNum, laborId) => {
        const updatedRows = posts.map(row =>
            row.postNum === postNum ? { ...row, labor: { memId: laborId }, conselStatus: "APPROVE" } : row
        );
        setPosts(updatedRows);
    };

    const handleCancelAssignment = async (postNum) => {
        const isConfirmed = await confirm("배정된 노무사를 취소하시겠습니까?");
        if (!isConfirmed) return;

        const bodyData = {
            action: "cancelLabor"
        };

        const isSuccess = await patchItem(`post/patch/` + postNum, bodyData, '배정');
        if (isSuccess) {
            const updatedRows = posts.map(row =>
                row.postNum === postNum ? { ...row, labor: null, conselStatus: "WAIT" } : row
            );
            setPosts(updatedRows);
        }
    };

    const handlePageChange = (newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    };

    const columns = [
        { field: 'postNum', headerName: '번호', width: 80 },
        {
            field: 'title',
            headerName: 'title',
            width: 200,
            renderCell: (row) => {
                const boardNum = row.row.board.boardNum;
                const postNum = row.row.postNum;
                let navigateTo;

                if (boardNum === 9) {
                    navigateTo = `/clubs/${postNum}`;
                } else if (boardNum === 6) {
                    navigateTo = `/rent/review/post/${postNum}`;
                } else {
                    navigateTo = `/post/detail/${boardNum}/${postNum}`;
                }

                return (
                    <span
                        onClick={() => navigate(navigateTo)}  // 'navigate'는 해당 경로로 이동하는 함수로 추정됩니다.
                        style={{ cursor: 'pointer' }}
                    >
                {row.row.parentsNum ? "ㄴ [답글] " : ""}{row.row.title}
            </span>
                );
            }
        },
        {
            field: 'memId',
            headerName: '작성자',
            width: 100,
            renderCell: (row) => (
                <span
                    onClick={() => handleMemIdClick(row.row.member)}
                    style={{ cursor: "pointer" }}
                >
                {row.row.member?.memId || ''}
            </span>
            )
        },
        {
            field: 'writeDate',
            headerName: '작성일시',
            width: 150,
            renderCell: DateCell
        },
        {
            field: 'editDate',
            headerName: '수정일시',
            width: 150,
            renderCell: DateCell
        },
        { field: 'pageView', headerName: '조회수', width: 100 },
        ...(boardNum == 9 ? [
            {
                field: 'clubAllowStatus',
                headerName: '허용 상태',
                width: 100,
                renderCell: (params) => <StatusCell params={params} handleStatusChange={handleStatusChange} />
            },
            { field: 'clubRecuStatus', headerName: '모집 상태', width: 100 },
            { field: 'delYN', headerName: '삭제 여부', width: 100 },
        ] : []),
        ...(boardNum == 7 ? [
            {
                field: 'labor',
                headerName: '배정 노무사',
                width: 120,
                renderCell: (params) => <LaborCell
                    params={params}
                    handleMemIdClick={handleMemIdClick}
                    handleCancelAssignment={handleCancelAssignment}
                    handleOpenLaborModal={handleOpenLaborModal}
                    setSelectedPostNum={setSelectedPostNum}
                />
            }
        ] : []),
        ...(boardNum == 7 || boardNum == 8 ? [
            {
                field: 'conselStatus',
                headerName: '상담 상태',
                width: 100,
                renderCell: (params) => <ConselStatusCell params={params} />
            },
        ] : []),
        {
            field: 'deleteAction',
            headerName: '삭제',
            width: 100,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.postNum)}>삭제</button>
            )
        }
    ].map(col => ({ ...col, sortable: false }));

    return (
        <Wrapper style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    totalCount={posts.length}
                    searchOptions={SEARCH_OPTIONS}
                    currentPage={activePage}
                    totalPages={Math.ceil(posts.length / itemsPerPage)}
                />
                {loading ? (
                    <LoadingContainer>로딩중...</LoadingContainer>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={posts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        getRowId={(row) => row.postNum.toString()}
                        hideFooter
                        disableColumnMenu
                    />
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={posts.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
            <LaborAssignmentModal
                open={isLaborModalOpen}
                onClose={handleCloseLaborModal}
                postNum={selectedPostNum}
                onAssignSuccess={handleAssignSuccess}
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

export default memo(BoardPostList);