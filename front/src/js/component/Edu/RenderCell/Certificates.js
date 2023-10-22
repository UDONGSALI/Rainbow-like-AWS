import React from "react";
import { Global, css } from "@emotion/react"; // 여기서 Global과 css를 가져옵니다.
import styled from "@emotion/styled";

function Certificates({ name, eduName, isOpen, onClose }) {
    if (!isOpen) return null;

    const currentDate = new Date();

    const handlePrint = () => {
        window.print(); // 현재 페이지를 출력합니다.
    };

    return (
        <ModalBackground className="printModal" onClick={onClose}>
            <Global styles={globalPrintStyles} />
            <CertificateWrapper onClick={e => e.stopPropagation()}>
                <CertificateTitle>수료증</CertificateTitle><br/>
                <CertificateText>성명: {name}</CertificateText>
                <CertificateText>프로그램명: {eduName}</CertificateText>
                <CertificateText>
                    위 사람은 성실히 프로그램을 이수하였기에 이 증서를 수여 합니다.
                </CertificateText>
                <CertificateDate>
                    {currentDate.getFullYear()}.{currentDate.getMonth() + 1}.{currentDate.getDate()}
                </CertificateDate>
                <CertificateIssuer>세종여성플라자</CertificateIssuer>
                <PrintButton className="printHide" onClick={handlePrint}>출력하기</PrintButton>
            </CertificateWrapper>
        </ModalBackground>
    );
}

const PrintButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #a38ced; /* 연한 보라색 */
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  margin: 0 auto;

  &:hover {
    background-color: #53468b; /* 호버 시 좀 더 진한 보라색 */
    transform: translateY(-2px); /* 호버 시 버튼을 위로 약간 움직입니다 */
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2); /* 호버 시 그림자를 조금 줄입니다 */
  }

  &:active {
    background-color: #a38ced; /* 연한 보라색 */
    transform: translateY(2px); /* 버튼을 클릭할 때 아래로 약간 움직입니다 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 버튼을 클릭할 때 그림자를 더 줄입니다 */
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CertificateWrapper = styled.div`
  width: 60%;
  border: 3px double #3a3a3a;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px 40px;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fdfcfb;
  background-image: url('https://www.transparenttextures.com/patterns/paper.png'); // 배경 이미지 추가
`;

const CertificateTitle = styled.h2`
  text-align: center;
  font-family: 'Playfair Display', serif; // Google Fonts에서 가져온 폰트
  font-size: 2.5em; // 글자 크기를 약간 늘림
  font-weight: bold;
  border-bottom: 2px solid #3a3a3a;
  padding-bottom: 25px;
`;

const CertificateText = styled.p`
  font-size: 30px;
  font-family: 'Playfair Display', serif; // Google Fonts에서 가져온 폰트
  line-height: 1.5;
  text-align: left;
`;

const CertificateDate = styled.p`
  text-align: right;
  font-size: 26px;
  font-family: 'Playfair Display', serif; // Google Fonts에서 가져온 폰트
`;

const CertificateIssuer = styled.p`
  text-align: right;
  margin-top: 20px;
  font-size: 16px;
  font-family: 'Playfair Display', serif; // Google Fonts에서 가져온 폰트
  font-weight: bold;
  
`;
const globalPrintStyles = css`
  @media print {
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }

    body * {
      visibility: hidden;
    }

    .printModal, .printModal * {
      visibility: visible !important;
    }

    /* 출력하기 버튼을 숨깁니다 */
    .printHide {
      display: none !important;
    }

    /* 모달 크기와 위치 조정 */
    .printModal {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .printModal > div {
      max-width: 90%;
      margin: auto; // 중앙 정렬을 위한 설정
    }
  }
`;

export default Certificates;