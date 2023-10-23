import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';
import CustomDataGrid from "../../Common/CustomDataGrid";

function FTWList({ ftcNum, checkedRows, setCheckedRows }) {
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const ftmMode = ftcNum != null;
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    // const [checkedRows, setCheckedRows] = useState({}); // 개별 체크 상태를 저장하는 객체


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "ftw")
            .then(response =>
                response.json())
            .then((data) => {
                // 필터링: delYN이 'N'인 게시물만 남김
                const filteredPosts = data.filter((post) => post.delYN === 'N');
                setPosts(filteredPosts);

            })
            .catch(err => console.error(err));
    };



    const columns = [

        {
            field: 'ftWorkerNum',
            headerName: 'DB',
            width: 50,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'member',
            headerName: '인재명',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            valueGetter: (params) => {
                const members = Array.isArray(params.row.member) ? params.row.member : [params.row.member];
                return members.map((m) => m.name).join(', ');
            }
        },
        {
            field: 'speField',
            headerName: '분류',
            width: 200,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => onRowClick(params)}
                >
                    {params.value}
                </div>
            ),
        },
        {
            field: 'licenseYN',
            headerName: '자격증 유무',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'ftStatus',
            headerName: '등록여부',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'statusDtl',
            headerName: '거부사유',
            width: 300,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            flex: 1,
        },


    ];

    //조건부 컬럼 설정
    const checkboxColumn = {
        field: 'checkbox',
        headerName: '체크박스',
        width: 120,
        sortable: false,
        filterable: false,
        headerClassName: styles.customHeader,
        cellClassName: styles.customCell,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
            // ftStatus가 '승인'인 경우에만 체크박스를 출력
            params.row.ftStatus === '승인' && (
                <input
                    type="checkbox"
                    checked={!!checkedRows[params.row.ftWorkerNum]}
                    onChange={() => handleRowCheckboxChange(params)}
                />
            )
        ),
    };

// 조건부로 체크박스 컬럼을 추가
    if (ftmMode) {
        columns.unshift(checkboxColumn);
    }

    // ftmMode가 false일 때만 수정 버튼과 삭제 버튼 컬럼을 추가
    if (!ftmMode) {
        columns.push(
            // 수정 버튼 컬럼 정의
            {
                field: 'links.self.href',
                headerName: '수정',
                sortable: false,
                filterable: false,
                headerClassName: styles.customHeader,
                cellClassName: styles.customCell,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => (
                    <div className={styles.btn}>
                        <button
                            style={{ cursor: 'pointer' }}
                            onClick={() => onEditClick(params)}
                        >
                            {params.value}
                            수정
                        </button>
                    </div>
                ),
            },
            // 삭제 버튼 컬럼 정의
            {
                field: '_links.self.href',
                headerName: '삭제',
                sortable: false,
                filterable: false,
                headerClassName: styles.customHeader,
                cellClassName: styles.customCell,
                align: 'center',
                headerAlign: 'center',
                renderCell: (params) => (
                    <div className={styles.btn}>

                        <button
                            onClick={() => onDelClick(params.row)}
                        >
                            삭제
                        </button>
                    </div>
                ),
            }
        );
    }

    const onDelClick = (post) => {
        const updatedPostData = {
            memNum: post.member.memNum,
            speField: post.speField,
            licenseYN: post.licenseYN,
            licenseDtl: post.licenseDtl,
            ftDtl: post.ftDtl,
            ftStatus: post.ftStatus,
            statusDtl: post.statusDtl,
            writeDate: post.writeDate,
            editDate: new Date(),
            delYN : 'Y'
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "ftw/edit/" + post.ftWorkerNum, {
            method: 'PUT', // PUT 요청을 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert('게시글을 삭제했습니다.');
                fetchPosts();
                setOpen(true);

            })
            .catch((error) => {
                console.error('게시글 삭제 중 오류 발생:', error);
            });
    };

    const handleRowCheckboxChange = (params) => {
        const { ftWorkerNum } = params.row;

        // 개별 체크 상태를 복사한 후 해당 행의 체크 상태를 설정
        const newCheckedRows = { ...checkedRows };
        newCheckedRows[ftWorkerNum] = !newCheckedRows[ftWorkerNum]; // 상태를 토글

        if (!newCheckedRows[ftWorkerNum]) {
            // 체크 해제된 경우, 해당 행의 체크 상태를 삭제
            delete newCheckedRows[ftWorkerNum];
        }

        setCheckedRows(newCheckedRows);
    };

    const onEditClick = (params) => {

        const rowId = params.row.ftWorkerNum;
        navigate(`/ftw/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        const rowId = params.row.ftWorkerNum;
        if (ftmMode) {
            const popupWindow = window.open(`/ftw/dtl/${rowId}`, '_blank', 'width=1000,height=600');
        } else {
            navigate(`/ftw/dtl/${rowId}`);
        }
    };

    function CustomNoRowsOverlay() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontWeight: 'bold',
                    flexDirection: 'column',
                }}
            >
                <p>데이터가 없습니다.</p>
            </div>
        );
    }

    return(
        <div className={styles.List} style={{ height: 500, width: '100%' }}>
            { ftmMode?
                <div className={styles.ftmPage}>
                    <h3>선택된 인재</h3>
                    <ul>
                        {Object.keys(checkedRows).map(rowId => (
                            <li key={rowId}>
                                {rowId}: {posts.find(post => post.ftWorkerNum === parseInt(rowId))?.member.name},
                                {posts.find(post => post.ftWorkerNum === parseInt(rowId))?.speField},
                                {posts.find(post => post.ftWorkerNum === parseInt(rowId))?.member.email}
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <div class={styles.btn}>
                    <button onClick={() => {
                        const path = isAdmin ? '/admin/ftmain' : '/ftmain';
                        navigate(path);
                    }}>
                        DB 메인
                    </button>
                </div>
            }
            <CustomDataGrid
                className={styles.customDataGrid}
                columns={columns}
                rows={posts}
                disableRowSelectionOnClick={true}
                getRowId={row => row.ftWorkerNum}
                pageSize={5} // 페이지당 5개의 행을 보여줍니다.
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay
                }}
                pagination={true}
                sortModel={[
                    {
                        field: "number",
                        sort: "desc", // 내림차순 정렬
                    },
                ]}
            />
        </div>
    );
}

export default FTWList;