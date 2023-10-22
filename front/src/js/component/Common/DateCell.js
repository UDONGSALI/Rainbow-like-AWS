function DateCell(params) {
    const dateValue = params.value;
    if (!dateValue) return null;

    const withoutMicroseconds = dateValue.split('.')[0]; // 마침표('.')를 기준으로 나누고 첫 번째 부분만 가져옵니다.
    return withoutMicroseconds.replace("T", " ");
}

export default DateCell;