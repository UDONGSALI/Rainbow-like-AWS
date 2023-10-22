import React, {useEffect, useState} from "react";

import {DataGrid} from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {SERVER_URL} from "../../Common/constants";
import SpaceModal from "./SpaceModal";


function SpaceList() {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);


    const columns = [
        {field: 'spaceName', headerName: '이름', width: 200},
        {field: 'maxPerson', headerName: '최대인원', width: 100},
        {field: 'spaceUsage', headerName: '공간용도', width: 200},
        {field: 'rentTime', headerName: '대관시간', width: 100},
        {field: 'rentFee', headerName: '이용료', width: 100},
        {field: 'facilities', headerName: '구비시설', width: 200},

    ];

    useEffect(() => {
        fetch(SERVER_URL + 'api/spaces')
            .then(response => response.json())
            .then(data => {
                setSpaces(data._embedded.spaces);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);


    return (

        <div>

            {loading ? (
                <p>Loading....</p>
            ) : (
                <DataGrid className="spaceList"
                          columns={columns}
                          rows={spaces}
                          getRowId={(row) => row._links.self.href}
                          style={{
                              position:"relative",
                              width :"100%",
                              paddingLeft:"15%",
                              paddingRight:"15%",
                          }}
                />
            )}
            <SpaceModal/>
        </div>
    );
}

export default SpaceList;