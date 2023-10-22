import { useState } from 'react';
import Swal from 'sweetalert2';

export const useConfirm = () => {
    const confirm = (message) => {
        return Swal.fire({
            title: '확인',
            text: message,
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            return result.isConfirmed;
        });
    };
    return confirm;
};