import {useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "../Common/constants";

export function useToken() {
    const navigate = useNavigate();

    const decodeToken = useCallback((token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            const decoded = JSON.parse(jsonPayload);
            if (decoded.exp) {
                const expirationDate = new Date(decoded.exp * 1000);
                const currentDate = new Date();
                if (expirationDate <= currentDate) {
                    return null;  // 만료된 경우 null 반환
                }
            }
            return decoded;
        } catch (error) {
            console.error('토큰 디코딩 중 오류 발생:', error);
            return null;
        }
    }, []);

    const checkTokenStatus = useCallback(() => {
        const jti = sessionStorage.getItem('jti');
        if(jti) {
            fetch(`${SERVER_URL}token/${jti}`)
                .then(res => res.text())
                .then(data => {
                    if (data === "Y") {
                        alert("다른 곳에서 로그인 되었습니다!");
                        deleteTokenFromServer(jti);
                        sessionStorage.clear();
                        navigate("/login");
                    }
                    else if (!data){
                        alert("서버에서 로그아웃 되었습니다. 관리자에게 문의 하세요.");
                        sessionStorage.clear()
                        navigate("/login");
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [navigate]);

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');

        // 토큰이 세션 스토리지에 있다면
        if (token) {
            const decodedToken = decodeToken(token);

            // 만료된 토큰인 경우
            if (!decodedToken) {
                alert("로그아웃 되었습니다!");
                const jti = sessionStorage.getItem('jti');
                deleteTokenFromServer(jti);
                sessionStorage.clear();
                navigate("/login");
            } else {
                // 유효한 토큰인 경우 세션 스토리지에 정보 저장
                sessionStorage.setItem("role", decodedToken.role);
                sessionStorage.setItem("memNum", decodedToken.memNum);
                sessionStorage.setItem("memId", decodedToken.sub);
                sessionStorage.setItem("jti", decodedToken.jti);

                const expirationDate = new Date(decodedToken.exp * 1000);
                const oneHourFromNow = new Date().getTime() + 60 * 60 * 1000;

                // 토큰이 1시간 이내로 만료되는 경우 재발급
                if (expirationDate.getTime() <= oneHourFromNow) {
                    refreshToken();
                }
            }
        }
        // 토큰 상태 체크
        checkTokenStatus();
    }, [navigate, decodeToken, checkTokenStatus]);

    const getToken = useCallback((credentials) => {
        return fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text); // 에러 메시지를 throw
                    });
                }
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken) {
                    sessionStorage.setItem('jwt', jwtToken);
                    decodeToken(jwtToken); // Decode and set token info in session storage
                    return { success: true, token: jwtToken };
                } else {
                    throw new Error('로그인에 실패했습니다.'); // Generic error message
                }
            })
            .catch((err) => {
                console.error(err);
                return { success: false, error: err.message };
            });
    }, []);

    const refreshToken = useCallback(() => {
        const currentToken = sessionStorage.getItem('jwt');
        return fetch(`${SERVER_URL}token/refresh`, {
            method: 'GET',
            headers: {
                'Authorization': currentToken
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem('jwt', data.token);
                    decodeToken(data.token);
                    return { success: true, token: data.token };
                } else {
                    return { success: false };
                }
            })
            .catch(err => {
                console.error(err);
                return { success: false, error: err };
            });
    }, []);


    const deleteTokenFromServer = useCallback((jti) => {
        return fetch(`${SERVER_URL}token/${jti}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error deleting token");
                }
                return response.text();
            })
            .catch(error => {
                console.error("Error:", error);  // 에러 출력
                throw error;
            });
    }, []);


    return { decodeToken, deleteTokenFromServer, getToken };
}
