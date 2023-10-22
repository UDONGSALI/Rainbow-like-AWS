import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styles from '../../../css/component/Edu/EduDetail.module.css';
import {SERVER_URL} from '../Common/constants';

function EduDetail() {
    const [eduData, setEduData] = useState(null);
    const [files, setFiles] = useState([]);
    const {eduNum} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(SERVER_URL + `files/eduNum/${eduNum}`)
            .then((response) => response.json())
            .then((data) => setFiles(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch(SERVER_URL + `api/edus/` + eduNum)
            .then((response) => response.json())
            .then((data) => setEduData(data))
            .catch(error => {
                alert("존재하지 않는 교육입니다!"); // 알림 메시지 표시
                window.location.href = "/edu/list";
            });
    }, [eduNum]);

    const formatDateAndTime = (inputDate) => {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}`
        };
    };
    const renderDateRange = (startDate, endDate) => {
        const start = formatDateAndTime(startDate);
        const end = formatDateAndTime(endDate);

        if (start.date === end.date) {
            return `${start.date} ${start.time} ~ ${end.time}`;
        } else {
            return `${start.date} ${start.time} ~ ${end.date} ${end.time}`;
        }
    };

    const getRecuMethodDescription = (method) => {
        switch (method) {
            case "FIRST_COME":
                return "선착순";
            case "ADMIN_APPROVAL":
                return "관리자 승인";
            default:
                return method;
        }
    };

    const getTypeTitleAndStyle = (type) => {
        switch (type) {
            case "EDU":
                return {title: "교육", className: styles.typeEDU};
            case "BUSINESS":
                return {title: "사업", className: styles.typeBUSINESS};
            default:
                return {title: type, className: ""};
        }
    };

    const isWithinApplicationPeriod = (startDateString, endDateString) => {
        const now = new Date();
        const start = new Date(startDateString);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDateString);
        end.setHours(23, 59, 59, 999);
        return now >= start && now <= end;
    };

    const isBelowMaxApplicants = (recuPerson, capacity) => {
        return recuPerson < capacity;
    };

    const handleApplyButtonClick = () => {
        navigate(`/edu/list/apply/${eduNum}`);
    };

    // Define filteredFiles here
    const filteredFiles = useMemo(
        () => files.filter(file => file.edu && file.edu.eduNum == eduNum),
        [files, eduNum]
    );

    return (
            <div className={styles.container}>
                {eduData ? (
                    <div>
                        <div className={styles.headerContent}>
                            <div className={styles.leftTop}>
                                {filteredFiles[0] && <img src={filteredFiles[0].fileUri} alt="First Image"/>}
                            </div>
                            <div className={styles.rightTop}>
                                <h1 className={styles.header}>
                                <span className={getTypeTitleAndStyle(eduData.type).className}>
                                    <strong>{getTypeTitleAndStyle(eduData.type).title}</strong>
                                </span>&nbsp;&nbsp;&nbsp;{eduData.eduName}
                                </h1>
                                <p className={styles.detail}><strong>교육
                                    일시:</strong> {renderDateRange(eduData.eduStdt, eduData.eduEddt)}</p>
                                <p className={styles.detail}><strong>장소:</strong> {eduData.eduAddr}</p>
                                <p className={styles.detail}><strong>대상:</strong> {eduData.target}</p>
                                <p className={styles.detail}><strong>신청
                                    기간:</strong> {eduData.recuStdt} ~ {eduData.recuEddt}</p>
                                <p className={styles.detail}><strong>신청
                                    방법:</strong> {getRecuMethodDescription(eduData.recuMethod)}</p>
                                <p className={styles.detail}><strong>문의 전화번호:</strong> {eduData.tel}</p>
                                {isWithinApplicationPeriod(eduData.recuStdt, eduData.recuEddt) && isBelowMaxApplicants(eduData.recuPerson, eduData.capacity) && (
                                    <div style={{display:"flex", justifyContent:"center", marginRight:'50px'}}>
                                    <button className={styles.applyButton}
                                            onClick={handleApplyButtonClick}>신청하기</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <br/>
                        <hr/>
                        <br/>
                        <div className={styles.mainContent}>
                            {filteredFiles[1] && <img src={filteredFiles[1].fileUri} alt="Second Image"/>}
                            <br/>
                            <p className={styles.detailContent}>{eduData.content}</p>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
    );
}

export default EduDetail;