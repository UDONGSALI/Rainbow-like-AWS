import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../Common/constants";
import styles from "../../../../css/component/Main/Edu/ThumbnailComponent.module.css";
import { useNavigate } from "react-router-dom";
import replace from '../../../../img/component/Main/replace.jpg';

const STATUS_MAP = {
    waiting: { text: '접수대기', className: styles.waiting },
    ongoing: { text: '접수중', className: styles.ongoing },
    closed: { text: '접수마감', className: styles.closed }
};

const TYPE_MAP = {
    EDU: { text: "교육", className: styles.eduType },
    BUSINESS: { text: "사업", className: styles.businessType }
};

function getStatus(currentDate, recuStdt, recuEddt) {
    const startDate = new Date(recuStdt);
    const endDate = new Date(recuEddt);

    if (currentDate < startDate) return 'waiting';
    if (currentDate <= endDate) return 'ongoing';
    return 'closed';
}

function ThumbnailComponent({ basicEdus }) {
    const [edus, setEdus] = useState([]);
    const navigate = useNavigate();
    const currentDate = new Date();
    const navigateToDetail = (eduNum) => navigate(`/edu/list/detail/${eduNum}`);

    useEffect(() => {
        const fetchDataForEdu = async (edu) => {
            const response = await fetch(`${SERVER_URL}files/eduNum/${edu.eduNum}`);
            const data = await response.json();
            return { ...edu, files: data };
        };

        Promise.all(basicEdus.map(fetchDataForEdu))
            .then(updatedEdus => setEdus(updatedEdus));

    }, [basicEdus]);

    return (
        <div className={styles.thumbnailContainer}>
            {edus.map((edu, index) => {
                const status = STATUS_MAP[getStatus(currentDate, edu.recuStdt, edu.recuEddt)];
                const type = TYPE_MAP[edu.type] || { text: edu.type, className: "" };

                return (
                    <div key={index} className={styles.thumbnailItem} onClick={() => navigateToDetail(edu.eduNum)}>
                        <div className={styles.imageFrame}>
                            <img src={edu.files?.[0]?.fileUri || replace} alt={edu.title} className={styles.thumbnailImage} />
                            <div className={styles.statusBox}>
                                <span className={status.className}>{status.text}</span>
                            </div>
                        </div>
                        <div className={styles.thumbnailText}>
                            <h6 className={type.className}>{type.text}</h6>
                            <h5><strong>{edu.eduName}</strong></h5>
                            <p>🕒{edu.recuStdt} ~ {edu.recuEddt}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ThumbnailComponent;
