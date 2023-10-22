import {useEffect, useState} from "react"
import {loadPaymentWidget} from "@tosspayments/payment-widget-sdk"
import {useParams} from "react-router-dom";
import {SERVER_URL} from '../Common/constants'
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
const customerKey = "YbX2HuSlsC9uVJW6NMRMj"

export default function Pay() {
    const {rentHistNum, fee} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);


    const handlePayment = async () => {
        setIsLoading(true);  // 로딩 상태 활성화

        setTimeout(async () => {
            setIsLoading(false);  // 로딩 상태 비활성화
            setIsPaymentComplete(true);  // 결제 완료 상태 활성화

            try {
                const response = await fetch(`${SERVER_URL}pay`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rentHistNum,
                        fee
                    }),
                });

                if (!response.ok) {
                    throw new Error('Payment failed!');
                }

                const data = await response.json();

            } catch (error) {
                console.error("There was an error with the payment:", error);
            }
        }, 3000);
    };

    useEffect(() => {
        if (isPaymentComplete) {
            alert('결제 되었습니다!');
            window.close();  // 팝업 창 닫기
        }
    }, [isPaymentComplete]);


    useEffect(() => {
        (async () => {
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey)

            paymentWidget.renderPaymentMethods("#payment-widget")
        })()
    }, [])

    return (
        <div className="pay" style={{
            width:'450px',
            height:'600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin:'20px',
            marginTop: '25px',
            marginLeft:'25px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            borderRadius:'5px'
        }}>
            <div style={{
                width:'80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:'5px'
            }}>
                <h1>대관비 결제</h1>
                <h3>{fee}원</h3>
            </div>
            {isLoading ? (
                <>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <img src="https://storage.googleapis.com/rainbow_like/img/paying.gif" alt="Loading"/>
                </>
            ) : (
                <>
                    <div id="payment-widget" style={{width: '100%'}}/>
                    <button style={{border: "none", fontSize: '18px', padding:'5px 20px'}} onClick={handlePayment}>
                        결제하기
                    </button>
                </>
            )}
        </div>
    );
}
