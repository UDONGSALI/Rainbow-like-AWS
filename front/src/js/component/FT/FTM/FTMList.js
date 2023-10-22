import React, {useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {SERVER_URL} from "../../Common/constants";
import {useNavigate } from 'react-router-dom';
import styles from '../../../../css/component/Club/ClubList.module.css';

function FTMList(){
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () =>{
        fetch(SERVER_URL + "ftm")
            .then(response =>
                response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch(err => console.error(err));
    };


    const columns = [
        {
            field: 'ftmNum',
            headerName: '매칭번호',
            width: 200,
        },{
            field: 'ftConsumer',
            headerName: '신청번호',
            width: 200,
            valueGetter: (params) => {
                const consumers = Array.isArray(params.row.ftConsumer) ? params.row.ftConsumer : [params.row.ftConsumer];
                return consumers.map((c) => c.ftConsumerNum).join(', ');
            }
        },
        {
            field: 'ftWorker',
            headerName: '매칭된 인재번호',
            width: 200,
            valueGetter: (params) => {
                const workers = Array.isArray(params.row.ftWorker) ? params.row.ftWorker : [params.row.ftWorker];
                return workers.map((c) => c.ftWorkerNum).join(', ');
            }

        },


        {
            field: 'links.self.href',
            headerName: '확인',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <button
                    style={{ cursor: 'pointer' }}
                    onClick={() => onDtlClick(params)}
                >
                    {params.value}
                    매칭확인
                </button>
            ),
        },

    ];

    const onDtlClick = (params) => {
        const consumers = Array.isArray(params.row.ftConsumer) ? params.row.ftConsumer : [params.row.ftConsumer];
        const rowId = consumers.map((c) => c.ftConsumerNum).join(', ');
        navigate(`/ftc/${rowId}`);
    };


    const onRowClick = (params) => {
        console.log(params.row.ftConsumerNum);
        const rowId = params.row.ftConsumerNum;
        navigate(`/ftc/${rowId}`);
    };

    return(
        <div className={styles.List}>
            <button  onClick = {() => navigate('/ftmain')}>DB 메인</button>

            <DataGrid columns={columns}
                      rows={posts}
                      disableRowSelectionOnClick={true}
                      getRowId={row => row.ftmNum}
            />


        </div>
    );
}

export default FTMList;