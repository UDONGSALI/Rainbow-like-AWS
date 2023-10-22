import Error from '../../img/component/Error/error.jpg'
import styled from 'styled-components';

function ErrorPage() {


    return (
        <ErrorContainer>
            <ErrorImage src={Error} alt="Error Image"/>
        </ErrorContainer>
    )
}

const ErrorContainer = styled.div`
    width: 60%;       /* 화면의 너비 전체로 설정 */
    height: 100%;      /* 화면의 높이 전체로 설정 */
    overflow: hidden;   /* 이미지가 컨테이너를 벗어나지 않게 함 */
    position: relative; /* 이미지 위치 조정을 위해 설정 */
    margin: 0 auto;
`;

const ErrorImage = styled.img`
    width: 100%;        /* 이미지의 너비를 100%로 설정 */
    height: 100%;       /* 이미지의 높이를 100%로 설정 */
    object-fit: cover;  /* 이미지가 화면에 꽉 차게 표시되도록 설정 */
`;

export default ErrorPage;