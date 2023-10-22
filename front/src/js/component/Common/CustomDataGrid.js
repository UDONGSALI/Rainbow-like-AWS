import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Pagination from './Pagination';
import Stack from '@mui/material/Stack';

const CustomDataGrid = (props) => {
    const {components, ...otherProps} = props;

    const CustomFooter = () => (
        <div style={{ background: '#ffffff', textAlign: 'center',display: 'flex', justifyContent: 'center' }}>

        </div>
    );

    return <DataGrid components={{...components, footer: CustomFooter}} {...otherProps} />;
};

export default CustomDataGrid;