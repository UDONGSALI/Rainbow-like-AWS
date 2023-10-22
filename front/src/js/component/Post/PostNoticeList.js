import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";
import File from "../../../img/component/file.png";
import styled from '@emotion/styled';
import Pagination from "../Common/Pagination";
import useDeletePost from "../hook/useDeletePost";
import useFetch from "../hook/useFetch";
import useSearch from "../hook/useSearch";
import SearchComponent from "../Common/SearchComponent";

const SEARCH_OPTIONS = [
    {label: "제목", value: "title", type: "text"},
    {label: "내용", value: "content", type: "text"},
    {label: "작성자", value: "member", type: "text", valueGetter: (post) => post.member.memId},
];

function PostNoticeList(props) {
    const {boardNum} = props;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const {deletePost} = useDeletePost(); // 삭제 훅
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    //페이지관련
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;
    const totalItemsCount = posts.length;
    const indexOfLastPost = activePage * itemsCountPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsCountPerPage;
    const pageRangeDisplayed = 5;

    //검색관련
    const {data: fetchedPosts, loadingPosts} = useFetch(`${SERVER_URL}post/board/${boardNum}`);
    const {data: fetchedFiles, filesLoading} = useFetch(SERVER_URL + 'files/table/post', []);
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}post/${boardNum}`, setPosts);


    useEffect(() => {
        if (!loadingPosts) {
            // 서버로부터 받은 데이터 fetchedPosts를 역순으로 정렬하여 setPosts로 상태를 업데이트합니다.
            setPosts([...fetchedPosts].reverse());
        }

        if (!filesLoading) {
            setFiles(fetchedFiles);
        }
    }, [fetchedPosts, fetchedFiles]);


    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const postsWithFiles = posts.map((post) => {
        const postFiles = files.filter((file) => file.post && file.post.postNum === post.postNum);
        return {
            ...post,
            postFiles,
        };
    });

    const currentPagePosts = postsWithFiles.slice(indexOfFirstPost, indexOfLastPost);

    // boardNum 기준으로 게시글들을 그룹화
    const groupedByBoardNum = postsWithFiles.reduce((acc, post) => {
        if (!acc[post.board.boardNum]) {
            acc[post.board.boardNum] = [];
        }
        acc[post.board.boardNum].push(post);
        return acc;
    }, {});

    Object.keys(groupedByBoardNum).forEach(board => {
        const totalPosts = groupedByBoardNum[board].length; // 해당 게시판의 총 게시글 수
        groupedByBoardNum[board].forEach((post, index) => {
            post.orderNumber = totalPosts - index; // 역순으로 순서 번호 부여
        });
    });

    const onDelClick = (postNum, postFiles, boardNum) => {
        deletePost(postNum, postFiles, boardNum, SERVER_URL, (deletedPostNum) => {
            // 삭제된 게시글을 상태에서 제거
            const updatedPosts = posts.filter(post => post.postNum !== deletedPostNum);
            setPosts(updatedPosts);
        });
    };

    const onEditClick = (params) => {
        const rowId = params.row.postNum;
        navigate(`/post/edit/${rowId}`, {state: {mode: "edit"}});
    };

    const getRowId = (row) => {
        return row.postNum.toString();
    };

    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        const boardNumber = params.row.board.boardNum;

        navigate(`/post/detail/${boardNum}/${rowId}`, {
            state: {boardNum: boardNumber}
        });
    };

    const columns = [
        {
            field: 'orderNumber',
            headerName: '번호',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                        {params.value}
                    </StyledCell>
                </CenteredData>
            ),
            width: 50
        },
        {
            field: 'title',
            headerName: '제목',
            headerAlign: 'center',
            width: isAdmin ? 360.5 : 447.5,  // 조건부 width 값 설정
            renderCell: (params) => (
                <div
                    style={{cursor: 'pointer'}}
                    onClick={() => onRowClick(params)}
                >
                    <StyledCell>{params.value}</StyledCell>
                </div>
            ),
        },
        {
            field: 'member',
            headerName: '작성자',
            headerAlign: 'center',
            width: isAdmin ? 80 : 110,  // 조건부 width 값 설정
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            },
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                        {params.value}
                    </StyledCell>
                </CenteredData>
            ),
        },
        {
            field: 'pageView',
            headerName: '조회수',
            headerAlign: 'center',
            width: isAdmin ? 77 : 110,  // 조건부 width 값 설정
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                        {params.value}
                    </StyledCell>
                </CenteredData>
            )
        },
        {
            field: 'postFiles',
            headerName: '파일',
            headerAlign: 'center',
            sortable: false,
            filterable: false,
            renderCell: (row) => {
                return (
                    <CenteredData>
                        <StyledCell>
                            {row.value && row.value[0] && ( // 첫 번째 파일만 확인
                                <div style={{width: '24px', height: '24px', marginRight: '8px'}}>
                                    <img
                                        src={File}
                                        alt='file'
                                        style={{maxWidth: '100%', maxHeight: '100%'}}
                                    />
                                </div>
                            )}
                        </StyledCell>
                    </CenteredData>
                );
            },
            width: isAdmin ? 50 : 80  // 조건부 width 값 설정
        },
        {
            field: 'writeDate',
            headerName: '작성일',
            headerAlign: 'center',
            width: isAdmin ? 100 : 120,  // 조건부 width 값 설정
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                        {params.value.slice(0, 10)}
                    </StyledCell>
                </CenteredData>

            )
        },
        ...(isAdmin ? [
            {
                field: 'editLink',
                headerName: '수정',
                headerAlign: 'center',
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <CenteredData>
                        <EditButton
                            style={{cursor: 'pointer'}}
                            onClick={() => onEditClick(params)}
                        >
                            수정
                        </EditButton>
                    </CenteredData>
                ),
            },
            {
                field: 'deleteLink',
                headerName: '삭제',
                headerAlign: 'center',
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <CenteredData>
                        <DeleteButton
                            onClick={() => onDelClick(params.row.postNum, params.row.postFiles, params.row.board.boardNum)}
                        >
                            삭제
                        </DeleteButton>
                    </CenteredData>
                ),
            }
        ] : [])  // 조건부로 배열을 확장하여 추가
    ];

    return (
        <div style={{width:"fit-content", margin:'0 auto'}}>
            <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center'
            }}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={postsWithFiles.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(postsWithFiles.length / itemsCountPerPage)}
                />
                <StyledDataGrid
                    columns={columns}
                    rows={currentPagePosts}
                    style={{width: '920px', height: 400}}
                    disableRowSelectionOnClick={true}
                    getRowId={getRowId}
                    hideFooter={true}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="게시글을 지웠습니다."
                />
                {isAdmin && (
                    <NewPost onClick={() => navigate('/post/new', {state: {mode: "create", boardNum}})}>
                        등록
                    </NewPost>
                )}
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange}
                    prevPageText="<"
                    nextPageText=">"
                />
            </div>
        </div>

    );
}
const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-columnHeader {
    background-color: #ececec;
  }
`;

const EditButton = styled('button')({
    cursor: 'pointer',
    backgroundColor: '#a38ced',
    color: 'white',
    padding: '8px 12px',
    border: '1px solid #99959e',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#53468b',
    }
});

const DeleteButton = styled('button')({
    cursor: 'pointer',
    backgroundColor: '#a38ced',
    color: 'white',
    padding: '8px 12px',
    border: '1px solid #99959e',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#53468b'
    }
});
const CenteredData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NewPost = styled.button`
  width: 80px;
  height: 35px;
  background-color: #a38ced;
  border: 1px solid #99959e;
  border-radius: 5px;
  color: white;
  display: block;
  margin-top: 40px;
  font-size: 14px;

  &:hover {
    background-color: #53468b;
  }
`;

const StyledCell = styled.span`
  font-size: 12px;
`;

export default PostNoticeList;
