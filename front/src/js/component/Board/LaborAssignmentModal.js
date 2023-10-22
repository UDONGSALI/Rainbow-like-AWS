import {DataGrid} from '@mui/x-data-grid';
import {Modal} from '@mui/material';
import useFetch from "../hook/useFetch";
import usePatch from "../hook/usePatch";
import {SERVER_URL} from "../Common/constants";
import styled from '@emotion/styled';
import React, {useState} from "react";
import {useConfirm} from "../hook/useConfirm";

function LaborAssignmentModal({open, onClose, postNum, onAssignSuccess}) {
    const {data: members, loading} = useFetch(`${SERVER_URL}members/search/type/LABOR`);
    const patchItem = usePatch(SERVER_URL);
    const confirm = useConfirm();
    const [isSwalOpen, setIsSwalOpen] = useState(false);

    const handleAssignLabor = async (memId) => {
        setIsSwalOpen(true);
        const isConfirmed = await confirm("이 노무사를 배정 하시겠습니까?");
        if (!isConfirmed) return;


        const isSuccess = await patchItem(`post/patch/` + postNum, {action: "labor", laborId: memId}, '배정');
        if (isSuccess) {
            onAssignSuccess(postNum, memId);
            onClose();
        }
        setIsSwalOpen(false);
    };

    const columns = [
        {
            field: 'memNum',
            headerName: '번호',
            width: 40
        },
        {field: 'memId', headerName: '아이디', width: 100},
        {field: 'name', headerName: '이름', width: 100},
        {field: 'bir', headerName: '생년월일', width: 100},
        {field: 'tel', headerName: '전화번호', width: 120},
        {
            field: 'gender',
            headerName: '성별',
            width: 50,
            renderCell: (row) => (
                <div>{row.value === 'FEMALE' ? '여자' : row.value === 'MALE' ? '남자' : ''}</div>
            ),
        },
        {field: 'email', headerName: '이메일', width: 130},
        {field: 'jdate', headerName: '가입일', width: 100},
        {
            field: 'assign',
            headerName: '배정',
            width: 100,
            renderCell: (params) => (
                <button onClick={() => handleAssignLabor(params.row.memId)}>배정</button>
            )
        }
    ];

    return (
        !isSwalOpen && (
            <Modal
                open={open}
                onClose={onClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{maxHeight: '500px', overflowY: 'auto', backgroundColor: 'white', padding: '20px'}}>
                    {loading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '200px'
                        }}>로딩중...</div>
                    ) : (
                        <StyledDataGrid
                            rows={members}
                            columns={columns}
                            getRowId={(row) => row.memNum}
                            hideFooter={true}
                        />
                    )}
                </div>
            </Modal>
        )
    );
}


const StyledDataGrid = styled(DataGrid)`

  width: 100%;

  & .MuiDataGrid {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .MuiDataGrid-columnHeader {
    background-color: #ececec; // 옅은 회색으로 설정
  }

  & .MuiDataGrid-columnHeaderTitle {
    font-size: 14px;
  }

  & .MuiDataGrid-columnHeaderTitleContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
  }

  & .MuiDataGrid-cell {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 3px 5px;
    margin: 0 5px;
    border: none;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }

  & .MuiDataGrid-cell[data-field="eduName"] {
    justify-content: left;
  }

  & .typeCell {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    &.BUSINESS {
      color: #855cdc;
    }

    &.EDU {
      color: #1e6bfa;
    }
  }

  & .eduNameCell {
    cursor: pointer;
    white-space: nowrap; // 내용을 한 줄에 표시
    overflow: hidden; // 내용이 넘치면 숨김
    text-overflow: ellipsis; // 넘치는 내용을 '...'로 표시
    max-width: 280px; // 셀의 최대 너비. 필요에 따라 조절하세요.
  }

  & .statusCell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 3px;

    &.WAITING {
      background-color: #a38ced;
      color: white; // 글자 색상 추가
    }

    &.PROCESSING {
      background-color: #53468b;
      color: white; // 글자 색상 추가
    }

    &.REGISTRATION_CLOSED {
      background-color: gray;
      color: white; // 글자 색상 추가
    }

    &.REGISTRATION_OPEN {
      background-color: #5ae507;
      color: white; // 글자 색상 추가
    }
  }
`;

export default LaborAssignmentModal;