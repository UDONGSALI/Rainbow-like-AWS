import React, {memo, useEffect, useState} from 'react';
import {Button, Snackbar, Stack, TextField, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import FindIdPasswordModal from './FindIdPasswordModal';
import {useToken} from '../../hook/useToken';
import styles from '../../../../css/component/Login/Login.module.css';

// 상수 정의
const BUTTON_COLOR_DEFAULT = '#a38ced';
const BUTTON_COLOR_HOVER = '#53468b';

function Login({memId, jti}) {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const {decodeToken: decodeAndSetToken, deleteTokenFromServer, getToken} = useToken();
    const storedFailedAttempts = localStorage.getItem('failedAttempts') || 0;
    const [failedAttempts, setFailedAttempts] = useState(parseInt(storedFailedAttempts, 10));

    const [firstNum, setFirstNum] = useState(Math.floor(Math.random() * 90 + 10));
    const [secondNum, setSecondNum] = useState(Math.floor(Math.random() * 90 + 10));
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [buttonColor, setButtonColor] = useState(BUTTON_COLOR_DEFAULT);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const customLinkStyle = {
        textDecoration: 'none',
        color: '#a38ced',
    };


    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleCaptchaAnswerChange = (e) => {
        setCaptchaAnswer(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login();
        }
    };

    const login = () => {
        getToken(user).then(response => {
            if (response.success) {
                // 성공 메시지 스낵바로 표시
                setSnackbarMessage('로그인 되었습니다!');
                setOpen(true);

                // 성공적으로 토큰을 받았을 때 세션 스토리지에 저장된 정보를 업데이트
                decodeAndSetToken(response.token);

                // 필요한 경우 다른 로직 추가
                setFailedAttempts(0); // 로그인 성공 시 실패 횟수 초기화

                // 새로운 캡차 문제 설정
                setFirstNum(Math.floor(Math.random() * 90 + 10));
                setSecondNum(Math.floor(Math.random() * 90 + 10));

                window.location.href = `/`;
            } else {
                // 에러 메시지 스낵바로 표시
                setSnackbarMessage(response.error);
                setOpen(true);
            }
        });
    };

    const logout = () => {
        if (jti) {
            deleteTokenFromServer(jti).then(() => {
                sessionStorage.clear();
                window.location.reload();
            });
        } else {
            sessionStorage.clear();
            window.location.reload();
        }
    };

    const handleSubmit = () => {
        login();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.loginContainer}>
            {memId ? (
                <LoggedInView memId={memId} logout={logout} buttonColor={buttonColor} setButtonColor={setButtonColor}/>
            ) : (
                <LoginFormView
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    handleSubmit={handleSubmit}
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColor}
                    failedAttempts={failedAttempts}
                    firstNum={firstNum}
                    secondNum={secondNum}
                    captchaAnswer={captchaAnswer}
                    handleCaptchaAnswerChange={handleCaptchaAnswerChange}
                    customLinkStyle={customLinkStyle}
                    handleOpenModal={handleOpenModal}
                />
            )}
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message={snackbarMessage}
            />
            <FindIdPasswordModal isOpen={isModalOpen} handleClose={handleCloseModal}/>
        </div>
    );
}

// 로그인 폼 화면
function LoginFormView({
                           handleChange,
                           handleKeyDown,
                           handleSubmit,
                           buttonColor,
                           setButtonColor,
                           failedAttempts,
                           firstNum,
                           secondNum,
                           captchaAnswer,
                           handleCaptchaAnswerChange,
                           customLinkStyle,
                           handleOpenModal,
                       }) {
    return (
        <Stack alignItems='flex-start' className={styles.formStack}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', padding: '16px', borderRadius: '4px'}}>
                <Stack spacing={2} style={{flex: 1}}>
                    <TextField
                        name="username"
                        label="아이디"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                    />
                    <TextField
                        type="password"
                        name="password"
                        label="비밀번호"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                    />
                    {failedAttempts >= 5 && (
                        <TextField
                            name="captcha"
                            label={`${firstNum} * ${secondNum} = ?`}
                            value={captchaAnswer}
                            onChange={handleCaptchaAnswerChange}
                            style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}
                        />
                    )}
                </Stack>
                <Button
                    variant="contained"
                    style={{
                        maxHeight: '250px',
                        marginLeft: '10px',
                        backgroundColor: buttonColor,
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s',
                    }}
                    onClick={handleSubmit}
                    onMouseEnter={() => {
                        setButtonColor(BUTTON_COLOR_HOVER);
                    }}
                    onMouseLeave={() => {
                        setButtonColor(BUTTON_COLOR_DEFAULT);
                    }}
                >
                    Login
                </Button>
            </div>
            <div style={{padding: '16px', borderRadius: '4px', width: '100%'}}>
                <Typography variant="body2" style={{fontSize: '14px'}}>
                    <span role="img" aria-label="Question mark in circle">😳</span>
                    아이디나 비밀번호를 잊어버리셨나요?
                    <Link
                        onClick={handleOpenModal}
                        style={customLinkStyle}
                    >
                        <strong> 아이디/비밀번호 찾기</strong>
                    </Link>
                </Typography>
                <br/>
                <Typography variant="body2" style={{fontSize: '14px'}}>
                    <span role="img" aria-label="Exclamation mark in circle">😖</span>
                    아직 세종여성플라자의 회원이 아니신가요?
                    <Link to="/signup" style={customLinkStyle}> <strong>회원가입</strong></Link>
                </Typography>
            </div>
        </Stack>
    );
}

// 로그인 성공 후 화면
function LoggedInView({memId, logout, buttonColor, setButtonColor}) {
    return (
        <Stack
            alignItems="flex-start"
            style={{
                width: '40%',
                padding: '20px',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                borderRadius: '5px',
            }}
        >
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', padding: '16px', borderRadius: '4px'}}>
                <Stack style={{flex: '1'}}>
                    <Typography variant="h5" style={{lineHeight: '1', marginTop: '25px'}}>
                        {memId}님, 환영합니다!
                    </Typography>
                    <br/>
                </Stack>
                <Button
                    variant="contained"
                    style={{
                        maxHeight: '250px',
                        marginLeft: '10px',
                        backgroundColor: buttonColor,
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s',
                    }}
                    onClick={logout}
                    onMouseEnter={() => {
                        setButtonColor(BUTTON_COLOR_HOVER);
                    }}
                    onMouseLeave={() => {
                        setButtonColor(BUTTON_COLOR_DEFAULT);
                    }}
                >
                    Logout
                </Button>
            </div>
        </Stack>
    );
}

export default memo(Login);
