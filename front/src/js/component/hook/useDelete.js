import {useConfirm} from "./useConfirm";

function useDelete(SERVER_URL) {
    const confirm = useConfirm();
    const deleteItem = async (endpoint, actionType = "삭제") => {
        const isConfirmed = await confirm(`정말 ${actionType} 하시겠습니까?`);
        if (!isConfirmed) return false;

        try {
            const response = await fetch(SERVER_URL + endpoint, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error();
            }

            alert(`성공적으로 ${actionType} 했습니다!`);
            return true;

        } catch (err) {
            alert(`${actionType} 중 문제가 발생했습니다.`);
            return false;
        }
    };

    return deleteItem;
}


export default useDelete;