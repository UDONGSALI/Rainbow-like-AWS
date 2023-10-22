import React, {memo, useState} from 'react';
import { Button, Modal, Stack } from '@mui/material';
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import ChangePassword from "./ChangePassword";
import styles from '../../../../css/component/Login/FindIdPasswordModal.module.css'

const FindIdPasswordModal = ({ isOpen, handleClose }) => {

    // States
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userInputCode, setUserInputCode] = useState('');
    const [memberId, setMemberId] = useState("");
    const [labelText, setLabelText] = useState("가입할 때 사용한 전화번호를 입력해 주세요");
    const [buttonText, setButtonText] = useState("인증번호 전송");
    const [errorText, setErrorText] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [smsSent, setSmsSent] = useState(false);
    const [activeTab, setActiveTab] = useState('findId');
    const [usernameForChange, setUsernameForChange] = useState("");

    // Handlers
    const handleCloseWithReset = () => {
        // Reset states
        setPhoneNumber("");
        setLabelText("가입할 때 사용한 전화번호를 입력해 주세요");
        setButtonText("인증번호 전송");
        setErrorText("");
        setIsVerified(false);
        setSmsSent(false);
        setUserInputCode('');
        setMemberId("");

        // Close modal
        handleClose();
    };
    const renderActiveComponent = () => {

        switch (activeTab) {
            case 'findId':
                return <FindId
                    phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                    labelText={labelText} setLabelText={setLabelText}
                    buttonText={buttonText} setButtonText={setButtonText}
                    errorText={errorText} setErrorText={setErrorText}
                    userInputCode={userInputCode} setUserInputCode={setUserInputCode}
                    isVerified={isVerified} setIsVerified={setIsVerified}
                    smsSent={smsSent} setSmsSent={setSmsSent}
                    memberId={memberId} setMemberId={setMemberId}
                />;
            case 'findPassword':
                return <FindPassword
                    onPasswordChangeSuccess={onPasswordChangeSuccess}
                />;
            case 'changePassword':
                return <ChangePassword
                    usernameForChange={usernameForChange}  // 아이디 전달
                    closeModal={handleCloseWithReset}      // 여기서 closeModal로 전달
                />;
            default:
                return null;
        }
    };

    const onPasswordChangeSuccess = (userId) => {
        setActiveTab('changePassword');
        setUsernameForChange(userId); // 여기서 setUsernameForChange는 상태 설정 함수입니다. 해당 상태를 위에서 정의하고, 이 상태는 ChangePassword 컴포넌트로 전달되어야 합니다.
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseWithReset}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className={styles.container} // Apply the container style
        >
            <Stack className={styles.modalStack}> {/* Apply the modalStack style */}
                <Stack direction="row" spacing={2} className={styles.tabButtons}> {/* Apply the tabButtons style */}
                    <Button
                        onClick={() => setActiveTab('findId')}
                        className={styles.tabButton} // Apply the tabButton style
                    >
                        아이디 찾기
                    </Button>
                    <Button
                        onClick={() => setActiveTab('findPassword')}
                        className={styles.tabButton} // Apply the tabButton style
                    >
                        비밀번호 찾기
                    </Button>
                </Stack>
                <hr />
                {renderActiveComponent()}
            </Stack>
        </Modal>
    );
}
export default memo(FindIdPasswordModal);
