import {memo, useState} from "react";
import axios from 'axios';
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../../Common/constants";
import styles from '../../../../css/component/Login/Find.module.css'

const FindPassword = ({
                          onPasswordChangeSuccess
                      }) => {
    const [username, setUsername] = useState("");
    const [phoneNumberForPassword, setPhoneNumberForPassword] = useState("");
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

    const clearErrorMessages = () => {
        setUsernameErrorMessage("");
        setPhoneErrorMessage("");
    }

    const handleFindPassword = async () => {
        try {
            clearErrorMessages();
            const { data: isExistingUser } = await axios.get(`${SERVER_URL}members/check/memId/${username}`);
            const { data: userPhoneNumber } = await axios.get(`${SERVER_URL}members/tel-id/${username}`);

            if (!isExistingUser) throw new Error('UserNotFound');
            if (userPhoneNumber !== phoneNumberForPassword) throw new Error('InvalidPhoneNumber');

            await axios.post(`${SERVER_URL}sms/tel-check/${phoneNumberForPassword}`);
            alert("인증번호가 발송 되었습니다!");
            setIsVerificationStep(true);
        } catch (error) {
            if (error.message === 'UserNotFound' || (error.response && error.response.status === 404)) {
                setUsernameErrorMessage("존재하지 않는 아이디입니다!");
            } else if (error.message === 'InvalidPhoneNumber') {
                setPhoneErrorMessage("해당 아이디의 전화번호가 아닙니다!");
            } else {
                setUsernameErrorMessage("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const handleVerification = async () => {
        try {
            const { status } = await axios.post(`${SERVER_URL}sms/verify/${phoneNumberForPassword}/${verificationCode}`);
            if (status === 200) {
                alert("인증이 완료 되었습니다!");
                onPasswordChangeSuccess(username);
            } else {
                throw new Error('VerificationFailed');
            }
        } catch (error) {
            if (error.message === 'VerificationFailed' || (error.response && error.response.status === 400)) {
                setUsernameErrorMessage("인증번호가 일치하지 않습니다!");
            } else {
                setUsernameErrorMessage("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <Stack className={styles.container}>
            <h4>비밀번호 찾기</h4>
            <div className={styles.layout}>
                <Stack spacing={1} style={{ flex: 1 }}>
                    <TextField
                        label={isVerificationStep ? "인증번호를 입력해 주세요" : "아이디를 입력해 주세요"}
                        value={isVerificationStep ? verificationCode : username}
                        onChange={(e) => isVerificationStep ? setVerificationCode(e.target.value) : setUsername(e.target.value)}
                        error={!!usernameErrorMessage}
                        helperText={usernameErrorMessage}
                    />
                    {!isVerificationStep && (
                        <TextField
                            label="가입할 때 사용한 전화번호를 입력해 주세요"
                            value={phoneNumberForPassword}
                            onChange={(e) => setPhoneNumberForPassword(e.target.value)}
                            error={!!phoneErrorMessage}
                            helperText={phoneErrorMessage}
                        />
                    )}
                </Stack>
                <Button
                    variant="contained"
                    className={styles.button}
                    onClick={isVerificationStep ? handleVerification : handleFindPassword}
                >
                    {isVerificationStep ? "인증번호 확인" : "인증번호 전송"}
                </Button>
            </div>
        </Stack>
    );
};

export default memo(FindPassword);