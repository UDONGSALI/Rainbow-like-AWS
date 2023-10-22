function CurrencyCell(params) {
    const fee = params.value;

    if (fee === null || fee === undefined) return null;

    const formattedFee = new Intl.NumberFormat('ko-KR').format(fee) + '원';
    return formattedFee;
}

export default CurrencyCell;