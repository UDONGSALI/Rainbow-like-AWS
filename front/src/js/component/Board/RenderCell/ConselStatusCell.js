import React from 'react';

function ConselStatusCell({ params }) {
    const statusMapping = {
        WAIT: '대기',
        APPROVE: '승인',
        REJECT: '거절',
        COMPLETE: '완료'
    };

    return <span>{statusMapping[params.value]}</span>;
}

export default ConselStatusCell;