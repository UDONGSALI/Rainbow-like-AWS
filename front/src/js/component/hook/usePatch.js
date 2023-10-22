import { useState } from "react";
function usePatch(SERVER_URL) {
    const patchItem = async (endpoint, payload, actionType = "항목") => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch(SERVER_URL + endpoint, requestOptions);

            if (!response.ok) {
                throw new Error(`Server response was not ok`);
            }

            alert(`${actionType} 상태를 변경 했습니다!`);
            return true;

        } catch (err) {
            alert(`${actionType} 상태 변경 중 문제가 발생했습니다.`);
            return false;
        }
    };

    return patchItem;
}
export default usePatch;