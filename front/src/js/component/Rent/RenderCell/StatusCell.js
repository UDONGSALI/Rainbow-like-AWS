import React from 'react';

function StatusCell({ handleStatusChange, params }) {
    const handleChange = (event) => {
        handleStatusChange(params.row.rentHistNum || params.row.postNum, event.target.value);
    };

    const defaultOptions = [
        { label: "대기", value: "WAIT" },
        { label: "승인", value: "APPROVE" },
        { label: "거부", value: "REJECT" }
    ];

    return (
        <select defaultValue={params.value} onChange={handleChange}>
            {defaultOptions.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default StatusCell;