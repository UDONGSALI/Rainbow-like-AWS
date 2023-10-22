export default function renderApprovalStatusCell(params, isAdmin, handleStatusChange) {
    const statusText = {
        WAIT: '미승인',
        APPROVE: '승인',
        COMPLETE: '완료'
    }[params.value] || params.value;

    return isAdmin ? (
        <select
            value={params.value}
            onChange={(e) => handleStatusChange(params.row.eduHistNum, e.target.value)}
            className={`approvalStatus ${params.value}`}
        >
            <option value="WAIT">대기</option>
            <option value="APPROVE">승인</option>
            <option value="COMPLETE">완료</option>
        </select>
    ) : (
        <div className={`approvalStatus ${params.value}`}>
            {statusText}
        </div>
    );
}