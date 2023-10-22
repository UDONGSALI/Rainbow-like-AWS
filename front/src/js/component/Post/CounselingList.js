import React, {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from 'react-router-dom';
import {SERVER_URL} from "../Common/constants";
import File from "../../../img/component/file.png";
import styled from '@emotion/styled';
import Pagination from "../Common/Pagination";


function CounselingList(props) {
    const {boardNum, memNum} = props;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const isCounselor = sessionStorage.getItem("role") === "COUNSELOR";
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    //페이지관련
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;
    const totalItemsCount = posts.length;
    const pageRangeDisplayed = 5;

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    useEffect(() => {
        fetch(SERVER_URL + `post/board/${boardNum}`)
            .then(res => res.json())
            .then(data => {
                const primaryPosts = data.filter(post => !post.parentsNum).reverse();
                const replies = data.filter(post => post.parentsNum).reverse();

                const sortedData = primaryPosts.reduce((acc, post) => {
                    acc.push(post);
                    const relatedReplies = replies.filter(reply => reply.parentsNum === post.postNum);
                    acc.push(...relatedReplies);
                    return acc;
                }, []);

                setPosts(sortedData);
            })
            .catch(err => console.error(err));
    }, [boardNum, memNum]);

    useEffect(() => {
        fetch(SERVER_URL + "files/table/post")
            .then(res => res.json())
            .then(data => {
                setFiles(data);
            })
            .catch(err => console.error(err));
    }, [posts]);

    const postsWithFiles = posts.map((post) => {
        const postFiles = files.filter((file) => file.post && file.post.postNum === post.postNum);
        return {
            ...post,
            postFiles,
        };
    });
    const indexOfLastPost = activePage * itemsCountPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsCountPerPage;
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

    const onRowClick = (params) => {
        const rowId = params.row.postNum;
        const boardNumber = params.row.board.boardNum;
        const parentPost = params.row.parentsNum ? postsWithFiles.find(post => post.postNum === params.row.parentsNum) : null;

        if (boardNumber == 7) {
            if (isAdmin || params.row.labor?.memNum == memNum || params.row.member?.memNum == memNum || (parentPost && parentPost?.member?.memNum == memNum)) {
                navigate(`/post/detail/${boardNum}/${rowId}`, {
                    state: {boardNum: boardNumber}
                });
            }
        } else if (boardNumber == 8) {
            if (isAdmin || isCounselor || params.row.member?.memNum == memNum || (parentPost && parentPost?.member?.memNum == memNum)) {
                navigate(`/post/detail/${boardNum}/${rowId}`, {
                    state: {boardNum: boardNumber}
                });
            }
        }
    }

    // USER의 작성자 이름은 첫 글자만 가져오게
    const maskName = (name, type) => {
        if (type === "USER" && name && name.length > 1) {
            return name[0] + '*'.repeat(name.length - 1);
        }
        return name;
    }
    const currentStart = totalItemsCount - (activePage - 1) * itemsCountPerPage;
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
            width: 447.5,
            renderCell: (params) => {
                const boardNumber = params.row.board.boardNum;
                const parentPost = params.row.parentsNum ? postsWithFiles.find(post => post.postNum === params.row.parentsNum) : null;
                let isClickable = false;

                if (boardNumber === 7) {
                    isClickable = isAdmin || params.row.labor?.memNum == memNum || params.row.member?.memNum == memNum || (parentPost && parentPost?.member?.memNum == memNum);
                } else if (boardNumber === 8) {
                    isClickable = isAdmin || isCounselor || params.row.member?.memNum == memNum || (parentPost && parentPost?.member?.memNum == memNum);
                }

                return (
                    <div
                        style={{
                            cursor: isClickable ? 'pointer' : 'default'
                        }}
                        onClick={() => {
                            if (isClickable) {
                                onRowClick(params);
                            } else {
                                console.log('열람 권한이 없습니다.');
                            }
                        }}
                    >
                        <StyledCell>
                            {params.row.parentsNum ? "ㄴ [답글] " : ""}{params.value}
                        </StyledCell>
                    </div>
                );
            }
        },
        {
            field: 'member',
            headerName: '작성자',
            headerAlign: 'center',
            width: 100,
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => maskName(m.name, m.type)).join(', ');
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
            field: 'writeDate',
            headerName: '작성일',
            headerAlign: 'center',
            width: 100,
            renderCell: (params) => (
                <CenteredData>
                    <StyledCell>
                        {params.value.slice(0, 10)}
                    </StyledCell>
                </CenteredData>

            )
        },
        {
            field: 'pageView',
            headerName: '조회수',
            headerAlign: 'center',
            width: 120,
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
            width: 80,
        },
    ];

    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', width: '100%'
        }}>
            <StyledDataGrid
                columns={columns}
                rows={currentPagePosts}
                style={{width: '900px', height: 400}}
                disableRowSelectionOnClick={true}
                getRowId={(row) => row.postNum}
                hideFooter={true}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="게시글을 지웠습니다."
            />
            <NewPost onClick={() => navigate('/csl/new', {state: { mode: "create", boardNum}})}>
                등록
            </NewPost>
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

    );
}

const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-columnHeader {
    background-color: #ececec;
  }
`;

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

export default CounselingList;
