import {useState} from "react";
import {SERVER_URL} from "../../Common/constants";


function PayStatusCell(props) {
    const [isPaymentButtonClicked, setPaymentButtonClicked] = useState(false);

    const handlePaymentConfirmation = async (rentHistNum) => {
        try {
            const response = await fetch(`${SERVER_URL}rent`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const rawRentHistData = await response.json();
            if (rawRentHistData) {
                const formattedData = rawRentHistData.map(item => ({ id: item.rentHistNum, ...item }));
                setRentHist(formattedData.reverse());
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
        setPaymentButtonClicked(false);
    };

    const {value, row, onPayment, rentHist, setRentHist} = props;

    if (isPaymentButtonClicked) {
        return (
            <button onClick={() => handlePaymentConfirmation(row.rentHistNum)}>
                결제 확인
            </button>
        );
    }

    const handlePaymentButtonClick = () => {
        if (row.applyStatus !== 'APPROVE') {
            alert('승인 상태가 아니면 결제가 불가능 합니다!');
            return;
        }
        setPaymentButtonClicked(true);
        onPayment(row);
    }

    switch (value) {
        case 'WAIT':
            return (
                <button onClick={handlePaymentButtonClick}>
                    결제 하기
                </button>
            );
        case 'COMPLETE':
            return '결제 완료';
        default:
            return value;
    }
}

export default PayStatusCell;