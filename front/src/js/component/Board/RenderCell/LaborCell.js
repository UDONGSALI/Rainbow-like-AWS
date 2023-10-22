import React from 'react';

function LaborCell({ params, handleMemIdClick, handleCancelAssignment, handleOpenLaborModal, setSelectedPostNum }) {
    if (params.row.parentsNum) {
        return null;
    }
    if (params.row.conselStatus === "COMPLETE") {
        return params.row.labor?.memId ? (
            <span
                onClick={() => handleMemIdClick(params.row.labor)}
                style={{ cursor: "pointer" }}
            >
                {params.row.labor.memId}
            </span>
        ) : null;
    }

    return params.row.labor?.memId ? (
        <>
            <span
                onClick={() => handleMemIdClick(params.row.labor)}
                style={{ cursor: "pointer", marginRight: '10px' }}
            >
                {params.row.labor.memId}
            </span>
            <button onClick={() => handleCancelAssignment(params.row.postNum)}>
                취소
            </button>
        </>
    ) : (
        <button onClick={() => {
            handleOpenLaborModal();
            setSelectedPostNum(params.row.postNum);
        }}>
            노무사 배정
        </button>
    );
}

export default LaborCell;
