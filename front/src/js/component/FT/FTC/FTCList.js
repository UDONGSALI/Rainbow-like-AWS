import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';
import CustomDataGrid from "../../Common/CustomDataGrid";

function FTCList(){
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "ftc")
            .then(response =>
                response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch(err => console.error(err));
    };


    const columns = [
        {
            field: 'ftConsumerNum',
            headerName: 'DB',
            width: 50,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'member',
            headerName: '신청자',
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

        },

        {
            field: 'ftmYN',
            headerName: '매칭여부',
            width: 100,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'statusDtl',
            headerName: '거부사유',
            width: 500,
            headerClassName: styles.customHeader,
            cellClassName: styles.customCell,
            align: 'center',
            headerAlign: 'center',
            flex : 1,
        },
    ];

    const onEditClick = (params) => {

        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/edit/${rowId}`);
    };


    const onRowClick = (params) => {
        console.log(params.row.ftConsumerNum);
        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/dtl/${rowId}`);
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
            <div className={styles.btn}>
            <button onClick={() => {
                const path = isAdmin ? '/admin/ftmain' : '/ftmain';
                navigate(path);
            }}>
                DB 메인
            </button>
            </div>

            <CustomDataGrid
                className={styles.customDataGrid}
                columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.ftConsumerNum}
                      onRowClick={onRowClick}
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

export default FTCList;