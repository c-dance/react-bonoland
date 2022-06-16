import { isFocusable } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { getNumber, getLocalNumber } from '../../utils/number';

export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return [
        { value, onChange: e => setValue(e.currentTarget.value) },
        () => setValue(initialValue)
    ];
}

export const useOnlyNum = initialValue => {
    const [value, setValue] = useState(initialValue);

    const setOnlyNumber = event => {
        let value = getNumber(event.currentTarget.value);
        if(typeof value === "string") {
            event.preventDefault();
            alert("숫자만 입력해 주세요");
        } else {
            setValue(getLocalNumber(value));
        }
    };

    const setClear = (defaultValue="") => {
        setValue("");
    };

    return [ value, setOnlyNumber, setClear ];
};