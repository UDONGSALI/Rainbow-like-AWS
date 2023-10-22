import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = () => {
    const open = useDaumPostcodePopup();

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log(fullAddress);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <button type='button' onClick={handleClick}>
            Open
        </button>
    );
};

export default useDaumPostcodePopup;