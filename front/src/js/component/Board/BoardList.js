import React, {useEffect, useState} from "react";
import {SERVER_URL} from "../Common/constants";
import useFetch from "../hook/useFetch";
import LoadingContainer from "../Common/LoadingContainer";
import StyledDataGrid from "../Common/StyledDataGrid";
import Wrapper from "../Common/Wrapper";

function BoardList() {
    const [boards, setBoards] = useState([]);
    const {data: fetchedBoards, loading} = useFetch(`${SERVER_URL}api/boards`);

    useEffect(() => {
        if (!loading) {
            const processedBoards = fetchedBoards._embedded.boards.map(board => ({
                ...board,
                boardId: board._links.self.href.split('/').pop(),
                readRole: board.readRole ? 'Yes' : 'No',
                writeRole: board.writeRole ? 'Yes' : 'No',
                commAllowYn: board.commAllowYn ? 'Yes' : 'No',
            }));
            setBoards(processedBoards);
        }
    }, [loading, fetchedBoards]);

    const handleUpdatePermission = (boardId, field, newValue) => {
        fetch(`${SERVER_URL}api/boards/${boardId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [field]: newValue === 'Yes',
            }),
        })
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => {
                console.log('Update successful:', data);
                setBoards(prevBoards => {
                    return prevBoards.map(board => {
                        if (board.boardId === boardId) {
                            return {
                                ...board,
                                [field]: newValue,
                            };
                        }
                        return board;
                    });
                });
                alert("설정을 변경 했습니다!");
            })
            .catch(error => {
                console.error('Error updating:', error);
            });
    };

    const columns = [
        {field: 'boardId', headerName: '번호', width: 50},
        {
            field: 'boardName',
            headerName: '게시판 이름',
            width: 200,
            renderCell: (params) => (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/admin/board/post/${params.row.boardId}`;
                    }}
                    style={{color: 'inherit', textDecoration: 'none'}} // 이 부분을 추가
                >
                    {params.value}
                </a>
            ),
        },
        {
            field: 'readRole',
            headerName: '읽기 권한',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => handleUpdatePermission(params.row.boardId, 'readRole', e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            ),
        },
        {
            field: 'writeRole',
            headerName: '쓰기 권한',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => handleUpdatePermission(params.row.boardId, 'writeRole', e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            ),
        },
        {
            field: 'commAllowYn',
            headerName: '댓글 여부',
            width: 150,
            renderCell: (params) => (
                <select
                    value={params.value}
                    onChange={(e) => handleUpdatePermission(params.row.boardId, 'commAllowYn', e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            ),
        }
    ].map(col => ({ ...col, sortable: false }));

    return (
        <Wrapper style={{textAlign: 'center'}}>
            {loading ? (
                <LoadingContainer>로딩중...</LoadingContainer>
            ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={boards}
                        getRowId={(row) => row.boardId.toString()}
                        hideFooter
                        disableColumnMenu
                    />
                )}
        </Wrapper>
    );
}
export default BoardList;