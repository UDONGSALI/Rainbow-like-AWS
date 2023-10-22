import React, { useState } from 'react';

function FileUpload({ onFileChange, maxSize = 5, maxCount = 5, acceptedFormats = [], noFileMessage }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    // maxSize를 MB에서 bytes로 변환
    const maxSizeInBytes = maxSize * 1024 * 1024;

    const handleFileChange = (e) => {
        const files = e.target.files;

        if (!files || files.length === 0) {
            alert('파일을 선택해주세요.');
            e.target.value = null;
            return;
        }

        if (files.length > maxCount) {
            alert(`최대 ${maxCount}개의 파일만 선택 가능합니다.`);
            e.target.value = null;
            return;
        }

        const oversizedFiles = Array.from(files).filter(file => file.size > maxSizeInBytes);

        if (oversizedFiles.length > 0) {
            // 초과한 파일들의 이름을 가져와 메시지로 표시
            const oversizedFileNames = oversizedFiles.map(file => file.name).join(', ');
            alert(`다음 파일(들)의 크기가 제한 (${maxSize}MB)을 초과합니다: ${oversizedFileNames}`);
            e.target.value = null;
            return;
        }

        setSelectedFiles(Array.from(files));
        onFileChange(Array.from(files));
    };

    return (
        <div className="input-group">
            <input
                type="file"
                name="file"
                multiple
                onChange={handleFileChange}
                accept={acceptedFormats.join(',')}
            />
            {selectedFiles.length === 0 && noFileMessage && (
                <p style={{ color: 'red' }}>{noFileMessage}</p>
            )}
        </div>
    );
}

export default FileUpload;
