import axios from "axios";
import { SERVER_URL } from "../../Common/constants";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import styles from '../../../../css/component/Login/Find.module.css'
import {memo} from "react";

const FindId = ({
                    phoneNumber, setPhoneNumber,
                    labelText, setLabelText,
                    buttonText, setButtonText,
                    errorText, setErrorText,
                    userInputCode, setUserInputCode,
                    isVerified, setIsVerified,
                    smsSent, setSmsSent,
                    memberId, setMemberId,
                }) => {

    const handlePhoneNumberCheck = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}members/check/tel/${phoneNumber}`);
            if (!response.data) {
                setErrorText("해당 번호로 가입한 아이디가 없습니다!");
                setSmsSent(false);
                return;
            }
            await sendSMS();
        } catch (error) {
            console.error(error);
            setErrorText("오류가 발생했습니다.");
            setSmsSent(false);
        }
    };

    const sendSMS = async () => {
        try {
            await axios.post(`${SERVER_URL}sms/tel-check/${phoneNumber}`);
            setLabelText("인증번호를 입력하세요");
            setButtonText("인증번호 확인");
            setSmsSent(true);
            setErrorText("");
            alert('인증번호가 발송 되었습니다!');
        } catch (error) {
            setErrorText("SMS 발송에 실패했습니다.");
        }
    };

    const handleVerificationCodeCheck = async () => {
        try {
            const verificationResponse = await axios.post(`${SERVER_URL}sms/verify/${phoneNumber}/${userInputCode}`);
            if (verificationResponse.status !== 200) {
                throw new Error("Verification failed");
            }
            alert("아이디를 찾았습니다!");
            setErrorText("");
            setLabelText("찾은 아이디");
            setIsVerified(true);
            retrieveMemberId();
        } catch (error) {
            setErrorText("인증번호가 일치하지 않습니다!");
            setIsVerified(false);
        }
    };

    const retrieveMemberId = async () => {
        const idResponse = await axios.get(`${SERVER_URL}members/id-tel/${phoneNumber}`);
        setMemberId(idResponse.data);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            smsSent ? handleVerificationCodeCheck() : handlePhoneNumberCheck();
        }
    };

    return (
        <Stack className={styles.container}>
            <h4>아이디 찾기</h4>
            <div className={styles.layout}>
                <Stack spacing={1} style={{ flex: 1 }}>
                    <TextField
                        label={labelText}
                        error={Boolean(errorText)}
                        helperText={errorText}
                        value={smsSent && isVerified ? memberId : (smsSent ? userInputCode : phoneNumber)}
                        onChange={(e) => {
                            smsSent ? setUserInputCode(e.target.value) : setPhoneNumber(e.target.value);
                        }}
                        onKeyPress={handleKeyPress}
                        className={styles.textField}
                    />
                </Stack>
                <Button
                    variant="contained"
                    className={styles.button}
                    onClick={smsSent ? handleVerificationCodeCheck : handlePhoneNumberCheck}
                >
                    {buttonText}
                </Button>
            </div>
        </Stack>
    );
};

export default memo(FindId);