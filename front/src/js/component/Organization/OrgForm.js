import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Organization/OrgForm.module.css'; // 적절한 CSS 모듈 경로로 변경해주세요.

const INITIAL_FORM_DATA = {
    orgNum: '',
    name: '',
    url: '',
    tel: '',
    addr: '',
    addrDtl: '',
    addrPost: '',
};

function OrgForm({ org, open, onClose, onUpdate }) {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    useEffect(() => {
        if (org) {
            setFormData({
                orgNum: org.orgNum || '',
                name: org.name || '',
                url: org.url || '',
                tel: org.tel || '',
                addr: org.addr || '',
                addrDtl: org.addrDtl || '',
                addrPost: org.addrPost || '',
            });
        }
    }, [org]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCloseAndReset = () => {
        setFormData(INITIAL_FORM_DATA);
        onClose();
    };

    const handleSave = () => {
        const orgDetailUrl = org ? `${SERVER_URL}org/${org.orgNum}` : `${SERVER_URL}org`;
        const requestOptions = {
            method: org ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        fetch(orgDetailUrl, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버에 업데이트하는 중 문제가 발생했습니다.');
                }
                return response.json();
            })
            .then((updatedOrg) => {
                console.log('서버 응답:', updatedOrg);
                window.alert(org ? '기관 정보를 수정 했습니다!' : '새 기관을 추가 했습니다!');
                onClose(); // 모달 닫기
                onUpdate(updatedOrg); // 기타 필요한 업데이트 호출
            })
            .catch((error) => {
                console.error('서버 요청 오류:', error);
            });
    };

    const DIALOG_TITLE = org ? '기관정보 수정' : '새 기관 추가';
    const SAVE_BUTTON_TEXT = org ? '수정완료' : '추가완료';

    return (
        <Dialog open={open} onClose={handleCloseAndReset}>
            <DialogTitle>{DIALOG_TITLE}</DialogTitle>
            <DialogContent className={styles.orgDetailContainer}>
                <Stack spacing={1}>
                    {org && (
                        <Stack className={styles.inputGroup}>
                            <TextField
                                label="기관번호"
                                value={formData.orgNum}
                                readOnly
                                required
                                fullWidth
                            />
                        </Stack>
                    )}
                    <Stack className={styles.inputGroup}>
                        <TextField
                            label="기관명"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Stack>
                    <Stack className={styles.inputGroup}>
                        <TextField
                            label="웹사이트"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Stack>
                    <Stack className={styles.inputGroup}>
                        <TextField
                            label="전화번호"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Stack>
                    <Stack className={styles.inputGroup}>
                        <TextField
                            label="주소"
                            name="addr"
                            value={formData.addr}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Stack>
                    <Stack className={styles.inputGroup}>
                        <TextField
                            label="세부 주소"
                            name="addrDtl"
                            value={formData.addrDtl}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Stack>
                    <Stack className={styles.inputGroup}>
                        <TextField
                            label="우편번호"
                            name="addrPost"
                            value={formData.addrPost}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions className={styles.orgDetailContainer}>
                <Button onClick={handleSave}>{SAVE_BUTTON_TEXT}</Button>
                <Button onClick={handleCloseAndReset}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default OrgForm;