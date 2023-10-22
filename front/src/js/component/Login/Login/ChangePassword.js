    import React, {memo, useState} from 'react';
    import axios from 'axios';
    import { TextField, Stack, Button } from '@mui/material';
    import { SERVER_URL } from "../../Common/constants";
    import styles from '../../../../css/component/Login/Find.module.css'

    const ChangePassword = ({ usernameForChange, closeModal }) => {
        const [password, setPassword] = useState("");
        const [passwordConfirm, setPasswordConfirm] = useState("");
        const [errorMessage, setErrorMessage] = useState("");

        const handleChangePassword = async () => {
            if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,15}$/.test(password)) {
                setErrorMessage('비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요.');
                return;
            }

            if (password !== passwordConfirm) {
                setErrorMessage("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
                return;
            }

            try {
                const response = await axios.patch(`${SERVER_URL}members/id/${usernameForChange}/${password}`);

                if (response.status === 200) {
                    alert("비밀번호가 변경 되었습니다!");
                    closeModal();
                } else {
                    throw new Error("Failed to change password");
                }
            } catch (error) {
                setErrorMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            }
        };

        const textFieldStyle = { boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' };

        const isError = (message) => !!errorMessage && errorMessage === message;

        return (
            <Stack className={styles.container}>
                <h4>비밀번호 변경</h4>
                <div className={styles.layout}>
                    <Stack spacing={1} style={{ flex: 1 }}>
                        <TextField
                            label="비밀번호를 입력해 주세요"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={isError('비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요.')}
                            helperText={isError('비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요.') ? errorMessage : ''}
                            style={textFieldStyle}
                        />
                        <TextField
                            label="비밀번호 확인"
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            error={isError('비밀번호와 확인 비밀번호가 일치하지 않습니다.')}
                            helperText={isError('비밀번호와 확인 비밀번호가 일치하지 않습니다.') ? errorMessage : ''}
                            style={textFieldStyle}
                        />
                    </Stack>
                    <Button
                        variant="contained"
                        className={styles.button}
                        onClick={handleChangePassword}
                    >
                        비밀번호 변경
                    </Button>
                </div>
            </Stack>
        );
    };

    export default memo(ChangePassword);
