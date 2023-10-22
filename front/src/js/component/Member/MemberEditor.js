import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MenuItem, TextField } from '@mui/material';
import { SERVER_URL } from '../Common/constants';
import styles from '../../../css/component/Member/MemberEdit.module.css';

function MemberEditor({ member, open, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        memNum: '',
        memId: '',
        type: '',
        name: '',
        bir: '',
        tel: '',
        gender: '',
        email: '',
        addr: '',
        addrDtl: '',
        addrPost: '',
        jdate: '',
    });

    useEffect(() => {
        if (member) {
            const memberDetailUrl = `${SERVER_URL}api/members/${member.id}`;
            fetch(memberDetailUrl)
                .then((response) => response.json())
                .then((data) => {
                    setFormData({
                        memNum: member.id || '',
                        memId: data.memId || '',
                        type: data.type || '',
                        name: data.name || '',
                        bir: data.bir || '',
                        tel: data.tel || '',
                        gender: data.gender || '',
                        email: data.email || '',
                        addr: data.addr || '',
                        addrDtl: data.addrDtl || '',
                        addrPost: data.addrPost || '',
                        jdate: data.jdate || '',
                    });
                })
                .catch((error) => {
                    console.error('멤버 상세 정보를 가져오는 중 오류 발생:', error);
                });
        }
    }, [member]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const memberDetailUrl = `${SERVER_URL}api/members/${member.id}`;
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        fetch(memberDetailUrl, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버에 업데이트하는 중 문제가 발생했습니다.');
                }
                return response.json();
            })
            .then((updatedMember) => {
                console.log('서버 응답:', updatedMember);
                window.alert('회원 정보를 수정 했습니다!');
                onClose(); // 모달 닫기
                onUpdate(updatedMember); // 기타 필요한 업데이트 호출
            })
            .catch((error) => {
                console.error('서버 요청 오류:', error);
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>회원정보 수정</DialogTitle>
            <DialogContent className={styles.memberDetailContainer}>
                {member && (
                    <Stack spacing={1}>
                        <Stack className={styles.inputGroup}>
                            <TextField label="회원번호" value={formData.memNum} readOnly required fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="아이디" name="memId" value={formData.memId} onChange={handleChange} required
                                       fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField
                                select
                                label="유형"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                fullWidth
                                sx={{
                                    '.MuiSelect-root': {
                                        fontSize: '12px',
                                        padding: '12px'
                                    },
                                    '.MuiSelect-select': {
                                        fontSize: '12px',
                                        padding: '8px'
                                    }
                                }}
                            >
                                <MenuItem value="">
                                    <em>회원 유형 선택</em>
                                </MenuItem>
                                <MenuItem value="ADMIN">관리자</MenuItem>
                                <MenuItem value="USER">일반 회원</MenuItem>
                                <MenuItem value="LABOR">노무사</MenuItem>
                                <MenuItem value="COUNSELOR">상담사</MenuItem>
                            </TextField>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="이름" name="name" value={formData.name} onChange={handleChange} required
                                       fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField
                                select
                                label="성별"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                fullWidth
                                sx={{
                                    '.MuiSelect-root': {
                                        fontSize: '12px',
                                        padding: '12px'
                                    },
                                    '.MuiSelect-select': {
                                        fontSize: '12px',
                                        padding: '8px'
                                    }
                                }}

                            >
                                <MenuItem value=""><em>성별 선택</em></MenuItem>
                                <MenuItem value="MALE">남성</MenuItem>
                                <MenuItem value="FEMALE">여성</MenuItem>
                            </TextField>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField
                                label="생년월일"
                                type="date"
                                name="bir"
                                value={formData.bir}
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                                required
                                fullWidth
                            />
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="전화번호" name={"tel"} value={formData.tel}  onChange={handleChange} required fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="이메일" name="email" value={formData.email} onChange={handleChange} required fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="주소" name="addr" value={formData.addr} onChange={handleChange} required
                                       fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="상세 주소" name="addrDtl" value={formData.addrDtl} onChange={handleChange}
                                       fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="우편번호" name="addrPost" value={formData.addrPost} onChange={handleChange}
                                       required fullWidth/>
                        </Stack>
                        <Stack className={styles.inputGroup}>
                            <TextField label="가입일" value={formData.jdate} readOnly required fullWidth/>
                        </Stack>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions className={styles.memberDetailContainer}>
                <Button onClick={handleSave}>수정완료</Button>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default MemberEditor;
