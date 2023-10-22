import React, { useEffect, useState } from "react";
import FileUpload from "../Common/FileUpload";
import { SERVER_URL } from "../Common/constants";
import { useNavigate } from 'react-router-dom';
import styles from '../../../css/component/Club/ClubForm.module.css';

const formatDate = (dateObj, time = false) => {
    const formattedDate = [
        dateObj.getFullYear(),
        String(dateObj.getMonth() + 1).padStart(2, '0'),
        String(dateObj.getDate()).padStart(2, '0')
    ].join('-');
    if (time) {
        const timePart = [
            String(dateObj.getHours()).padStart(2, '0'),
            String(dateObj.getMinutes()).padStart(2, '0')
        ].join(':');
        return `${formattedDate}T${timePart}`;
    }
    return formattedDate;
};

const EduForm = ({ eduNum }) => {
    const currentDate = new Date();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: '',
        eduName: '',
        content: '',
        eduStdt: formatDate(currentDate, true),
        eduEddt: formatDate(currentDate, true),
        eduAddr: '',
        target: '',
        recuStdt: formatDate(currentDate),
        recuEddt: formatDate(currentDate),
        capacity: 0,
        recuPerson: 0,
        recuMethod: '',
        tel: ''
    });
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const fetchEduData = async () => {
            if (eduNum) {
                const response = await fetch(`${SERVER_URL}api/edus/${eduNum}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error("Failed to fetch the education data");
                }
            }
        };
        fetchEduData();
    }, [eduNum]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (files) => setSelectedFiles(files);

    const handleFileUpload = async (table, number) => {
        if (selectedFiles.length > 0) {
            const formDataWithFiles = new FormData();
            for (const file of selectedFiles) {
                formDataWithFiles.append('file', file);
            }
            formDataWithFiles.append('tableName', table);
            formDataWithFiles.append('number', number);
            const response = await fetch(`${SERVER_URL}files`, {
                method: 'POST',
                body: formDataWithFiles,
            });
            if (!response.ok) throw new Error(await response.text());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eduNum) {
                await fetch(`${SERVER_URL}files/eduNum/${eduNum}`, {
                    method: 'DELETE'
                });
                const response = await fetch(`${SERVER_URL}api/edus/${eduNum}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    alert('정보가 수정되었습니다.');
                    await handleFileUpload("edu", eduNum);
                    navigate(`/edu/list/detail/${eduNum}`);
                } else {
                    throw new Error(await response.text());
                }
            } else {
                const response = await fetch(`${SERVER_URL}api/edus`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    alert('교육이 등록되었습니다.');
                    await handleFileUpload("edu", 0);
                    navigate(`/admin/edu`);
                } else {
                    throw new Error(await response.text());
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderInput = (type, name, placeholder, isRequired = true) => (
        <div className={styles.inputGroup}>
            {placeholder && <label htmlFor={name}>{placeholder}:</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={isRequired}
            />
        </div>
    );

    return (
        <div className={styles.registrationFormContainer}>
            <h2>교육 등록 · 수정</h2>
            <form onSubmit={handleSubmit} className={styles.registrationForm}>
                {renderInput("text", "eduName", "교육 이름")}
                <div className={styles.inputGroup}>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        style={{width:'100%'}}
                    >
                        <option value="">유형 선택</option>
                        <option value="EDU">교육</option>
                        <option value="BUSINESS">사업</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <select
                        id="recuMethod"
                        name="recuMethod"
                        value={formData.recuMethod}
                        onChange={handleChange}
                        required
                        style={{width:'100%'}}
                    >
                        <option value="">모집 방법 선택</option>
                        <option value="FIRST_COME">선착순</option>
                        <option value="ADMIN_APPROVAL">관리자 승인</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="내용"
                        required
                    />
                </div>
                {renderInput("datetime-local", "eduStdt", "교육 시작일시")}
                {renderInput("datetime-local", "eduEddt", "교육 종료일시")}
                {renderInput("text", "eduAddr", "주소")}
                {renderInput("text", "target", "대상")}
                {renderInput("date", "recuStdt", "모집 시작일")}
                {renderInput("date", "recuEddt", "모집 종료일")}
                {renderInput("number", "capacity", "정원")}
                {renderInput("text", "tel", "연락처")}
                <div className={styles.inputGroup}>
                    <label>첫번째 사진은 썸네일을 업로드 해 주세요!</label>
                    <FileUpload onFileChange={handleFileChange} maxSize={1} maxCount={2} acceptedFormats={['image/*']} />
                </div>
                <button type="submit">정보 등록</button>
            </form>
        </div>
    );
};

export default EduForm;
